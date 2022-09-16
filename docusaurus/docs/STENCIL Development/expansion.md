---
sidebar_position: 2
id: tutorial
title: Example extending STENCIL tutorial
sidebar_label: Development tutorial
---

---

**While this tutorial is for *nivo* charts, it should be trivially expandable to any javascript compatible visualization framework (i.e., D3.js)**

### Overview for adding a *nivo* chart

This tutorial assumes you have a working version of STENCIL installed and you can see the existing charts. This also assumes you have the mongoDB database installed and that you have full administrative rights such as dropping the database and viewing the database for experimental purposes. Later on when data is being POSTed to database, you should be able to see the data there or drop the database and post it again.

To add the charts in the STENCIL app, one should be familiar with APIs and methods in Nivo. Nivo documentation has a lot of details on it but most important thing to consider are
- **nivo Components**
  - Install each component as required.
  - Look into the parameters that are to be provided.
  - Some of the parameters are by default provided while others are required.
  - Check the data format of the input.

### Add *nivo* dependency to frontend
- Add and install the new chart component in the package.json to install it and make it available to use later on as well.

1. Navigate to **frontend/package.json**

2. Add relevant dependency to package.json
  ```
  ...
  "@nivo/scatterplot": "^0.79.0",
  "@nivo/swarmplot": "^0.79.0", # New addition!!!
  "axios": "^0.21.4",
  ...
  ```

3. Delete previous dependencies
  - Theoretically this step is unnessary, but practically it prevents many collisions across different packages

  ```
  rm -r stencil/frontend/node_modules/
  ```

4. Re-install package.json with new chart dependency included

  ```
  npm install
  ```

### Expand the Backend API to recognize the new charts
Make sure the switch case statement is added for your chart and the datatype match with the datatype declared on the props.

1. Navigate to **backend/api/controllers/librariesController.js**

2. Add switch case statement

  ```
  case "lineplot":
  case "scatterplot":
  case "swarmplot": # New addition!!!
  case "basictable":
  case "igvtrack":        
  ```

### Add the component to STENCIL frontend

STENCIL charts follow the sample template and can be copy-pasted to generate a new charting component.

1. Navigate to **STENCIL > frontend > src > Components > Charts**

2. Copy **LinePlot_stencil.js** to **SwarmPlot_stencil.js**

  ```
  cp frontend/src/Components/Charts/LinePlot_stencil.js frontend/src/Components/Charts/SwarmPlot_stencil.js
  ```

3. Copy **FullScreenLinePlot.js** to **FullScreenSwarmPlot.js**

  ```
  cp frontend/src/Components/Charts/FullScreenLinePlot.js frontend/src/Components/Charts/FullScreenSwarmPlot.js
  ```

