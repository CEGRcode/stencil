const express = require("express");
const router = express.Router();

// require the librariesController
const librariesController = require("../controllers/librariesController");

// GET
// retrieve all libraries
router.get("/", librariesController.getAllLibraryMetaInfo);
router.get("/all/:token", librariesController.getBatchLibraryMetaInfo);
router.get("/dbid/:dbid", librariesController.queryLibraryDataById);
router.get("/uid/:uid", librariesController.queryUserId);
router.get("/alluid", librariesController.allUsers);
router.get("/allprojs", librariesController.allProjects);
router.get("/projdesc", librariesController.projDesc);

// POST
// create one new library
router.post("/", librariesController.createNewLibrary);


// DELETE
// delete a libary by database id
router.delete("/dbid/:token/:dbid", librariesController.deleteLibraryById);

// DELETE
// delete a libary by user library id and project ID
router.delete("/libid/:token/:projid/:libid", librariesController.deleteLibraryByLibId);


// export the router
module.exports = router;
