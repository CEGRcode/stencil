import React from "react";
import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";

import { CardContent, Grid, Tooltip, IconButton} from "@material-ui/core";
import ImportIcon from "@material-ui/icons/GetApp";
import { makeStyles } from '@material-ui/core/styles';

// sub component
import { ResponsiveRadar, Radar } from "@nivo/radar";
import FullScreenDialog from "./FullScreenRadarPlot";

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

function RadarPlot_stencil(props) {
  const  classes  = useStyles(props);

  if (props.chartData === undefined ){
    return "No chart data detected";
  }

  //console.log(props.chartOptions);
  // Radarplot settings
  const plotOptions = {
    ...(props.chartOptions['keys']?{keys: props.chartOptions['keys']}:{ }),
    ...(props.chartOptions['indexBy']?{indexBy: props.chartOptions['indexBy']}:{ }),

    ...(props.chartOptions['valueFormat']?{valueFormat: props.chartOptions['valueFormat']}:{ valueFormat: ">-.2f" }),
    ...(props.chartOptions['borderColor']?{borderColor: props.chartOptions['borderColor']}:{ }),
    ...(props.chartOptions['gridLabelOffset']?{gridLabelOffset: props.chartOptions['gridLabelOffset']}:{ gridLabelOffset: 10 }),
    ...(props.chartOptions['dotSize']?{dotSize: props.chartOptions['dotSize']}:{ dotSize: 10 }),
    ...(props.chartOptions['dotColor']?{dotColor: props.chartOptions['dotColor']}:{ }),
    ...(props.chartOptions['dotBorderWidth']?{dotBorderWidth: props.chartOptions['dotBorderWidth']}:{ dotBorderWidth: 2 }),
    ...(props.chartOptions['colors']?{colors: { scheme: props.chartOptions['colors'] }}:{colors: { scheme: 'spectral' } }),

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

    legends: [
        {
            anchor: 'top-left',
            direction: 'column',
            translateX: -20,
            translateY: -10,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999',
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
        }
    ],

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
      React.createElement(Radar, {
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
    downloadLink.download = "Radarplot.svg";
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
        <ResponsiveRadar
          data={props.chartData}
          {...plotOptions}
        />
      </CardContent>
    </div>
  );
}

RadarPlot_stencil.propTypes = {
  classes: PropTypes.object
};

export default RadarPlot_stencil;
