const express = require('express');

const router = express.Router();
const Joi = require('joi');
const AngkatanSchema = require('../../model/angkatan');

router.get('/', (req, res) => {
  AngkatanSchema.find()
    .then((data) => {
      res.status(201).json({
        data,
        message: 'true',
      });
    }).catch((err) => {
      console.log(err);
    });
});

router.post('/', (req, res) => {
  const validator = Joi.object().keys({
    tahun_masuk: Joi.string().required(),
  });
  const AngkatanData = req.body;
  Joi.validate(AngkatanData, validator, (err) => {
    if (err) {
      res.status(500).json({
        message: 'Error Insert Data',
      });
    } else {
      AngkatanSchema.create({
        tahun_masuk: req.body.tahun_masuk,
      }).then((data) => {
        res.status(200).json({
          message: 'Success Insert',
          data,
        });
      });
    }
  });
});


router.put('/:id', (req, res) => {
  AngkatanSchema.findOneAndReplace(req.params.id, {
    $set: req.body,
  }, (err, data) => {
    if (err) {
      res.status(409).json({
        message: 'Update Failed',
      });
    } else {
      res.status(201).json({
        message: 'Update Success',
        data,
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  AngkatanSchema.findOneAndRemove(req.params.id, (err, data) => {
    if (err) {
      res.status(500).json({
        err,
      });
    } else {
      res.status(200).json({
        message: 'Success Deleted',
        data,
      });
    }
  });
});

module.exports = router;
