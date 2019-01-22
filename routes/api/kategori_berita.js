const express = require('express');

const router = express.Router();
const Joi = require('joi');
const KategoribSchema = require('../../model/kategori_berita');

router.get('/', (req, res) => {
  KategoribSchema.find()
    .then((data) => {
      res.status(201).json({
        data,
        message: 'true',
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

router.get('/:id', (req, res) => {
  KategoribSchema.findById(req.params.id)
    .then((data) => {
      res.status(201).json({
        data,
        message: 'true',
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

router.post('/', (req, res) => {
  const validator = Joi.object().keys({
    nama_kategori: Joi.string().required(),
  });
  const KategoriBData = req.body;
  Joi.validate(KategoriBData, validator, (err) => {
    if (err) {
      res.status(402).json({
        message: 'Data Cannot be null',
      });
    } else {
      KategoribSchema.create({
        nama_kategori: req.body.nama_kategori,
      }).then((data) => {
        res.status(201).json({
          data,
          message: 'Kategori Added',
        });
      });
    }
  });
});

router.put('/:id', (req, res) => {
  const data = req.body;
  const validator = Joi.object().keys({
    nama_kategori: Joi.string().required(),
  });
  Joi.validate(data, validator, (err) => {
    if (err) {
      res.status(402).json({
        message: `Invalid Request Data${err}`,
      });
    } else {
      KategoribSchema.findOneAndReplace(
        req.params.id,
        {
          $set: req.body,
        },
        (value) => {
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
        },
      );
    }
  });
});

router.delete('/:id', (req, res) => {
  KategoribSchema.findByIdAndDelete(req.params.id, (err, value) => {
    if (value.length > 1) {
      res.status(404).json({
        message: 'Data Not Found',
        data: value,
      });
    } else {
      res.status(201).json({
        message: 'Delete Succes',
        data: `Id ${req.params.id} Deleted`,
      });
    }
  });
});

module.exports = router;
