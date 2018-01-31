function sanitize(object, format,options={}) {
  if (options !== null && typeof options !== 'object') throw new Error('Sanitize: Invalid Options');
  if (options) options = Object.assign({
    arrayAssume:true,
  },options);
  if (options.hasOwnProperty('_')) {
    const newOptions = Object.assign({},options);
    delete newOptions['_'];
    return sanitize(object,options['_'],newOptions);
  }
  if (typeof options.validate == 'function') {
    const newOptions = Object.assign({},options);
    delete newOptions.validate;
    return options.validate(object) && sanitize(object,format,newOptions);
  } else if (Array.isArray(options.validate)) {
    const newOptions = Object.assign({},options);
    delete newOptions.validate;
    return sanitize(object,format,newOptions) && options.validate.filter(func=>typeof func == 'function').every(func=>func(object)===true);
  }
  if (typeof format == 'object') {
    if (format === null) return object === null;
    if (typeof object != 'object') {
      return false;
    } else if (Array.isArray(format)) {
      if (!Array.isArray(object)) {
        return false;
      } else if (format.length > 1 || options.arrayAssume !== true){
        return object.every((value, index) => format.hasOwnProperty(index) && sanitize(value, format[index]));
      } else if (format.length === 0) {
        return object.length === 0;
      } else if (format.length === 1) {
        return object.every((value, index) => sanitize(value, format[0]));
      }
    } else {
      const formatKeys = Object.keys(format);
      if (Array.isArray(object)) return false;
      const entries = Object.entries(object);
      if (Object.entries(format).length != entries.length) return false;
      return entries.every(pair => {
        const name = pair[0];
        const value = pair[1];
        if (name.startsWith('$')) return false; // MongoDB Sanitize
        if (format.hasOwnProperty(name)) {
          return sanitize(value, format[name]);
        } else if (format.hasOwnProperty('$'+name)) {
          const options = format['$'+name];
          const newOptions = Object.assign({},options);
          delete newOptions['_'];
          return sanitize(pair[1],options['_'],newOptions);
        } else {
          return false;
        }
      });
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
