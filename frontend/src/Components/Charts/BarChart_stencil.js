import React from "react";
import PropTypes from "prop-types";
import ReactDOMServer from "react-dom/server";

import { CardContent, Grid, Tooltip, IconButton} from "@material-ui/core";
import ImportIcon from "@material-ui/icons/GetApp";
import { makeStyles } from '@material-ui/core/styles';
// Nivo chart
import { ResponsiveBar, Bar } from "@nivo/bar";
// Chart expansion
import FullScreenDialog from "./FullScreenBarChart";

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

function BarChart_stencil(props) {
  const  classes  = useStyles(props);

  if (props.chartData === undefined ){
    return "No chart data detected";
  }

  // BarChart settings
  // Load individual colors into array if exists
  let fillItems = [];
  let defColor = [];
  let plotColor = [];
  function colorExists(newid) {
    return defColor.some(function(el) {
      return el.id === newid;
    });
  }
  props.chartData.forEach(item => {
    if(item.color !== undefined) {
      fillItems.push({ match: { id: item.index }, id: item.color });
      if(!colorExists(item.color)){
        defColor.push({ id: item.color, type: "linearGradient", colors: [ { offset: 0, color: item.color }, {offset: 100, color: item.color } ] });
      }
    }
  });
  if(fillItems.length === 0 && props.chartOptions['colors'] !== undefined) {
    plotColor = props.chartOptions['colors'];
    fillItems = [];
    defColor = [];
  } else if (fillItems.length === 0) {
    plotColor = "#646464";
  }

  //console.log(props.chartOptions);
  const plotOptions = {
    ...(props.chartOptions['keys']?{keys: props.chartOptions['keys']}:{ }),
    ...(props.chartOptions['indexBy']?{indexBy: props.chartOptions['indexBy']}:{indexBy: props.chartOptions['keys'][0]}),
    ...(props.chartOptions['layout']?{layout: props.chartOptions['layout']}:{layout: "vertical"}),
    ...(props.chartOptions['groupMode']?{groupMode: props.chartOptions['groupMode']}:{groupMode: "stacked"}),
    ...(props.chartOptions['borderColor']?{borderColor: props.chartOptions['borderColor']}:{borderColor: [ '#000000' ]}),
    ...(props.chartOptions['borderWidth']?{borderWidth: props.chartOptions['borderWidth']}:{borderWidth: 1}),
    ...(props.chartOptions['padding']?{padding: props.chartOptions['padding']}:{padding: 0}),
    ...(props.chartOptions['innerPadding']?{innerPadding: props.chartOptions['innerPadding']}:{innerPadding: 1}),
    ...(props.chartOptions['enableLabel']?{enableLabel: props.chartOptions['enableLabel']}:{enableLabel: false}),

    ...(props.chartOptions['axisBottom']?{
            axisBottom: {
            ...(props.chartOptions['axisBottom']['tickSize']?{ tickSize: props.chartOptions['axisBottom']['tickSize']}:{ tickSize: 5 }),
            ...(props.chartOptions['axisBottom']['tickPadding']?{ tickPadding: props.chartOptions['axisBottom']['tickPadding']}:{ tickPadding: 5 }),
            ...(props.chartOptions['axisBottom']['tickRotation']?{ tickRotation: props.chartOptions['axisBottom']['tickRotation'] }:{ tickRotation: 45 }),
            ...(props.chartOptions['axisBottom']['legend']?{ legend: props.chartOptions['axisBottom']['legend'] }:{ legend: props.chartOptions['keys'][0]}),
            ...(props.chartOptions['axisBottom']['legendPosition']?{ legendPosition: props.chartOptions['axisBottom']['legendPosition'] }:{ legendPosition: "middle"} ),
            ...(props.chartOptions['axisBottom']['legendOffset']?{ legendOffset: props.chartOptions['axisBottom']['legendOffset'] }:{ legendOffset: 60} )
          },
      }
      :{
        axisBottom: { tickSize: 5, tickPadding: 5, tickRotation: 45, legend: props.chartOptions['keys'][0], legendPosition: "middle", legendOffset: 60 },
      }),

      ...(props.chartOptions['axisLeft']?{
            axisLeft: {
            ...(props.chartOptions['axisLeft']['tickSize']?{ tickSize: props.chartOptions['axisLeft']['tickSize']}:{ tickSize: 5 }),
            ...(props.chartOptions['axisLeft']['tickPadding']?{ tickPadding: props.chartOptions['axisLeft']['tickPadding']}:{ tickPadding: 5 }),
            ...(props.chartOptions['axisLeft']['tickRotation']?{ tickRotation: props.chartOptions['axisLeft']['tickRotation'] }:{ tickRotation: 0 }),
            ...(props.chartOptions['axisLeft']['legend']?{ legend: props.chartOptions['axisLeft']['legend'] }:{ legend: props.chartOptions['keys'][1]}),
            ...(props.chartOptions['axisLeft']['legendPosition']?{ legendPosition: props.chartOptions['axisLeft']['legendPosition'] }:{ legendPosition: "middle"} ),
            ...(props.chartOptions['axisLeft']['legendOffset']?{ legendOffset: props.chartOptions['axisLeft']['legendOffset'] }:{ legendOffset: -50} )
          },
      }
      :{
        axisLeft: { tickSize: 5, tickPadding: 5, tickRotation: 0, legend: props.chartOptions['keys'][1], legendPosition: "middle", legendOffset: -50 },
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

      ...(props.chartOptions['margin']?{
        margin: {
          ...(props.chartOptions['margin']['top']?{ top: props.chartOptions['margin']['top']}:{ top: 10 }),
          ...(props.chartOptions['margin']['right']?{ right: props.chartOptions['margin']['right']}:{ right: 60 }),
          ...(props.chartOptions['margin']['bottom']?{ bottom: props.chartOptions['margin']['bottom']}:{ bottom: 60 }),
          ...(props.chartOptions['margin']['left']?{ left: props.chartOptions['margin']['left']}:{ left: 60 })
        },
      }:{
        margin: { top: 5, right: 20, bottom: 80, left: 80 },
      }),

    theme: {
      fontSize: 12,
      fontFamily: "Roboto Slab",
      axis: { legend: {text: { fontSize: 18 } } }
    },
    enableGridX: false,
    enableGridY: true,
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    labelTextColor: "#000000",

    //Always finish live chart with these
    animate: true,
    motionStiffness: 90,
    motionDamping: 15
  };

  // Function to export the plot as svg
  const handleExport = () => {
    let svgString = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Bar, {
        animate: false,
        isInteractive: false,
        renderWrapper: false,

        data: props.chartData,

        width: 600,
        height: 500,

        ...plotOptions,
        defs: defColor,
        fill: fillItems,
        colors: plotColor

      })
    );
    //console.log(svgString);


    // Replace invalid HTML headers - nivo BarChart specific issue
    let temp = svgString.replace("</div>","");
    svgString = temp.replace("<div style=\"position:relative\">","");

    // creating an svg file and triggering download
    const svgBlob = new Blob([svgString], {type:"image/svg+xml;charset=utf-8"});
    let svgURL = URL.createObjectURL(svgBlob);
    let downloadLink = document.createElement("a");

    downloadLink.href = svgURL;
    downloadLink.download = "barchart.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className={classes.card}>
      <Grid container direction="row">
        <Grid item>
          <FullScreenDialog plotData={props.chartData} plotOptions={plotOptions} defs={defColor} fill={fillItems} colors={plotColor}
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
        <ResponsiveBar
          data={props.chartData}
          {...plotOptions}
          defs={defColor}
          fill={fillItems}
          colors={plotColor}
        />
      </CardContent>
    </div>
  );
}

BarChart_stencil.propTypes = {
  classes: PropTypes.object
};

export default BarChart_stencil;
