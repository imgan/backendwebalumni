const express = require('express');

const router = express.Router();
const Joi = require('joi');
const BeritaSchema = require('../../model/berita');

router.get('/', (req, res) => {
  BeritaSchema.find()
    .then((data) => {
      res.status(201).json({
        data,
        message: 'true',
      });
    }).catch((err) => {
      console.log(err);
    });
});

router.get('/:id', (req, res) => {
  BeritaSchema.findById(req.params.id)
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
    tema: Joi.string().required(),
    tema_seo: Joi.string().required(),
    isiAgenda: Joi.string().required(),
  });
  const AgendaData = req.body;
  Joi.validate(AgendaData, validator, (err) => {
    if (err) {
      res.status(402).json({
        message: 'Data Cannot be null',
      });
    } else {
      BeritaSchema.create({
        tema: req.body.email,
        tema_seo: req.body.phone,
        isiAgenda: req.body.username,
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
      BeritaSchema.findOneAndReplace(req.params.id, {
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
  BeritaSchema.findByIdAndDelete(req.params.id, (err, value) => {
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
