const mongoose = require('mongoose');
const app = require('./app');
const {
  IP_SERVER,
  API_VERSION,
  DB_HOST,
  DB_USER,
  DB_PASSWORD
} = require('./constants');

const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}/deimervideobeam`;
const PORT = process.env.PORT || 3977;

mongoose.connect(DB_URI)
  .then((res) => {
    if(res) {
      app.listen(PORT, () => {
        console.log();
        console.log('*********************************************************************');
        console.log('*********************************************************************');
        console.log('********                                                      *******');
        console.log(`********    SERVER RUNING IN: http://${IP_SERVER}:${PORT}/api/${API_VERSION}    *******`);
        console.log('********                                                      *******');
        console.log('*********************************************************************');
        console.log('*********************************************************************');
        console.log();
      });
    }
  })
  .catch(error => {
    console.log("🚀 ~ error:", error);
    // console.error('SERVER ERROR: ', error);
});
