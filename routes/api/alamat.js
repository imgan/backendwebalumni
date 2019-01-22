const express = require('express');

const router = express.Router();
const Joi = require('joi');
const AlamatSchema = require('../../model/alamat');

router.get('/', (req, res) => {
  AlamatSchema.find()
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
    alamat: Joi.string().required(),
  });
  const AlamatData = req.body;
  Joi.validate(AlamatData, validator, (err) => {
    if (err) {
      res.status(500).json({
        message: 'Error Insert Data',
      });
    } else {
      AlamatSchema.create({
        alamat: req.body.alamat,
      });
    }
  });
  AlamatData.create({
    alamat: req.body.alamat,
  }).then((alamat) => {
    res.status(200).json({
      message: 'Success Insert',
      data: alamat,
    });
  });
});


router.put('/:id', (req, res) => {
  AlamatSchema.findOneAndReplace(req.params.id, {
    $set: req.body,
  }, (err, value) => {
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
});

module.exports = router;
