const authorModel = require("../Models/authorModel");
const bcrypt = require('bcrypt')
const saltRounds = 10


exports. createAuthor = async function (req, res) {
  try {
    let authorDetails = req.body;


    const salt = await bcrypt.genSalt(saltRounds)
    const hashPassword = await bcrypt.hash(authorDetails.password, salt)
    req.body["password"] = hashPassword


    let savedData = await authorModel.create(authorDetails);

    res.status(201).send({ status: true, data: savedData });

  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};


