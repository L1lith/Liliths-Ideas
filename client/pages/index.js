const pages = ['login','logout','signup','category','browse'];

const output = {};
pages.forEach(filename=>{output[filename]=require('./'+filename).default});

module.exports = output;
