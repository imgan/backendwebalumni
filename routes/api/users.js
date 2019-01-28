const express = require('express');

const router = express.Router();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const multer = require('multer');
const mongoose = require('mongoose');
const UserSchema = require('../../model/user');
/* GET users listing. */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({ storage });
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/', failureRedirect: '/login' }));
passport.serializeUser((user, done) => {
  console.log(user);
  // eslint-disable-next-line no-underscore-dangle
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  UserSchema.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APPID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.CALLBACK_FACEBOOKURL,
      profileFields: ['id', 'displayName', 'emails'],
    },
    // eslint-disable-next-line no-unused-vars
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const me = new UserSchema({
        email: profile.emails[0].value,
        name: profile.displayName,
      });

      /* save if new */
      UserSchema.findOne({ email: me.email }, (err, u) => {
        if (!u) {
          me.save((res) => {
            res.status(500).json({
              message: 'Internal Server Error',
            });
          });
        } else {
          console.log(u);
        }
      });
    },
  ),
);
router.get('/', (req, res) => {
  UserSchema.find().then((users) => {
    res.status(200)
      .json({
        error: false,
        status: 200,
        data: users,
      });
  }).catch((err) => {
    console.log('Oops! something went wrong, : ', err);
  });
});

router.get('/:id', (req, res) => {
  UserSchema.findOne({
    where: {
      id: req.params.id,
    },
  }).then((user) => {
    res.status(200).json({
      error: false,
      status: 200,
      data: user,
    });
  }).catch((err) => {
    console.log('Oops! something went wrong, : ', err);
  });
});

router.post('/register', (req, res) => {
  UserSchema.find({
    email: req.body.email,
  }).then((user) => {
    if (user.length >= 1) {
      res.status(409).json({
        message: 'data already exist !',
      });
    } else {
      const data = req.body;
      const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        phone: Joi.string().min(9).max(15),
        username: Joi.string().required().min(5).max(25),
        password: Joi.string().required(),
        image: Joi.string(),
      });
      Joi.validate(data, schema, (err) => {
        if (err) {
          res.status(402).json({
            message: 'Invalid request data',
            err,
          });
        } else {
          // eslint-disable-next-line no-shadow
          bcrypt.hash(req.body.password, 10, (err, hash) => {
          //  console.log(hash);
            const { username } = req.body;
            const { password } = req.body;
            const pesan = `Selamat datang di Team Alpha Online <b>Username</b> Kamu adalah ${username} dan <b>Password</b> ${password}`;
            // console.log(pesan);
            UserSchema.create({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              phone: req.body.phone,
              username: req.body.username,
              password: hash,
              image: req.body.image,
              method: 'web',
            })
              // eslint-disable-next-line no-shadow
              .then((user) => {
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
                  to: req.body.email, // list of receivers
                  subject: 'Selamat datang di team alpha online', // Subject line
                  html: `${pesan}<b> <br><br><br>Tolong jangan kasih tau siapa siapa ya ^_^ <br>
                  <br>
                  <br>Regards Teeam Alpha Online`, // html body
                };
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    res.status(500);
                  }
                  // eslint-disable-next-line no-console
                  console.log('Message sent: %s', info.messageId);
                  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });
                res.status(200).json({
                  message: 'User Created',
                  data: user,
                });
              });
          });
        }
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  UserSchema.findOneAndDelete(req.params.id).then((result) => {
    if (result) {
      res.status(200).json({
        message: 'User Deleted',
        data: result,
      });
    } else {
      res.status(404).json({
        message: 'User Not Found',
      });
    }
  });
});

router.put('/:id', (req, res) => {
  UserSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  }).then(() => {
    res.status(200).json({
      data: 'User Updated',
    });
  });
});

router.post('/login', (req, res) => {
  UserSchema.find({
    email: req.body.email,
    isDeleted: 0,
  })
    .then((user) => {
      console.log(user);
      if (user.length < 1) {
        res.status(401).json({
          message: 'Email Tidak Ditemukan',
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          res.status(401).json({
            message: 'Auth failed',
          });
        }
        if (result) {
          const token = jwt.sign({
            email: user[0].email,
            password: user[0].password,
          }, process.env.MY_JWT, {
            expiresIn: '1h',
          });
          res.status(200).json({

            message: 'Auth Success',
            token,
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.put('/profile/:id', upload.single('pathFile'), (req, res) => {
  UserSchema.findOneAndUpdate(req.params.id, {
    image: req.body.pathFile,
  })
    .then((data) => {
      res.status(200).json({
        message: 'Upload Successfuly',
        data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Upload Failed${err}`,
      });
    });
});

module.exports = router;
