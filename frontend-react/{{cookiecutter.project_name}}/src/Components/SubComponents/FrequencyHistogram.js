import React from "react";
import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import ImportIcon from "@material-ui/icons/GetApp";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// sub components
import { ResponsiveBar, Bar } from "@nivo/bar";

// component styles
const styles = {
  card: {
    minWidth: 400
  },
  pos: {
    marginBottom: 12
  },
  chartContainer: {
    height: 500,
    width: 800,
    margin: "0 auto"
  }
};

function FrequencyHistogram(props) {
  const { classes } = props;

  let chartData = [];
  let chartKeys = [];

  let sample = props.data["sampleYaxis"].split(",");
  let control = props.data["controlYaxis"].split(",");
  let genome = props.data["genomeYaxis"].split(",");
  let xaxis = props.data["featureXaxis"].split(",");

  for (var i = xaxis.length - 1; i >= 0; i--) {
    chartData.push({
      item: xaxis[i],
      sampleFreq: parseFloat(sample[i]),
      controlFreq: parseFloat(control[i]),
      genomicFreq: parseFloat(genome[i])
    });
    chartKeys.push(xaxis[i]);
  }

  const plotOptions = {
    // plot settings
    margin: {
      top: 0,
      right: 20,
      bottom: 80,
      left: 130
    },
    theme: {
      fontSize: 14,
      fontFamily: "Roboto Slab"
    },
    axisBottom: {
      tickSize: 9,
      tickPadding: 15,
      tickRotation: 0,
      legend: "",
      legendPosition: "middle",
      legendOffset: 70
    },
    axisLeft: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendPosition: "middle",
      legendOffset: 48
    },
    groupMode: "grouped",
    indexBy: "item",

    padding: 0.3,
    innerPadding: 1,
    colors: ["#2979ff", "#d32f2f", "#212121"],
    colorBy: "id",

    enableLabel: false,
    layout: "horizontal",
    enableGridX: true,
    enableGridY: true,
    borderColor: "inherit:darker(1.6)",

    labelSkipWidth: 12,
    labelSkipHeight: 12,
    labelTextColor: "inherit:darker(1.6)",
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
    legends: [
      {
        dataFrom: "keys",
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 80,
        itemsSpacing: 50,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 1.0,
        symbolSize: 15
      }
    ]
  };

  // Function to export the plot as svg
  let svgString = "";
  const handleExport = () => {
    svgString = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Bar, {
        animate: false,
        isInteractive: false,
        renderWrapper: false,

        data: chartData,
        keys: ["sampleFreq", "controlFreq", "genomicFreq"],

        width: 1200,
        height: 500,

        ...plotOptions
      })
    );

    // creating an svg file and triggering download
    const element = document.createElement("a");
    const file = new Blob([svgString]);
    element.href = URL.createObjectURL(file);
    element.download = "frequencyHistogram.svg";
    // Required for this to work in FireFox
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className={classes.card}>
      <Grid container direction="row-reverse">
        <Grid item></Grid>
        <Grid>
          <IconButton
            className={classes.exportButton}
            color="primary"
            onClick={handleExport}
          >
            <Tooltip title="Export as SVG" aria-label="export as svg">
              <ImportIcon />
            </Tooltip>
          </IconButton>
        </Grid>
      </Grid>
      <CardContent className={classes.chartContainer}>
        <ResponsiveBar
          data={chartData}
          keys={["sampleFreq", "controlFreq", "genomicFreq"]}
          {...plotOptions}
        />
      </CardContent>
    </div>
  );
}

FrequencyHistogram.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FrequencyHistogram);
