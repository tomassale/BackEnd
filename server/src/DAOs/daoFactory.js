const ProductMongo = require('./ProductMongoDao.js');
const ProductFs = require('./Product-fs.js');

module.exports = class MyConnectionFactory {
  returnDbConnection(){
    if(process.env.STORE == 'MONGO') {console.log('Mongo'); return ProductMongo.returnSingleton();}
    if(process.env.STORE == 'FS') { console.log('Fs'); return ProductFs.returnSingleton();}
  }
}