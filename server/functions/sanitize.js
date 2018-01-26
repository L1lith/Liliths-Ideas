function sanitize(object,format){
  if (typeof format == 'object') {
    if (format === null) return object === null;
    if (typeof format != typeof object || Array.isArray(format) != Array.isArray(object)) return false;
    return Object.entries(object).every(pair=>format.hasOwnProperty(pair[0])&&sanitize(pair[1],format[pair[0]]));
  } else if (typeof format == 'function') {
    return format(object) === true;
  } else if (typeof format == 'string') {
    return typeof object === format;
  } else {
    throw new Error('Invalid Format');
  }
}
module.exports = sanitize;
