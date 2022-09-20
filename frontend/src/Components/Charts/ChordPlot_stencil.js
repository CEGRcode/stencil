import React from "react";
import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";

import { CardContent, Grid, Tooltip, IconButton} from "@material-ui/core";
import ImportIcon from "@material-ui/icons/GetApp";
import { makeStyles } from '@material-ui/core/styles';

// sub component
import { ResponsiveChord, Chord } from "@nivo/chord";
import FullScreenDialog from "./FullScreenChordPlot";

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

function ChordPlot_stencil(props) {
  const  classes  = useStyles(props);

  if (props.chartData === undefined ){
    return "No chart data detected";
  }

  //console.log(props.chartOptions);
  // Chordplot settings
  const plotOptions = {
    ...(props.chartOptions['keys']?{keys: props.chartOptions['keys']}:{ }),

    ...(props.chartOptions['colors']?{colors: { scheme: props.chartOptions['colors'] }}:{colors: { scheme: 'set2' } }),

    ...(props.chartOptions['valueFormat']?{valueFormat: props.chartOptions['valueFormat']}:{ valueFormat: ".2f" }),
    ...(props.chartOptions['padAngle']?{padAngle: props.chartOptions['padAngle']}:{ padAngle: 0.02 }),
    ...(props.chartOptions['innerRadiusRatio']?{innerRadiusRatio: props.chartOptions['innerRadiusRatio']}:{ innerRadiusRatio: 0.96 }),
    ...(props.chartOptions['innerRadiusOffset']?{innerRadiusOffset: props.chartOptions['innerRadiusOffset']}:{ innerRadiusOffset: 0.02 }),
    ...(props.chartOptions['inactiveArcOpacity']?{inactiveArcOpacity: props.chartOptions['inactiveArcOpacity']}:{ inactiveArcOpacity: 0.25 }),
    ...(props.chartOptions['activeRibbonOpacity']?{activeRibbonOpacity: props.chartOptions['activeRibbonOpacity']}:{ activeRibbonOpacity: 0.75 }),
    ...(props.chartOptions['inactiveRibbonOpacity']?{inactiveRibbonOpacity: props.chartOptions['inactiveRibbonOpacity']}:{ inactiveRibbonOpacity: 0.25 }),

    ...(props.chartOptions['margin']?{
      margin: {
        ...(props.chartOptions['margin']['top']?{ top: props.chartOptions['margin']['top']}:{ top: 10 }),
        ...(props.chartOptions['margin']['right']?{ right: props.chartOptions['margin']['right']}:{ right: 60 }),
        ...(props.chartOptions['margin']['bottom']?{ bottom: props.chartOptions['margin']['bottom']}:{ bottom: 60 }),
        ...(props.chartOptions['margin']['left']?{ left: props.chartOptions['margin']['left']}:{ left: 60 })
      },
    }:{
      margin: { top: 20, right: 20, bottom: 80, left: 60 },
    }),

    legends: [ {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 0,
        translateY: 70,
        itemWidth: 80,
        itemHeight: 14,
        itemsSpacing: 0,
        itemTextColor: '#999',
        itemDirection: 'left-to-right',
        symbolSize: 12,
        symbolShape: 'circle',
        effects: [
            {
                on: 'hover',
                style: {
                    itemTextColor: '#000'
                }
            }
        ]
    }],

    theme: {
      fontSize: 14,
      fontFamily: "Roboto Slab",
      markers: {
        textColor: "black",
        fontSize: 12
      }
    },

    //Always finish live chart with these
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
    motionConfig: "wobbly"
  };

  // Function to export the plot as svg
  let svgString = "";
  const handleExport = () => {
    svgString = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Chord, {
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
    downloadLink.download = "Chordplot.svg";
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
        <ResponsiveChord
          data={props.chartData}
          {...plotOptions}
        />
      </CardContent>
    </div>
  );
}

ChordPlot_stencil.propTypes = {
  classes: PropTypes.object
};

export default ChordPlot_stencil;
