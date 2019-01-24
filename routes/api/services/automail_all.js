const express = require('express');

const router = express.Router();
// const Joi = require('joi');
// const nodemailer = require('nodemailer');
const UserSchema = require('../../../model/user');
const AutomailSchema = require('../../../model/automail');
/* GET users listing. */

router.get('/', (req, res) => {
  AutomailSchema.find()
    .then((automailLog) => {
      res.status(200)
        .json({
          error: false,
          data: automailLog,
        });
    }).catch((err) => {
      res.status(500).json({
        message: 'Internal Server Error',
        err,
      });
    });
});

router.post('/message', async (req, res) => {
  try {
    UserSchema.find().then((useremail) => {
      console.log(useremail.email);
    });
  } catch (error) {
    res.status(500);
  }
});

router.delete('/:id', (req, res) => {
  UserSchema.destroy({
    where: {
      id: req.params.id,
    },
  }).then((user) => {
    res.status(200).json({
      message: 'User Deleted',
      data: user,
    });
  }).catch((err) => {
    res.json({
      message: `Delete Failed${err}`,
    });
  });
});

router.put('/delete/:id', (req, res) => {
  UserSchema.update({
    isDeleted: 1,
  }, {
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.status(200).json({
      data: 'User Deleted',
    });
  });
});

module.exports = router;
