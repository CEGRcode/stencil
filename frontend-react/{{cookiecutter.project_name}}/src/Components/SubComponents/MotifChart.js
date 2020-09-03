import React from "react";
import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ResponsiveLine, Line } from "@nivo/line";

import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import ImportIcon from "@material-ui/icons/GetApp";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// subcomponents
import FullScreenDialog from "./FullScreenDialog";

const styles = {
  card: {
    minWidth: 275
  },
  chartContainer: {
    height: 400,
    width: 430
  },
  exportButton: {
    marginLeft: "88%"
  }
};

function MotifChart(props) {
  const { classes } = props;

  // creating data
  let xValues = props.chartData.Xaxis.split(",");
  let syValues = props.chartData["sampleSenseYaxis"].split(",");
  let cyValues = props.chartData["controlSenseYaxis"].split(",");
  let sayValues = props.chartData["sampleAntiYaxis"].split(",");
  let cayValues = props.chartData["controlAntiYaxis"].split(",");

  let saData2 = [];
  let caData2 = [];
  let sData2 = [];
  let cData2 = [];

  for (let i = 0; i < xValues.length; i++) {
    // console.log(i);
    if (i % 2 === 0) {
      sData2.push({
        x: parseInt(xValues[i]),
        y: parseFloat(syValues[i])
      });

      cData2.push({
        x: parseInt(xValues[i]),
        y: parseFloat(cyValues[i])
      });

      saData2.push({
        x: parseInt(xValues[i]),
        y: parseFloat(sayValues[i])
      });

      caData2.push({
        x: parseInt(xValues[i]),
        y: parseFloat(cayValues[i])
      });
    }
  }

  // maxValues for yaxis
  let maxValue = Math.max(
    Math.ceil(Math.max(...sayValues)),
    Math.ceil(Math.max(...syValues)),
    Math.ceil(Math.max(...cyValues)),
    Math.ceil(Math.max(...cayValues))
  );

  let ymax = maxValue > 10 ? maxValue : 10;

  const plotData = [
    {
      id: "controlSense",
      data: cData2
    },
    {
      id: "sampleSense",
      data: sData2
    },
    {
      id: "controlAnti",
      data: caData2
    },
    {
      id: "sampleAnti",
      data: saData2
    }
  ];

  const plotOptions = {
    margin: { top: 5, right: 20, bottom: 80, left: 60 },
    xScale: { type: "linear", stacked: false, min: -250, max: 250 },
    yScale: { type: "linear", stacked: false, min: 0, max: ymax },
    axisTop: null,
    axisRight: null,
    axisBottom: {
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Distance from TSS (bp)",
      legendOffset: 46,
      legendPosition: "middle"
    },
    axisLeft: {
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Tags",
      legendOffset: -50,
      legendPosition: "middle"
    },
    theme: {
      fontSize: 14,
      fontFamily: "Roboto Slab",
      markers: {
        textColor: "black",
        fontSize: 12
      }
    },
    colors: ["#a0a0a0", "#0061ff", "#000000", "#e53935"],
    enablePoints: false,
    markers: [
      {
        axis: "x",
        value: 0,
        lineStyle: {
          stroke: "#000",
          strokeWidth: 2,
          strokeDasharray: (10, 8)
        }
      }
    ],
    legends: [
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 80,
        itemsSpacing: 3,
        itemDirection: "left-to-right",
        itemWidth: 130,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 10,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)"
      }
    ]
  };

  // Function to export the plot as svg
  let svgString = "";
  const handleExport = () => {
    svgString = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Line, {
        animate: false,
        isInteractive: false,
        renderWrapper: false,

        data: plotData,

        width: 1200,
        height: 500,

        ...plotOptions
      })
    );

    // creating an svg file and triggering download
    const element = document.createElement("a");
    const file = new Blob([svgString]);
    element.href = URL.createObjectURL(file);
    element.download = "Composite.svg";
    // Required for this to work in FireFox
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className={classes.card}>
      <Grid container direction="row">
        <Grid item>
          <FullScreenDialog
            sampleSenseData={sData2}
            controlSenseData={cData2}
            sampleAntiData={saData2}
            controlAntiData={caData2}
            ymin={0}
            ymax={ymax}
            axisTickValues={10}
          />
        </Grid>
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
        <ResponsiveLine
          data={plotData}
          {...plotOptions}
          enablePoints={false}
          enableSlices={"x"}
          legends={[]}
        />
      </CardContent>
    </div>
  );
}

MotifChart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MotifChart);
