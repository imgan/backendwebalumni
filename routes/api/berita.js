const express = require('express');

const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const BeritaSchema = require('../../model/berita');

router.get('/', (req, res) => {
  BeritaSchema.find()
    .then((data) => {
      res.status(200).json({
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
    id_kategori_berita: Joi.string(),
    judul: Joi.string().required(),
    sub_judul: Joi.string().required(),
    youtube: Joi.string(),
    judul_seo: Joi.string(),
    isiBerita: Joi.string(),
    tema: Joi.string().required(),
    gambar: Joi.string(),
    tema_seo: Joi.string().required(),
    userPost: Joi.string(),
  });
  const AgendaData = req.body;
  Joi.validate(AgendaData, validator, (err) => {
    if (err) {
      res.status(402).json({
        message: 'Invalid Request Data',
        err,
      });
    } else {
      BeritaSchema.find({
        judul: req.body.judul,
      }).then((result) => {
        if (result.length >= 1) {
          res.status(409).json({
            message: `Judul Berita ${req.body.judul} Telah Digunakan`,
          });
        } else {
          BeritaSchema.create({
            _id: mongoose.Types.ObjectId(),
            sub_judul: req.body.sub_judul,
            youtube: req.body.youtube,
            judul_seo: req.body.judul_seo,
            tema: req.body.tema,
            tema_seo: req.body.tema_seo,
            judul: req.body.judul,
            id_kategori_berita: req.body.id_kategori_berita,
            isiBerita: req.body.isiBerita,
            userPost: req.body.userPost,
          }).then((berita) => {
            res.status(201).json({
              data: berita,
              message: 'Berita Added',
            });
          });
        }
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
