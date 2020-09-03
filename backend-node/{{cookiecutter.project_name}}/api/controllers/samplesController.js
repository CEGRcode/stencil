// require mongoose
const mongoose = require("mongoose");

// load configuration through environment variables from .env to process.env
require("dotenv").config();

// requiring the samples model
const Sample = require("../models/sampleModel");
const getURL = process.env.PUBLIC_ENDPOINT;

// API FUNCTIONS

exports.getAllSampleMetaInfo = (req, res, next) => {
  Sample.find()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        samples: docs.map(doc => {
          return {
            _id: doc._id,
            sampleID: doc.sampleID,
            target: doc.target,
            isPublic: doc.isPublic,
            lab: doc.lab,
            headerInfo: doc.headerInfo,
            summaryInfo: doc.summaryInfo,
            sampleInfo: doc.sampleInfo,
            codingHeatmaps: doc.codingHeatmaps,
            noncodingHeatmaps: doc.noncodingHeatmaps,
            otherHeatmaps: doc.otherHeatmaps,
            motifImages: doc.motifImages,
            peakInfo: doc.peakInfo,
            subtypes: doc.subtypes,
            apriorimotifs: doc.apriorimotifs,
            chromatinState: doc.chromatinState,
            sequenceState: doc.sequenceState,
            featurePileup: doc.featurePileup,
            igvBrowser: doc.igvBrowser
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.getSearchItems = (req, res, next) => {
  Sample.find()
    .select("target") // returns only those field names from db
    .exec()
    .then(docs => {
      const response = {
        samples: docs.map(doc => {
          return {
            _id: doc._id,
            target: doc.target
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.createNewSample = (req, res, next) => {
  // creating a new object for sample
  const sample = new Sample({
    _id: new mongoose.Types.ObjectId(),
    sampleID: req.body.sampleID,
    target: req.body.target,
    isPublic: req.body.isPublic,
    lab: req.body.lab,
    headerInfo: req.body.headerInfo,
    summaryInfo: req.body.summaryInfo,
    sampleInfo: req.body.sampleInfo,
    codingHeatmaps: req.body.codingHeatmaps,
    noncodingHeatmaps: req.body.noncodingHeatmaps,
    otherHeatmaps: req.body.otherHeatmaps,
    motifImages: req.body.motifImages,
    peakInfo: req.body.peakInfo,
    subtypes: req.body.subtypes,
    apriorimotifs: req.body.apriorimotifs,
    chromatinState: req.body.chromatinState,
    sequenceState: req.body.sequenceState,
    featurePileup: req.body.featurePileup,
    igvBrowser: req.body.igvBrowser
  });
  // saving the item into the database using promises
  sample
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created the sample",
        sample: {
          _id: result._id,
          sampleID: result.sampleID,
          target: result.target,
          isPublic: result.isPublic,
          lab: result.lab,
          headerInfo: result.headerInfo,
          summaryInfo: result.summaryInfo,
          sampleInfo: result.sampleInfo,
          codingHeatmaps: result.codingHeatmaps,
          noncodingHeatmaps: result.noncodingHeatmaps,
          otherHeatmaps: result.otherHeatmaps,
          motifImages: result.motifImages,
          peakInfo: result.peakInfo,
          subtypes: result.subtypes,
          apriorimotifs: result.apriorimotifs,
          chromatinState: result.chromatinState,
          sequenceState: result.sequenceState,
          featurePileup: result.featurePileup,
          igvBrowser: result.igvBrowser
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.getTargetData = (req, res, next) => {
  const targetName = req.params.target;
  Sample.find({ target: targetName })
    .sort({ sampleId: 1 })
    .exec()
    .then(docs => {
      if (docs.length > 0) {
        res.status(200).json({
          count: docs.length,
          samples: docs.map(doc => {
            return {
              _id: doc._id,
              sampleID: doc.sampleID,
              target: doc.target,
              isPublic: doc.isPublic,
              lab: doc.lab,
              headerInfo: doc.headerInfo,
              summaryInfo: doc.summaryInfo,
              sampleInfo: doc.sampleInfo,
              codingHeatmaps: doc.codingHeatmaps,
              noncodingHeatmaps: doc.noncodingHeatmaps,
              otherHeatmaps: doc.otherHeatmaps,
              motifImages: doc.motifImages,
              peakInfo: doc.peakInfo,
              subtypes: doc.subtypes,
              apriorimotifs: doc.apriorimotifs,
              chromatinState: doc.chromatinState,
              sequenceState: doc.sequenceState,
              featurePileup: doc.featurePileup,
              igvBrowser: doc.igvBrowser
            };
          })
        });
      }
      // send the 404 message
      else {
        res.status(404).json({
          message: "No Valid Entry",
          page: "You display a search page or not found page"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.getSampleById = (req, res, next) => {
  const ID = req.params.id;
  Sample.find({ _id: ID })
    .exec()
    .then(docs => {
      if (docs.length > 0) {
        res.status(200).json({
          count: docs.length,
          samples: docs.map(doc => {
            return {
              _id: doc._id,
              sampleID: doc.sampleID,
              target: doc.target,
              isPublic: doc.isPublic,
              lab: doc.lab,
              headerInfo: doc.headerInfo,
              summaryInfo: doc.summaryInfo,
              sampleInfo: doc.sampleInfo,
              codingHeatmaps: doc.codingHeatmaps,
              noncodingHeatmaps: doc.noncodingHeatmaps,
              otherHeatmaps: doc.otherHeatmaps,
              motifImages: doc.motifImages,
              peakInfo: doc.peakInfo,
              subtypes: doc.subtypes,
              apriorimotifs: doc.apriorimotifs,
              chromatinState: doc.chromatinState,
              sequenceState: doc.sequenceState,
              featurePileup: doc.featurePileup,
              igvBrowser: doc.igvBrowser
            };
          })
        });
      }
      // send the 404 message
      else {
        res.status(404).json({
          message: "No Valid Entry",
          page: "You display a search page or not found page"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.patchSampleById = (req, res, next) => {
  const id = req.params.id;
  const updateOps = {};

  // change only the key value pairs that need to be changed
  for (let ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  // updating the data
  Sample.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Sample Updated",
        sample: result
      });
    })
    .catch(err => {
      error: err;
    });
};

exports.deleteSampleById = (req, res, next) => {
  const id = req.params.id;
  Sample.deleteOne({ _id: id })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Sample Deleted",
        request: {
          type: "POST",
          url: getURL,
          body: {
            sampleId: "String",
            target: "String"
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
