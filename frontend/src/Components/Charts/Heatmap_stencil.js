import React from "react";
import PropTypes from "prop-types";
import ReactDOMServer from "react-dom/server";

import { CardContent, Grid, Tooltip, IconButton} from "@material-ui/core";
import ImportIcon from "@material-ui/icons/GetApp";
import { makeStyles } from '@material-ui/core/styles';
// Nivo chart
import { ResponsiveHeatMap, HeatMap } from "@nivo/heatmap";
// Chart expansion
import FullScreenDialog from "./FullScreenHeatMap";

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

function Heatmap_stencil(props) {
  const  classes  = useStyles(props);

  if (props.chartData === undefined ){
    return "No chart data detected";
  }

  // Heatmap settings
  const plotOptions = {
    ...(props.chartOptions['keys']?{keys: props.chartOptions['keys']}:{ }),
    ...(props.chartOptions['indexBy']?{indexBy: props.chartOptions['indexBy']}:{indexBy: props.chartOptions['keys'][0]}),
    ...(props.chartOptions['colors']?{colors: props.chartOptions['colors']}:{colors: { scheme: 'spectral' } }),
    ...(props.chartOptions['forceSquare']?{forceSquare: props.chartOptions['forceSquare']}:{forceSquare: true}),
    ...(props.chartOptions['hoverTarget']?{hoverTarget: props.chartOptions['hoverTarget']}:{hoverTarget: "rowColumn"}),
    ...(props.chartOptions['cellHoverOthersOpacity']?{cellHoverOthersOpacity: props.chartOptions['cellHoverOthersOpacity']}:{cellHoverOthersOpacity: 0.25}),
    ...(props.chartOptions['cellOpacity']?{cellOpacity: props.chartOptions['cellOpacity']}:{cellOpacity: 1}),
    ...(props.chartOptions['enableLabels']?{enableLabels: props.chartOptions['enableLabels']}:{enableLabels: false}),

    ...(props.chartOptions['axisTop']?{
            axisTop: {
            ...(props.chartOptions['axisTop']['orient']?{ orient: props.chartOptions['axisTop']['orient']}:{ orient: "top" }),
            ...(props.chartOptions['axisTop']['tickSize']?{ tickSize: props.chartOptions['axisTop']['tickSize']}:{ tickSize: 5 }),
            ...(props.chartOptions['axisTop']['tickPadding']?{ tickPadding: props.chartOptions['axisTop']['tickPadding']}:{ tickPadding: 5 }),
            ...(props.chartOptions['axisTop']['tickRotation']?{ tickRotation: props.chartOptions['axisTop']['tickRotation'] }:{ tickRotation: -90 }),
            ...(props.chartOptions['axisTop']['legend']?{ legend: props.chartOptions['axisTop']['legend'] }:{ legend: "" }),
            ...(props.chartOptions['axisTop']['legendPosition']?{ legendPosition: props.chartOptions['axisTop']['legendPosition'] }:{ legendPosition: "middle"} ),
            ...(props.chartOptions['axisTop']['legendOffset']?{ legendOffset: props.chartOptions['axisTop']['legendOffset'] }:{ legendOffset: 36} )
          },
      }
      :{ axisTop: null }),

      ...(props.chartOptions['axisLeft']?{
            axisLeft: {
            ...(props.chartOptions['axisLeft']['orient']?{ orient: props.chartOptions['axisLeft']['orient']}:{ orient: "left" }),
            ...(props.chartOptions['axisLeft']['tickSize']?{ tickSize: props.chartOptions['axisLeft']['tickSize']}:{ tickSize: 5 }),
            ...(props.chartOptions['axisLeft']['tickPadding']?{ tickPadding: props.chartOptions['axisLeft']['tickPadding']}:{ tickPadding: 5 }),
            ...(props.chartOptions['axisLeft']['tickRotation']?{ tickRotation: props.chartOptions['axisLeft']['tickRotation'] }:{ tickRotation: -90 }),
            ...(props.chartOptions['axisLeft']['legend']?{ legend: props.chartOptions['axisLeft']['legend'] }:{ legend: "" }),
            ...(props.chartOptions['axisLeft']['legendPosition']?{ legendPosition: props.chartOptions['axisLeft']['legendPosition'] }:{ legendPosition: "middle"} ),
            ...(props.chartOptions['axisLeft']['legendOffset']?{ legendOffset: props.chartOptions['axisLeft']['legendOffset'] }:{ legendOffset: -40} )
          },
      }
      :{ axisLeft: null }),

      ...(props.chartOptions['axisBottom']?{
          axisBottom: {
              ...(props.chartOptions['axisBottom']['tickSize']?{ tickSize: props.chartOptions['axisBottom']['tickSize']}:{ tickSize: 5 }),
              ...(props.chartOptions['axisBottom']['tickPadding']?{ tickPadding: props.chartOptions['axisBottom']['tickPadding']}:{ tickPadding: 5 }),
              ...(props.chartOptions['axisBottom']['tickRotation']?{ tickRotation: props.chartOptions['axisBottom']['tickRotation'] }:{ tickRotation: 0 }),
              ...(props.chartOptions['axisBottom']['orient']?{ orient: props.chartOptions['axisBottom']['orient'] }:{ orient: 'bottom' }),
              ...(props.chartOptions['axisBottom']['legend']?{ legend: props.chartOptions['axisBottom']['legend'] }:{ legend: "" }),
              ...(props.chartOptions['axisBottom']['legendPosition']?{ legendPosition: props.chartOptions['axisBottom']['legendPosition'] }:{ legendPosition: "middle"}),
              ...(props.chartOptions['axisBottom']['legendOffset']?{ legendOffset: props.chartOptions['axisBottom']['legendOffset'] }:{ legendOffset: -40 })
            },
        }
        :{ axisBottom: null }),

        ...(props.chartOptions['axisRight']?{
            axisRight: {
              ...(props.chartOptions['axisRight']['tickSize']?{ tickSize: props.chartOptions['axisRight']['tickSize']}:{ tickSize: 5 }),
              ...(props.chartOptions['axisRight']['tickPadding']?{ tickPadding: props.chartOptions['axisRight']['tickPadding']}:{ tickPadding: 5 }),
              ...(props.chartOptions['axisRight']['tickRotation']?{ tickRotation: props.chartOptions['axisRight']['tickRotation'] }:{ tickRotation: 0 }),
              ...(props.chartOptions['axisRight']['orient']?{ orient: props.chartOptions['axisRight']['orient'] }:{ orient: "right" }),
              ...(props.chartOptions['axisRight']['legend']?{ legend: props.chartOptions['axisRight']['legend'] }:{ legend: "" }),
              ...(props.chartOptions['axisRight']['legendPosition']?{ legendPosition: props.chartOptions['axisRight']['legendPosition'] }:{ legendPosition: "middle"}),
              ...(props.chartOptions['axisRight']['legendOffset']?{ legendOffset: props.chartOptions['axisRight']['legendOffset'] }:{ legendOffset: 40 })
            },
        }
        :{ axisRight: null }),

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

        ...(props.chartOptions['margin']?{
          margin: {
            ...(props.chartOptions['margin']['top']?{ top: props.chartOptions['margin']['top']}:{ top: 10 }),
            ...(props.chartOptions['margin']['right']?{ right: props.chartOptions['margin']['right']}:{ right: 60 }),
            ...(props.chartOptions['margin']['bottom']?{ bottom: props.chartOptions['margin']['bottom']}:{ bottom: 60 }),
            ...(props.chartOptions['margin']['left']?{ left: props.chartOptions['margin']['left']}:{ left: 60 })
          },
        }:{
          margin: { top: 40, right: 40, bottom: 40, left: 40 },
        }),

      cellBorderColor: { from: 'color', modifiers: [ [ 'darker', 0.4 ] ] },
      labelTextColor: { from: 'color', modifiers: [ [ 'darker', 1.8 ] ] },
      defs: [
          {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(0, 0, 0, 0.1)',
              rotation: -45,
              lineWidth: 4,
              spacing: 7
          }
      ],
      fill: [ { id: 'lines' } ],
      theme: {
        fontSize: 14,
        fontFamily: "Roboto Slab",
        axis: { legend: {text: { fontSize: 20 }}, domain: { line: { stroke: "#000000", strokeWidth: 1 } }, ticks: { line: { stroke: "#000000", strokeWidth: 1 } } },
        grid: { line: { stroke: "#333333", strokeWidth: 1 } }
      },

      //Always finish live chart with these
      animate: true,
      motionConfig: "wobbly",
      motionStiffness: 90,
      motionDamping: 15
  };

  // Function to export the plot as svg
  let svgString = "";
  const handleExport = () => {
    svgString = ReactDOMServer.renderToStaticMarkup(
      React.createElement(HeatMap, {
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
    downloadLink.download = "heatmap.svg";
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
        <ResponsiveHeatMap
          data={props.chartData}
          {...plotOptions}
        />
      </CardContent>
    </div>
  );
}

Heatmap_stencil.propTypes = {
  classes: PropTypes.object
};

export default Heatmap_stencil;
