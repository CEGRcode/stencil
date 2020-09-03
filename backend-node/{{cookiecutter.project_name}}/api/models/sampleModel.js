const mongoose = require("mongoose");

// define the schema for a sample, each sample has below properties.
const sampleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sampleID: { type: String },
  target: { type: String },
  isPublic: { type: Object },
  lab: { type: Object },
  headerInfo: { type: Object },
  summaryInfo: { type: Object },
  sampleInfo: { type: Object },
  codingHeatmaps: { type: Object },
  noncodingHeatmaps: { type: Object },
  otherHeatmaps: { type: Object },
  motifImages: { type: Object },
  peakInfo: { type: Object },
  subtypes: { type: Object },
  apriorimotifs: { type: Object },
  chromatinState: { type: Object },
  sequenceState: { type: Object },
  featurePileup: { type: Object },
  igvBrowser: { type: Object }
});

module.exports = mongoose.model("Sample", sampleSchema);
