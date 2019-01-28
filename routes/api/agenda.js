const express = require('express');

const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const multer = require('multer');
const AgendaSchema = require('../../model/agenda');

router.get('/', (req, res) => {
  AgendaSchema.find()
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
  AgendaSchema.findById(req.params.id)
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
  const validator = Joi.object().keys({
    tema: Joi.string().required().min(5),
    tema_seo: Joi.string().required().min(5),
    isiAgenda: Joi.string().required(),
    tempat: Joi.string().required(),
    image: Joi.string(),
    userPost: Joi.string(),
  });
  const AgendaData = req.body;
  Joi.validate(AgendaData, validator, (err) => {
    if (err) {
      res.status(402).json({
        message: 'Invalid Request Data',
      });
    } else {
      AgendaSchema.create({
        _id: mongoose.Types.ObjectId(),
        tema: req.body.tema,
        tema_seo: req.body.tema_seo,
        isiAgenda: req.body.isiAgenda,
        tempat: req.body.tempat,
        tgl_mulai: req.body.tgl_mulai,
        tgl_selesai: req.body.tgl_selesai,
        // image: req.file.path,
        userPost: req.body.userPost,

      }).then((agenda) => {
        res.status(201).json({
          data: agenda,
          message: 'Agenda Added',
        });
      });
    }
  });
});

router.put('/:id', (req, res) => {
  const data = req.body;
  const validator = Joi.object().keys({
    tema: Joi.string().required(),
    tema_seo: Joi.string(),
    isiAgenda: Joi.string(),
  });
  Joi.validate(data, validator, (err) => {
    if (err) {
      res.status(402).json({
        message: `Invalid Request Data${err}`,
      });
    } else {
      AgendaSchema.findOneAndReplace(req.params.id, {
        $set: req.body,
      }, (value) => {
        if (err) {
          res.status(409).json({
            message: 'Update Failed',
          });
        } else {
          res.status(201).json({
            message: 'Update Success',
            data: value,
          });
        }
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  AgendaSchema.findByIdAndDelete(req.params.id, (err, result) => {
    if (result) {
      res.status(201).json({
        message: 'Delete Succes',
        data: `Id ${req.params.id} Deleted`,
      });
    } else {
      res.status(404).json({
        message: 'Data Not Found',
      });
    }
  });
});

module.exports = router;
