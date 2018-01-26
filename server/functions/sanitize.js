function sanitize(object,format){
  if (typeof format == 'object' && !format.type && !format.validate) {
    if (Array.isArray(format) != Array.isArray(object)) return false;
    return Object.entries(object).every(pair=>sanitize(pair[1],format[pair[0]]));
  } else {
    if (typeof format == 'function') {
      return format(object) === true;
    } else if (typeof format == 'string') {
      return typeof object === format;
    } else {
      return false;
    }
  }
}
module.exports = sanitize;
