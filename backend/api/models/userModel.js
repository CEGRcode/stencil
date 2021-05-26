const mongoose = require("mongoose");

// define the schema for a user, each user has below properties.
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // User name
  userName: { type: String },
  // User email
  userEmail: {type: String},
  // User password
  userPassword: { type: String },
  // User role: admin, member, guest
  role: {type:String},
  // Authorization mode
  authMode: { type: String },
  // List of projects the user has access to
  projects: {type: Array, of: String },
  // Time user instance was created
  createTimestamp: {type: Date},
  // Time user instance was updated
  updateTimestamp: {type: Date},
  // Status of user (active/inactive)
  status: {type: String},
}
, { collection: 'stencilUsers' }
);

module.exports = mongoose.model("User", userSchema);
