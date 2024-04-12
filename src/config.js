const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Ecommerce", {

})
  .then(() => {
    console.log("Connected correctly to server");
  })
  .catch((error) => {
    console.log(error);
  });

const Loginschema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const collection = mongoose.model('Users', Loginschema);

module.exports = collection;