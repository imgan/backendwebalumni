const express = require('express');

const router = express.Router();
const Joi = require('joi');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const multer = require('multer');
const UserSchema = require("../../model/user");
/* GET users listing. */

router.get('/', (req, res, next) => {
 UserSchema.find().then(function (users) {
   res.status(200)
   .json({ 
     error: false,
     status: 200,
     data: users
     });
  }).catch(function (err) {
    console.log('Oops! something went wrong, : ', err);
  });
});

router.get('/:id', (req,res) => {
  UserSchema.findAll({
    where : {
      id: req.params.id
    }
  }).then( function(user){
      res.status(200).json({
        error : false,
        status : 200,
        data : user
      });
  }).catch(function (err){
    console.log('Oops! something went wrong, : ', err);
  });
});

router.post('/register', (req,res) => {
  UserSchema.find().then(user =>{
    if(user.length >=1 ){
      res.status(409).json({
        message : 'data already exist !'
      })
    }
    else {
      const data = req.body;
      const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        phone: Joi.string().min(9).max(15),
        username: Joi.string().required().min(5).max(25),
        password: Joi.string().required(),
        image: Joi.string()
      });
      Joi.validate(data, schema, (err, value) => {
        if (err) {
          res.status(402).json({
            message: 'Invalid request data'
          });
        } else {
          bcrypt.hash(req.body.password,10, async function(err,hash){
          //  console.log(hash);
              UserSchema.create({
              email: req.body.email,
              phone: req.body.phone,
              username: req.body.username,
              password: hash,
              image: req.body.image
            })
              .then(user => {
                let transporter = nodemailer.createTransport({
                  host: 'smtp.gmail.com',
                  port: 587,
                  secure: false, // true for 465, false for other ports
                  auth: {
                    user: process.env.GMAIL_ACCOUNT, // generated ethereal user
                    pass: process.env.GMAIL_PASSWORD // generated ethereal password
                  },
                  tls: {
                    rejectUnauthorized: false
                  }
                });
                let mailOptions = {
                  from: '"automailteamalpha" automailteamalpha@gmail.com', // sender address
                  to: req.body.email, // list of receivers
                  subject: 'Selamat datang di team alpha online', // Subject line
                  text: 'Hello world?', // plain text body
                  html: '<b>Hello world?</b>' // html body
                };
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    return console.log(error);
                  }
                  console.log('Message sent: %s', info.messageId);
                  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });
                res.status(200).json({
                  message: 'User Created',
                  data: user
                });
          })
            })
        }
      })
    }
  })
 },);

router.delete('/:id', (req,res) => {
  UserSchema.destroy({
    where : {
      id:req.params.id
    }
  }).then(user =>{
    res.status(200).json({
      message: 'User Deleted',
      data : user
    });
  }).catch(err =>{
    res.json({
      message: 'Delete Failed' + err
    })
  })
});

router.put('/delete/:id', (req,res) => {
  UserSchema.update({
    isDeleted : 1
  },{
    where :{
      id: req.params.id
    }
  }).then(user => {
    res.status(200).json({
      data:'User Deleted'
    })
  })
});

router.post('/login', (req,res) => {
  UserSchema.findAll({
    where: {
      email:req.body.email
    }
  })
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign({
            email: user[0].email,
            password: user[0].password
          }, process.env.MY_JWT, {
              expiresIn: "1h"
            });
          res.status(200).json({

            message: "Auth Success",
            token: token
          });
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname  }-${  Date.now()}`);
  },
});
let upload = multer({ storage });
router.put('/profile/:id', upload.single('file'), (req,res) => {
 UserSchema.update({
   image : req.file.path
  },{
     where: {
       id: req.params.id
     }
  }).then(data=>{
    res.status(200).json({
      message: 'Upload Successfuly',
      data: data
    })
  }).catch(err=>{
    res.status(500).json({
      message: 'Upload Failed' + err
    })
  })
});

module.exports = router;
