const pages = ['login','contact','logout','signup','category','browse'];

const output = {};
pages.forEach(filename=>{output[filename]=require('./'+filename).default});

export default output;
