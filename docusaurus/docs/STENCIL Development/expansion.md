---
sidebar_position: 2
id: tutorial
title: Example extending STENCIL tutorial
sidebar_label: Development tutorial
---

---

# Overview for adding a *nivo* chart
This tutorial after you have installed necessary packages, and you can see the existing charts. This also assumes you have database installed and you can experiment with mongoDB such as dropping the database, viewing the database for experimental purposes. Later on when data is being posted to database, you should be able to see the data there or drop the database and post it again.

To add the charts in the stencil app, one should be familiar with APIs and methods in Nivo. Nivo documentation has a lot of details on it but most important thing to consider are
- **nivo Components**
  - Install each component as required.
  - Look into the parameters that are to be provided.
  - Some of the parameters are by default provided while others are required.
  - Check the data format of the input.

Add (install) the chart component in the package.json to install it and make it available to use later on as well.

```
npm install
```

### Add the components to STENCIL
Navigate to **STENCIL > frontend > src > Components > Charts**

Some of the charts are already added there. Similar to these charts, make a new javascript file for adding the component for the intended chart.

For example: *StreamPlot_stencil.js*

#### Checklist for the *chart*.js file.
1. Import appropriate function for example `Stream` and `ResponsiveStream` for Stream Nivo component and create a function to check for data and pass it.
2. The CardContent and/or FullScreenDialog should be provided props.ChartData and props.ChartOptions. The props are made available through a json file from Stencil backend.
3. Export the function created.

Navigate to **STENCIL > frontend > src > Components > Sections**

ImageArray.js builds all the png images declared on the Charts folder. For every chart type, we will have to import the functions exported earlier. Add a case for the chart in the grid object as provided already for number of other charts.

#### Checklist for ImageArrays.js
1. Always check if the props object are populated with data and options or not. Usually, if these are not provided you will see error or na.png file as a default chart rendered.
2. Check for item, size, stepid as well. Refer to src/Config.js for different stepID configurations for different layouts available in the Stencil. This will also give different error if the StepID is not configured properly.
3. Very rarely, the component could not fetch the data from backend for which you should look into showLibrary.js. Appropriate console.log on that file is already put to see whether or not data is being fetched from the backend. Confirm that you see the chartdata and chartOptions here as well.

Navigate to **STENCIL > backend > sampleData > LocalData**

This folder will have the data file needed to create the image. Each of the component require different file structures and parameters. Consult to Nivo website and existing files for the already created charts.

Prettyprint options online or on your editor can help navigate the json provided.
For example, in **STENCIL > backend > sampleData > localdata > ENCODE > AS > streamplot.json**, we can see nested structure with ‘chartOptions’ and ‘chartdata’ provided. These are used to create the props. Any errors regarding props maybe traced to the parameters and the file provided for the intended chart function.

Consult *nivo* website documentation for the parameters to provide, how they should be provided and the parameters( default values and input required ones)

Once the data is provided, we need a way to tell the backend the layout details required for creating the charts. The layout details, charts data, options are all provided by the backend to frontend.

Create another file or an entry on the file, for example, sampleData/ATAC-seq_DESeq2 2.json provide details on your project, charts data type, stepid etc. be extra careful on how stepId should be provided for your layout ID. In the URL, provide where the Data file where chartOptions and ChartData were loaded for your chart. The data type should match as well for the type of chart which should match with options and data format it needs.

Before that we need to register the Data in the Controller module in stencil/backend/api/controllers/librariesController.js  Here for each item/chart , we build a URL. Find the code where it is building the URL. Similar to case “streamplot”, add the case for your chart.

#### Checklist for librariesController.js
1. Make sure the case is added for your chart and the datatype match with the datatype declared on the props.

Navigate to **STENCIL > backend > utils**

This folder has utility functions needed to post data to the Database. Every time any change on the data files included on the LocalData, this should be run to see the update. Update on the frontend such as dimensions etc are live in React but the updates involving the data and sessions are to be reloaded by rebuilding the build process from the beginning.

In post_all.sh bash script the python commands are provided to post the data. Find your data either in ENCODE or AS or any other subfolders in the localdata folder.
