---
sidebar_position: 3
id: payload
title: Galaxy POST command
sidebar_label: Galaxy integration
---

---

## Galaxy integration with STENCIL
 - Galaxy integration with STENCIL is facilitated by adding a simple python POST tool into a Galaxy workflow.
 - Example Galaxy scripts (with XML) to allow Galaxy to POST to STENCIL:
   - https://github.com/CEGRcode/galaxy_tools_for_stencil

## JSON payload

**projectId**
  - projectId is the highest level of categorizing the data in STENCIL.
  - STENCIL consists of many projects.
  - Each project consists of many samples and each sample consist of many libraries.

**libraryType**
  - Type of the library that is POSTed to STENCIL.
  - Examples are "RNA-seq", "ATAC-seq", and "ChIP-seq".

**sampleId**
  - Name of the sample which the library belongs.
  - One sample can have multiple libraries.
  - An example of multiple libraries for a sample may be different replicates for a sample.

**libraryId**
  - An ID given to a library that is POSTed from Galaxy to STENCIL.

**libraryDescription**
 - Optional free-form string description about the library

**createdBy**
 - Username of the Galaxy account under which the library is POSTed.

**createTimestamp**
 - The time the library is originally POSTed to STENCIL

**updatedBy**
 - Username of the Galaxy account under which the POST is updated.

**updateTimestamp**
 - Timestamp from when the library was last updated.

**token**
 - API key that is used to verify permission to POST to Stencil
 - This is defined in the backend's .env file under SVC_STENCIL_PWD

**groupTag**
 - An array of additional meta information associated with each library.
 - An example is Galaxy HistoryID where the associated data read by STENCIL resides.

**libraryData**
 - An array element containing the meta-information for each plot/chart/table/image POSTed to STENCIL.
 - The format of this element is detailed below.

## libraryData Array

**id**
 - A unique id assigned to each dataset in Galaxy
 - If a Galaxy historyID is POSTed to STENCIL using this parameter, the path to reproducibility is maintained

**dataType**
 - Type of data to be visualized in STENCIL.
 - Examples are PNG, SVG, JPG, basictable, lineplot, barchart, scatterplot, heatmap

**layoutId**
 - This is the unique ID of the layoutID that this data should be applied to.
 - See [Configure Layout](configlayout.md) for additional details.

**layoutTitle**
 - This is title for the layout section.

**tabId**
 - Each Layout may consists of multiple Tabs.
 - This variable sets the displayed name of Tabs.

**URL**
 - URL of the location where STENCIL can access the data resides in Galaxy.
 - This can be any arbitrary URL

**stepId**
 - Each Tab consists of multiple “Steps”.
 - Steps indicates where exactly in the Tab the data needs to be visualized.

## Example Payload

**Example payload:**
```
{
  "projectId": "Yeast Epigenome Project",
  "libraryType": "Meta-analysis",
  "sampleId": "UMAP meta-analysis",
  "libraryId": "UMAP",
  "libraryDescription": "UMAP meta-analysis of all ChIP-exo data-sets generated in the Yeast Epigenome Project",
  "createdBy": "cegr@cornell.edu",
  "token": "SGAN9WTPAUCAYDO8A8HD",
  "submitter": "cegr@cornell.edu",
  "libraryData": [
  	{
  		"id": "UMAP_plot",
  		"dataType": "scatterplot",
  		"layoutId": "SingleChart",
  		"layoutTitle": "UMAP of Yeast Epigenome",
  		"tabId": "Scatter Plot",
  		"URL": "http://localhost:8081/localdata/YEP/UMAP/UMAP_scatterplot.json",
  		"stepId": "0"
  	},
  	{
      "id": "UMAP_rawdata",
  		"dataType": "basictable",
      "layoutId": "SingleChart",
  		"layoutTitle": "UMAP of Yeast Epigenome",
      "tabId": "UMAP Data",
      "URL": "http://localhost:8081/localdata/YEP/UMAP/UMAP_table.json",
      "stepId": "0"
    }
  ]
}
```
