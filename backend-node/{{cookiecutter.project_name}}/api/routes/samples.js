const express = require("express");
const router = express.Router();

// require the samplesController
const samplesController = require("../controllers/samplesController");

// GET
// retrieve all samples
router.get("/", samplesController.getAllSampleMetaInfo);
// search items
router.get("/search", samplesController.getSearchItems);
// using target name
router.get("/:target", samplesController.getTargetData);
// get data using mongoID
router.get("/id/:id", samplesController.getSampleById);

// POST
// create one new sample
router.post("/", samplesController.createNewSample);

// PATCH
// update one or more sample information
router.patch("/:id", samplesController.patchSampleById);

// DELETE
// delete a sample
router.delete("/:id", samplesController.deleteSampleById);

// export the router
module.exports = router;
