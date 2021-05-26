const mongoose = require("mongoose");

// define the schema for a project, each project has below properties.
// A project is a collection of libraries
const projectSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // Unique ID of project
  projectId: { type: String },
  // Public/Private status of project
  public: {type: Boolean},
  // Free-form string descriptor of project
  description: {type:String}
}
, { collection: 'stencilProjects' }
);

module.exports = mongoose.model("Project", projectSchema);
