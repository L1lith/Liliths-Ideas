const webpack = require('webpack');
const minimist = require('minimist');

const developmentConfig = require('./webpack.dev.js');
const productionConfig = require('./webpack.prod.js');
const startServer = require('./server');

const args = minimist(process.argv.slice(2));
const isDevelopment = [true,'true'].includes(args.dev);

process.env.NODE_ENV = isDevelopment ? 'development' : 'production';

const compiler = webpack(isDevelopment ? developmentConfig : productionConfig);

console.log('Starting in '+(isDevelopment ? 'Development' : 'Production')+' mode.');
startWebpack();

function startWebpack() {
  console.log('Starting Webpack');
  if (isDevelopment) {
    compiler.watch({},built);
  } else {
    compiler.run(built);
  }
  doStartServer();
}

function built(err,stats){
  if (err /*|| stats.hasErrors()*/) throw (err /*|| new Error("Couldn't Start, Webpack Error")*/);
  console.log('Webpack Built');
}

var serverStarted = false;
function doStartServer(){
  if (serverStarted) throw new Error('Server Already Started');
  serverStarted = true;
  console.log('Starting Server');
  startServer().then(()=>{
    console.log('Server Running');
  }).catch(err=>{
    throw (err || new Error("Couldn't Start, Server Error"));
  });
}
