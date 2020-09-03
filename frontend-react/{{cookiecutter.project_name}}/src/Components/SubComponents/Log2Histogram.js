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

// component styles.
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
  },
  exportButton: {
    marginLeft: "88%"
  }
};

function Log2Histogram(props) {
  const { classes } = props;

  let chartData = [];
  let chartKeys = [];
  var fillItems = [];
  let chartValues = [];

  let yaxis = props.data["log2Yaxis"].split(",");
  // console.log(yaxis);
  let xaxis = props.data["featureXaxis"].split(",");
  // console.log(xaxis);

  for (var i = xaxis.length - 1; i >= 0; i--) {
    // console.log(xaxis[i]);
    let value = yaxis[i];
    let key = xaxis[i];
    chartValues.push(isNaN(parseFloat(value)) ? 0 : parseFloat(value));

    // creating the color fill categories based on the value
    if (value >= 1) {
      fillItems.push({ match: { id: key }, id: "greenColor" });
    } else if (value < 1 && value > -1) {
      fillItems.push({ match: { id: key }, id: "grayColor" });
    } else if (value <= -1) {
      fillItems.push({ match: { id: key }, id: "redColor" });
    }

    chartData.push({
      item: key,
      [key]: parseFloat(value)
    });
    chartKeys.push(key);
  }

  const plotOptions = {
    // plot settings
    margin: {
      top: 0,
      right: 10,
      bottom: 90,
      left: 140
    },
    theme: {
      fontSize: 14,
      fontFamily: "Roboto Slab"
    },
    axisBottom: {
      tickSize: 5,
      tickPadding: 25,
      tickRotation: 0,
      legend: "Log2 (Sample/Control) Histogram Frequency",
      legendPosition: "middle",
      legendOffset: 75
    },

    axisLeft: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "",
      legendPosition: "middle",
      legendOffset: -48
    },
    groupMode: "stacked",
    indexBy: "item",
    defs: [
      // using plain object
      {
        id: "greenColor",
        type: "linearGradient",
        colors: [
          { offset: 0, color: "#43a047" },
          { offset: 100, color: "#43a047" }
        ]
      },
      {
        id: "redColor",
        type: "linearGradient",
        colors: [
          { offset: 0, color: "#d32f2f" },
          { offset: 100, color: "#d32f2f" }
        ]
      },
      {
        id: "grayColor",
        type: "linearGradient",
        colors: [
          { offset: 0, color: "#90a4ae" },
          { offset: 100, color: "#90a4ae" }
        ]
      }
    ],
    fill: fillItems,
    minValue: parseFloat(Math.floor(Math.min(...chartValues))),
    maxValue: parseFloat(Math.ceil(Math.max(...chartValues))),
    padding: 0.3,
    innerPadding: 3,
    enableLabel: false,
    layout: "horizontal",
    borderColor: "inherit:darker(1.6)",
    enableGridX: true,
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    labelTextColor: "inherit:darker(1.6)",
    animate: true,
    motionStiffness: 90,
    motionDamping: 15
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
        keys: chartKeys,

        width: 1200,
        height: 500,

        ...plotOptions
      })
    );

    // creating an svg file and triggering download
    const element = document.createElement("a");
    const file = new Blob([svgString]);
    element.href = URL.createObjectURL(file);
    element.download = "log2Histogram.svg";
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
          keys={chartKeys}
          {...plotOptions}
          tooltip={data => {
            return (
              <span>
                <strong>
                  {data.id} : {data.value}
                </strong>
              </span>
            );
          }}
        />
      </CardContent>
    </div>
  );
}

Log2Histogram.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Log2Histogram);