4. Find and replace all instances of *Line* with *Swarm*
  - Dependening on slightly variable *nivo* naming conventions, this may need to be *SwarmPlot* or some other variant
    - Check the [nivo documentation](https://nivo.rocks/swarmplot/) to be sure
  - Don't do a blind find and replace all in case you accidentally replace a critical piece code
    - i.e., 'linear' -> 'swarmar'
  - There should only be 5-6 instances that need to be replaced

#### Update the plotOptions to be relevant to the charting library
  - This step can be challenging in that each chart has different required parameters that are unique to that chart

  - Example for *SwarmPlot_stencil.js*
    - This architecture allows for overrides to occur in the JSON payload with defaults provided here if it is not in the JSON
    - The [nivo documentation](https://nivo.rocks/swarmplot/) needs to be referenced to ensure that all **required** options are flagged

  ```
  const plotOptions = {
    ...(props.chartOptions['groups']?{groups: props.chartOptions['groups']}:{ }),
    ...(props.chartOptions['value']?{value: props.chartOptions['value']}:{ }),
    ...(props.chartOptions['valueFormat']?{valueFormat: props.chartOptions['valueFormat']}:{ }),

  ...

  ```
  - Corresponding JSON payload in chartOptions
  ```
  "chartOptions": {
    "groups": ["group A", "group B", "group C"],
    "value": "price",
    "valueFormat": "$.2f",

  ...
  ```

#### Checklist for the *chart*.js file.
1. Did you import appropriate function for example `Stream` and `ResponsiveStream` for Stream Nivo component?
 and create a function to check for data and pass it.
2. Is the CardContent and/or FullScreenDialog providing props.ChartData and props.ChartOptions?
  - The props are made available through a JSON file from Stencil backend.
3. Is the export the chart function updated?

### Update ImageArray.js
ImageArray.js controls the location and placement of all charting objects. For every chart type, we will have to import the functions exported earlier. Add a case for the chart in the grid object as provided already for number of other charts.

1. Navigate to **STENCIL > frontend > src > Components > Sections**

2. Add new *chart*.js to the import fields
```
import HeatMap from "../Charts/Heatmap_stencil";
import SwarmPlot from "../Charts/SwarmPlot_stencil"; # New addition!!!
```

3. Add code block to the switch case statements to declare the new *chart*.js

  **The case statement phrase should match what was added to the backend EXACTLY**

  ```
  case "heatmap":
    return (sizes===undefined)?(
      <Grid item key={stepId}>
      <HeatMap chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={600} height={500} />
      </Grid>):(
      <Grid item key={stepId}>
      <HeatMap chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={sizes[0]} height={sizes[1]} />
      </Grid>
    );
  # New addition!!!
  case "swarmplot":
    return (sizes===undefined)?(
      <Grid item key={stepId}>
      <SwarmPlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={600} height={500} />
      </Grid>):(
      <Grid item key={stepId}>
      <SwarmPlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={sizes[0]} height={sizes[1]} />
      </Grid>
    );
  ```

#### Checklist for ImageArrays.js
1. Always check if the props object are populated with data and options or not. Usually, if these are not provided you will see error or na.png file as a default chart rendered.
2. Check for item, size, stepid as well. Refer to src/Config.js for different stepID configurations for different layouts available in the Stencil. This will also give different error if the StepID is not configured properly.
3. Very rarely, the component could not fetch the data from backend for which you should look into showLibrary.js. Appropriate console.log on that file is already put to see whether or not data is being fetched from the backend. Confirm that you see the chartdata and chartOptions here as well.

### Add sample data
  - Regularly confirm you still have a valid JSON as you edit these files!
  - https://jsonlint.com/ allows you to copy/paste your JSON file and quickly check for errors

1. Navigate to **STENCIL > backend > sampleData > LocalData**
- This folder will have the data file needed to create the image. Each of the component requires slightly different file structures and parameters based on the chart. Consult to [Nivo website](https://nivo.rocks/swarmplot/) and existing files for the already created charts.

2. Copy existing data template to new *chart*.js dataset

  ```
  cp backend/sampleData/localdata/lineplot.json backend/sampleData/localdata/swarmplot_data.json
  ```

3. Update "chartData" in the new JSON file
  - To generate sample data, we recommend copying the test data directly from the relevant *nivo* chart on the website

4. Delete all data under "chartOptions" for now but leave the header

5. Create the JSON POST for the sample

  ```
  cp backend/sampleData/Sample_Template.json backend/sampleData/Sample_SwarmPlot.json
  ```
  - Update the word 'template' with the proper *chart*.js nomenclature
  - i.e., "dataType": "template", -> "dataType": "swarmplot",
  ```
  {
  	"projectId": "Chart Examples",
  	"libraryType": "SwarmPlot example",
  	"sampleId": "SwarmPlot",
  	"libraryId": "SwarmPlot",
  	"libraryDescription": "Example of SwarmPlot chart",
  	"createdBy": "cegr@cornell.edu",
  	"token": "XXXXXXXXXXXXXXXXXX",
  	"submitter": "cegr@cornell.edu",
  	"libraryData": [
  		{
  			"id": "swarm_plot",
  			"dataType": "swarmplot",
  			"layoutId": "SingleChart",
  			"layoutTitle": "Example of SwarmPlot",
  			"tabId": "SwarmPlot",
  			"URL": "http://localhost:8081/localdata/swarmplot_data.json",
  			"stepId": "0"
  		}
  	]
  }
  ```

6. Update the POST script
  - Navigate to **STENCIL > backend > utils > post_all.sh**
  ```
  # nivo sample data
  python3 postLibrary.py ../sampleData/Sample_SwarmPlot.json
  ```

  - This folder has utility functions needed to post data to the Database. Every time any change on the data files included on the LocalData, this should be run to see the update. Update on the frontend such as dimensions etc are live in React but the updates involving the data and sessions are to be reloaded by rebuilding the build process from the beginning.

7. POST the data!
  ```
  sh backend/utils/post_all.sh
  ```

### Tips and Tricks
- Prettyprint options online or on your editor can help navigate the json provided.
For example, in **STENCIL > backend > sampleData > localdata > ENCODE > AS > streamplot.json**, we can see nested structure with ‘chartOptions’ and ‘chartdata’ provided. These are used to create the props. Any errors regarding props maybe traced to the parameters and the file provided for the intended chart function.

- Consult *nivo* website documentation for the parameters to provide, how they should be provided and the parameters( default values and input required ones)

- Once the data is provided, we need a way to tell the backend the layout details required for creating the charts. The layout details, charts data, options are all provided by the backend to frontend.

- Create another file or an entry on the file, for example, sampleData/ATAC-seq_DESeq2 2.json provide details on your project, charts data type, stepid etc. be extra careful on how stepId should be provided for your layout ID. In the URL, provide where the Data file where chartOptions and ChartData were loaded for your chart. The data type should match as well for the type of chart which should match with options and data format it needs.

- Before that we need to register the Data in the Controller module in stencil/backend/api/controllers/librariesController.js  Here for each item/chart , we build a URL. Find the code where it is building the URL. Similar to case “streamplot”, add the case for your chart.
