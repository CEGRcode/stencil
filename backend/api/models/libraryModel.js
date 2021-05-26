const mongoose = require("mongoose");

// define the schema for a sample, each sample has below properties.
const librarySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // ID for each analysis page in STENCIL
  libraryId: { type: String },
  // Free-form string descriptor (text on page) of library page
  libraryDescription: {type:String},
  // Additional ID related to library
  sampleId: {type: String},
  // Descriptor link to what project this library belonds too
  projectId: { type: String },
  // Map of descriptor string beloning to each library
  groupTag: {type: Map, of: String},
  // Asssay/Analysis type used to generate library
  libraryType: {type: String},
  // Array containing all analysis to be visualized by STENCIL
  libraryData: {type: Array, of: Map},
  // User ID of who created library
  createdBy: {type: String},
  // Timestamp of library creation
  createTimestamp: {type: Date},
  // User ID of who updated library
  updatedBy: {type: String},
  // Timestamp of library update
  updateTimestamp: {type: Date},
  // Status of library
  status: {type: String}
}
, { collection: 'stencilLibraries' }
);

module.exports = mongoose.model("Library", librarySchema);
