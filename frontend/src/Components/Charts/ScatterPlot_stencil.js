import React from "react";
import PropTypes from "prop-types";
import ReactDOMServer from "react-dom/server";

import { CardContent, Grid, Tooltip, IconButton} from "@material-ui/core";
import ImportIcon from "@material-ui/icons/GetApp";
import { makeStyles } from '@material-ui/core/styles';
// Nivo chart
import { ResponsiveScatterPlotCanvas, ScatterPlot } from "@nivo/scatterplot";
// Chart expansion
import FullScreenDialog from "./FullScreenScatterPlot";

// Component styles
const useStyles = makeStyles({
  card:props=> ({
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

function ScatterPlot_stencil(props) {
  const  classes  = useStyles(props);

  if (props.chartData === undefined ){
    return "No chart data detected";
  }

  // Load individual colors into array if exists
  let plotColor = [];
  props.chartData.forEach(item => {
    if(item.data[0].color !== undefined) {
      plotColor.push(item.data[0].color);
    }
  });
  if(plotColor.length === 0 && props.chartOptions['colors'] !== undefined) {
    plotColor = props.chartOptions['colors'];
  } else if (plotColor.length === 0) {
    plotColor = "#646464";
  }
  //console.log(plotColor);

  // Scatterplot settings
  const plotOptions = {
      ...(props.chartOptions['theme']?{
        theme: {
          ...(props.chartOptions['theme']['fontSize']?{ fontSize: props.chartOptions['theme']['fontSize']}:{ fontSize: 14 }),
          ...(props.chartOptions['theme']['fontFamily']?{ fontFamily: props.chartOptions['theme']['fontFamily']}:{ fontFamily: "Roboto Slab" }),
          ...(props.chartOptions['theme']['grid']?{
            grid: {
              ...(props.chartOptions['theme']['grid']['line']?{
                line: {
                  ...(props.chartOptions['theme']['grid']['line']['stroke']?{ stroke: props.chartOptions['theme']['grid']['line']['stroke'] }:{ stroke: "#333333" }),
                  ...(props.chartOptions['theme']['grid']['line']['strokeWidth']?{ strokeWidth: props.chartOptions['theme']['grid']['line']['strokeWidth'] }:{ strokeWidth: 1 }),
                }
              }:{ line: { stroke: "#333333", strokeWidth: 1 } })
            }
          }:{grid: { line: { stroke: "#333333", strokeWidth: 1 } } }),
          axis: { egend: {text: { fontSize: 20 }}, domain: { line: { stroke: "#000000", strokeWidth: 1 } }, ticks: { line: { stroke: "#000000", strokeWidth: 1 } } },
        },
       }
      :{
        theme: {
          fontSize: 14,
          fontFamily: "Roboto Slab",
          axis: { legend: {text: { fontSize: 20 }}, domain: { line: { stroke: "#000000", strokeWidth: 1 } }, ticks: { line: { stroke: "#000000", strokeWidth: 1 } } },
          grid: { line: { stroke: "#333333", strokeWidth: 1 } }
        }
      }),
      ...(props.chartOptions['margin']?{
        margin: {
          ...(props.chartOptions['margin']['top']?{ top: props.chartOptions['margin']['top']}:{ top: 10 }),
          ...(props.chartOptions['margin']['right']?{ right: props.chartOptions['margin']['right']}:{ right: 60 }),
          ...(props.chartOptions['margin']['bottom']?{ bottom: props.chartOptions['margin']['bottom']}:{ bottom: 60 }),
          ...(props.chartOptions['margin']['left']?{ left: props.chartOptions['margin']['left']}:{ left: 60 })
        },
      }:{
        margin: { top: 10, right: 60, bottom: 60, left: 60 },
      }),

      //...(props.chartOptions['colors']?{ colors: props.chartOptions['colors'] }:{ colors: [ "#646464" ] }),
      ...(props.chartOptions['nodeSize']?{ nodeSize: props.chartOptions['nodeSize'] }:{ nodeSize: 5 }),

      ...(props.chartOptions['xScale']?{
        xScale: {
          ...(props.chartOptions['xScale']['type']?{ type: props.chartOptions['xScale']['type']}:{ type: 'linear' }),
          ...(props.chartOptions['xScale']['base']?{ base: props.chartOptions['xScale']['base']}:{ base: 10 }),
          ...(props.chartOptions['xScale']['min']?{ min: props.chartOptions['xScale']['min']}:{ min: 'auto' }),
          ...(props.chartOptions['xScale']['max']?{ max: props.chartOptions['xScale']['max']}:{ max: 'auto' })
        },
      }:{
        xScale: { type: 'linear', base: 10, min: 'auto', max: 'auto' },
      }),
      ...(props.chartOptions['yScale']?{
        yScale: {
          ...(props.chartOptions['yScale']['type']?{ type: props.chartOptions['yScale']['type']}:{ type: 'linear' }),
          ...(props.chartOptions['yScale']['min']?{ min: props.chartOptions['yScale']['min']}:{ min: 'auto' }),
          ...(props.chartOptions['yScale']['max']?{ max: props.chartOptions['yScale']['max']}:{ max: 'auto' })
        },
      }:{
        yScale: { type: 'linear', min: 'auto', max: 'auto' },
      }),

      ...(props.chartOptions['axisBottom']?{
          axisBottom: {
              ...(props.chartOptions['axisBottom']['tickSize']?{ tickSize: props.chartOptions['axisBottom']['tickSize']}:{ tickSize: 5 }),
              ...(props.chartOptions['axisBottom']['tickPadding']?{ tickPadding: props.chartOptions['axisBottom']['tickPadding']}:{ tickPadding: 5 }),
              ...(props.chartOptions['axisBottom']['tickRotation']?{ tickRotation: props.chartOptions['axisBottom']['tickRotation'] }:{ tickRotation: 45 }),
              ...(props.chartOptions['axisBottom']['orient']?{ orient: props.chartOptions['axisBottom']['orient'] }:{ orient: 'bottom' }),
              ...(props.chartOptions['axisBottom']['legend']?{ legend: props.chartOptions['axisBottom']['legend'] }:{ legend: "X-axis" }),
              ...(props.chartOptions['axisBottom']['legendPosition']?{ legendPosition: props.chartOptions['axisBottom']['legendPosition'] }:{ legendPosition: "middle"}),
              ...(props.chartOptions['axisBottom']['legendOffset']?{ legendOffset: props.chartOptions['axisBottom']['legendOffset'] }:{ legendOffset: 46}),
              ...(props.chartOptions['axisBottom']['tickValues']?{ tickValues: props.chartOptions['axisBottom']['tickValues'] }:{ })
            },
        }
        :{
          axisBottom: { tickSize: 5, tickPadding: 5, tickRotation: 45, orient: 'bottom', legend: 'X-axis', legendPosition: 'middle', legendOffset: 46, },
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
                ...(props.chartOptions['axisLeft']['tickValues']?{ tickValues: props.chartOptions['axisLeft']['tickValues'] }:{ })
              },
          }
          :{
            axisLeft: { tickSize: 5, tickPadding: 5, tickRotation: 0, orient: 'left', legend: 'Y-axis', legendPosition: 'middle', legendOffset: -60 },
          }),

      ...(props.chartOptions['axisTop']?{
          axisTop: {
              ...(props.chartOptions['axisTop']['tickSize']?{ tickSize: props.chartOptions['axisTop']['tickSize']}:{ tickSize: 0 }),
              ...(props.chartOptions['axisTop']['tickPadding']?{ tickPadding: props.chartOptions['axisTop']['tickPadding']}:{ tickPadding: 0 }),
              ...(props.chartOptions['axisTop']['tickRotation']?{ tickRotation: props.chartOptions['axisTop']['tickRotation'] }:{ tickRotation: 45 }),
              ...(props.chartOptions['axisTop']['orient']?{ orient: props.chartOptions['axisTop']['orient'] }:{ orient: 'top' }),
              ...(props.chartOptions['axisTop']['legend']?{ legend: props.chartOptions['axisTop']['legend'] }:{ legend: "" }),
              ...(props.chartOptions['axisTop']['legendPosition']?{ legendPosition: props.chartOptions['axisTop']['legendPosition'] }:{ legendPosition: "middle"}),
              ...(props.chartOptions['axisTop']['legendOffset']?{ legendOffset: props.chartOptions['axisTop']['legendOffset'] }:{ legendOffset: -20}),
              ...(props.chartOptions['axisTop']['tickValues']?{ tickValues: props.chartOptions['axisTop']['tickValues'] }:{ tickValues: null })            },
        }
        :{ axisTop: null }),

      ...(props.chartOptions['blendMode']?{blendMode: props.chartOptions['blendMode']}:{ blendMode: 'normal' }),

      //Always finish live chart with these
      animate: true,
      motionStiffness: 90,
      motionDamping: 15
  };
  //console.log(plotOptions);

  // Function to export the plot as svg
  let svgString = "";
  const handleExport = () => {
    svgString = ReactDOMServer.renderToStaticMarkup(
      React.createElement(ScatterPlot, {
        animate: false,
        isInteractive: false,
        renderWrapper: false,

        data: props.chartData,

        width: 600,
        height: 500,

        ...plotOptions,
        colors: plotColor

      })
    );

    // creating an svg file and triggering download
    //console.log(svgString);
    //console.log(props.chartData);
    const svgBlob = new Blob([svgString], {type:"image/svg+xml;charset=utf-8"});
    let svgURL = URL.createObjectURL(svgBlob);
    let downloadLink = document.createElement("a");

    downloadLink.href = svgURL;
    downloadLink.download = "scatterplot.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className={classes.card}>
      <Grid container direction="row">
        <Grid item>
          <FullScreenDialog plotData={props.chartData} plotOptions={plotOptions} plotColor={plotColor} />
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
        <ResponsiveScatterPlotCanvas
          data={props.chartData}
          {...plotOptions}
          colors={plotColor}
        />
      </CardContent>
    </div>
  );
}

ScatterPlot_stencil.propTypes = {
  classes: PropTypes.object
};

export default ScatterPlot_stencil;
