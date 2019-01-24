const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Joi = require('joi');
const nodemailer = require('nodemailer');
const AutomailSchema = require('../../model/automail');
const UserSchema = require('../../model/user');

// eslint-disable-next-line arrow-body-style, no-unused-vars
const listemail = () => {
  return new Promise((resolve, reject) => {
    const email = UserSchema.find({});
    email.select('email');
    email.exec((err, emails) => {
      if (err) {
        reject(err);
      } else {
        resolve(emails);
      }
    });
  });
};

// eslint-disable-next-line no-unused-vars
const sendmail = (email, AutomailData) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_ACCOUNT, // generated ethereal user
      pass: process.env.GMAIL_PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: '"automailteamalpha" automailteamalpha@gmail.com', // sender address
    to: email, // list of receivers
    subject: AutomailData.subject, // Subject line
    text: AutomailData.message, // plain text body
    html: AutomailData.message, // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
};

router.get('/', (req, res) => {
  AutomailSchema.find()
    .then((data) => {
      res.status(201).json({
        data,
        message: 'true',
      });
    }).catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

router.get('/:id', (req, res) => {
  AutomailSchema.findById(req.params.id)
    .then((data) => {
      res.status(201).json({
        data,
        message: 'true',
      });
    }).catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

router.post('/', (req, res) => {
  const validator = Joi.object().keys({
    subject: Joi.string().required(),
    message: Joi.string().required(),
    userpost: Joi.string().required(),
  });
  const AutomailData = req.body;
  Joi.validate(AutomailData, validator, async (err) => {
    if (err) {
      res.status(402).json({
        message: 'Data Cannot be null',
      });
    } else {
      try {
        const emails = await listemail();
        // eslint-disable-next-line no-unused-vars
        const sendmails = await sendmail(emails, AutomailData);
        AutomailSchema.create({
          _id: new mongoose.Types.ObjectId(),
          subject: req.body.subject,
          message: req.body.message,
          userpost: req.body.userpost,
        }).then((automail) => {
          res.status(201).json({
            data: automail,
            message: 'Automail Log Added',
          });
        });
      } catch (error) {
        res.status(500).json({
          error,
          message: false,
        });
      }
    }
  });
});

module.exports = router;
