function sanitize(object, format) {
  if (typeof format == 'object') {
    if (format === null) return object === null;
    if (typeof format != 'object') {
      return false;
    } else if (Array.isArray(format)) {
      if (!Array.isArray(object)) {
        return false;
      } else if (format.length === 0) {
        return object.length === 0;
      } else if (format.length === 1) {
        return object.every((value, index) => sanitize(value, format[0]));
      } else {
        return object.every((value, index) => format.hasOwnProperty(index) && sanitize(value, format[index]));
      }
    } else {
      if (Array.isArray(object) || Object.keys(object).some(property => property.startsWith('$'))) return false; // Sanitize for MongoDB
      const entries = Object.entries(object);
      if (Object.entries(format).length != entries.length) return false;
      return entries.every(pair => format.hasOwnProperty(pair[0]) && sanitize(pair[1], format[pair[0]]));
    }
  } else if (typeof format == 'function') {
    return format(object) === true;
  } else if (typeof format == 'string') {
    return typeof object === format;
  } else {
    throw new Error('Invalid Format');
  }
}
module.exports = sanitize;
