module.exports = require('./webpack.'+(process.env.NODE_ENV !== 'production' ? 'dev' : 'prod')+'.js')
