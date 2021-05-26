import React from "react";
import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";

import { CardContent, Grid, Tooltip, IconButton} from "@material-ui/core";
import ImportIcon from "@material-ui/icons/GetApp";
import { makeStyles } from '@material-ui/core/styles';

// sub component
import { ResponsiveLine, Line } from "@nivo/line";
import FullScreenDialog from "./FullScreenLinePlot";

// Component styles
const useStyles = makeStyles({
  card :props=> ({
    minWidth: 275
  }),
  exportButton:props=> ({
    marginLeft: "88%"
  }),
  chartContainer: props=>({
    height: props.height,
    width: props.width
  })

});

function LinePlot_stencil(props) {
  const  classes  = useStyles(props);

  if (props.chartData === undefined ){
    return "No chart data detected";
  }

  //console.log(props.chartOptions);
  // Lineplot settings
  const plotOptions = {
    ...(props.chartOptions['colors']?{colors: props.chartOptions['colors']}:{colors: { scheme: 'spectral' } }),
    ...(props.chartOptions['enableArea']?{enableArea: props.chartOptions['enableArea']}:{ }),
    ...(props.chartOptions['areaOpacity']?{areaOpacity: props.chartOptions['areaOpacity']}:{ }),
    ...(props.chartOptions['fill']?{fill: props.chartOptions['fill']}:{ }),
    ...(props.chartOptions['fillOpacity']?{fillOpacity: props.chartOptions['fillOpacity']}:{ }),

    ...(props.chartOptions['xScale']?{
      xScale: {
        ...(props.chartOptions['xScale']['type']?{ type: props.chartOptions['xScale']['type']}:{ type: 'linear' }),
        ...(props.chartOptions['xScale']['stacked']?{ stacked: props.chartOptions['xScale']['stacked']}:{ stacked: false }),
        ...(props.chartOptions['xScale']['min']?{ min: props.chartOptions['xScale']['min']}:{ min: 'auto' }),
        ...(props.chartOptions['xScale']['max']?{ max: props.chartOptions['xScale']['max']}:{ max: 'auto' })
      },
    }:{
      xScale: { type: "linear", stacked: false, min: 'auto', max: 'auto' },
    }),

    ...(props.chartOptions['yScale']?{
      yScale: {
        ...(props.chartOptions['yScale']['type']?{ type: props.chartOptions['yScale']['type']}:{ type: 'linear' }),
        ...(props.chartOptions['yScale']['stacked']?{ stacked: props.chartOptions['yScale']['stacked']}:{ stacked: false }),
        ...(props.chartOptions['yScale']['min']?{ min: props.chartOptions['yScale']['min']}:{ min: 'auto' }),
        ...(props.chartOptions['yScale']['max']?{ max: props.chartOptions['yScale']['max']}:{ max: 'auto' })
      },
    }:{
      yScale: { type: "linear", stacked: false, min: 'auto', max: 'auto' },
    }),

    ...(props.chartOptions['enableSlices']?{enableSlices: props.chartOptions['enableSlices']}:{enableSlices: false }),
    ...(props.chartOptions['useMesh']?{useMesh: props.chartOptions['useMesh']}:{useMesh: true }),
    ...(props.chartOptions['enablePoints']?{enablePoints: props.chartOptions['enablePoints']}:{enablePoints: false }),

    ...(props.chartOptions['axisBottom']?{
        axisBottom: {
            ...(props.chartOptions['axisBottom']['tickSize']?{ tickSize: props.chartOptions['axisBottom']['tickSize']}:{ tickSize: 5 }),
            ...(props.chartOptions['axisBottom']['tickPadding']?{ tickPadding: props.chartOptions['axisBottom']['tickPadding']}:{ tickPadding: 5 }),
            ...(props.chartOptions['axisBottom']['tickRotation']?{ tickRotation: props.chartOptions['axisBottom']['tickRotation'] }:{ tickRotation: 0 }),
            ...(props.chartOptions['axisBottom']['tickValues']?{ tickValues: props.chartOptions['axisBottom']['tickValues'] }:{ }),
            ...(props.chartOptions['axisBottom']['orient']?{ orient: props.chartOptions['axisBottom']['orient'] }:{ orient: 'bottom' }),
            ...(props.chartOptions['axisBottom']['legend']?{ legend: props.chartOptions['axisBottom']['legend'] }:{ legend: "X-axis" }),
            ...(props.chartOptions['axisBottom']['legendPosition']?{ legendPosition: props.chartOptions['axisBottom']['legendPosition'] }:{ legendPosition: "middle"}),
            ...(props.chartOptions['axisBottom']['legendOffset']?{ legendOffset: props.chartOptions['axisBottom']['legendOffset'] }:{ legendOffset: 46})
          },
      }
      :{
        axisBottom: { tickSize: 5, tickPadding: 5, tickRotation: 0, orient: "bottom", legend: "X-axis", legendOffset: 46, legendPosition: "middle" },
      }),

    ...(props.chartOptions['axisLeft']?{
          axisLeft: {
              ...(props.chartOptions['axisLeft']['tickSize']?{ tickSize: props.chartOptions['axisLeft']['tickSize']}:{ tickSize: 5 }),
              ...(props.chartOptions['axisLeft']['tickPadding']?{ tickPadding: props.chartOptions['axisLeft']['tickPadding']}:{ tickPadding: 5 }),
              ...(props.chartOptions['axisLeft']['tickRotation']?{ tickRotation: props.chartOptions['axisLeft']['tickRotation'] }:{ tickRotation: 0 }),
              ...(props.chartOptions['axisLeft']['orient']?{ orient: props.chartOptions['axisLeft']['orient'] }:{ orient: 'left' }),
              ...(props.chartOptions['axisLeft']['legend']?{ legend: props.chartOptions['axisLeft']['legend'] }:{ legend: "Y-axis" }),
              ...(props.chartOptions['axisLeft']['legendPosition']?{ legendPosition: props.chartOptions['axisLeft']['legendPosition'] }:{ legendPosition: "middle"}),
              ...(props.chartOptions['axisLeft']['legendOffset']?{ legendOffset: props.chartOptions['axisLeft']['legendOffset'] }:{ legendOffset: -60}),
            },
        }
        :{
          axisLeft: { tickSize: 5, tickPadding: 5, tickRotation: 0, orient: "left", legend: "Y-axis", legendOffset: -50, legendPosition: "middle"},
        }),

    ...(props.chartOptions['legends']?{
          legends: [ {
              ...(props.chartOptions['legends']['anchor']?{ anchor: props.chartOptions['legends']['anchor']}:{ anchor: "bottom" }),
              ...(props.chartOptions['legends']['direction']?{ direction: props.chartOptions['legends']['direction']}:{ direction: "row" }),
              ...(props.chartOptions['legends']['translateY']?{ translateY: props.chartOptions['legends']['translateY']}:{ translateY: 75 }),
              ...(props.chartOptions['legends']['itemsSpacing']?{ itemsSpacing: props.chartOptions['legends']['itemsSpacing']}:{ itemsSpacing: 0 }),
              ...(props.chartOptions['legends']['itemDirection']?{ itemDirection: props.chartOptions['legends']['itemDirection']}:{ itemDirection: "left-to-right" }),
              ...(props.chartOptions['legends']['itemHeight']?{ itemHeight: props.chartOptions['legends']['itemHeight']}:{ itemHeight: 15 }),
              ...(props.chartOptions['legends']['itemWidth']?{ itemWidth: props.chartOptions['legends']['itemWidth']}:{ itemHeight: 60 }),
              ...(props.chartOptions['legends']['symbolSize']?{ symbolSize: props.chartOptions['legends']['symbolSize']}:{ symbolSize: 8 }),
              ...(props.chartOptions['legends']['symbolShape']?{ symbolShape: props.chartOptions['legends']['symbolShape']}:{ symbolShape: 'circle' })
          } ],
        }
        :{
          //Default No legend present
        }),

    margin: { top: 5, right: 20, bottom: 90, left: 60 },
    theme: {
      fontSize: 14,
      fontFamily: "Roboto Slab",
      markers: {
        textColor: "black",
        fontSize: 12
      }
    },
    markers: [
      {
        axis: "x",
        value: 0,
        lineStyle: {
          stroke: "#000",
          strokeWidth: 2,
          strokeDasharray: (10, 8)
        },
        legend: ""
      }
    ],

    //Always finish live chart with these
    animate: true,
    motionStiffness: 90,
    motionDamping: 15
  };

  // Function to export the plot as svg
  let svgString = "";
  const handleExport = () => {
    svgString = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Line, {
        animate: false,
        isInteractive: false,
        renderWrapper: false,

        data: props.chartData,

        width: 600,
        height: 500,

        ...plotOptions
      })
    );

    // creating an svg file and triggering download
    //console.log(svgString);
    //console.log(props.chartData);
    const svgBlob = new Blob([svgString], {type:"image/svg+xml;charset=utf-8"});
    let svgURL = URL.createObjectURL(svgBlob);
    let downloadLink = document.createElement("a");

    downloadLink.href = svgURL;
    downloadLink.download = "lineplot.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className={classes.card}>
      <Grid container direction="row">
        <Grid item>
          <FullScreenDialog plotData={props.chartData} plotOptions={plotOptions}
          />
        </Grid>
        <Grid>
          <IconButton className={classes.exportButton} color="primary" onClick={handleExport}>
            <Tooltip title="Export as SVG" aria-label="export as svg">
              <ImportIcon />
            </Tooltip>
          </IconButton>
        </Grid>
      </Grid>


      <CardContent className={classes.chartContainer}>
        <ResponsiveLine
          data={props.chartData}
          {...plotOptions}
        />
      </CardContent>
    </div>
  );
}

LinePlot_stencil.propTypes = {
  classes: PropTypes.object
};

export default LinePlot_stencil;
