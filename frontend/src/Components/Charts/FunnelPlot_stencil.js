import React from "react";
import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";

import { CardContent, Grid, Tooltip, IconButton} from "@material-ui/core";
import ImportIcon from "@material-ui/icons/GetApp";
import { makeStyles } from '@material-ui/core/styles';

// sub component
import { ResponsiveFunnel, Funnel } from "@nivo/funnel";
import FullScreenDialog from "./FullScreenFunnelPlot";

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

function FunnelPlot_stencil(props) {
  const  classes  = useStyles(props);

  if (props.chartData === undefined ){
    return "No chart data detected";
  }

  //console.log(props.chartOptions);
  // Funnelplot settings
  const plotOptions = {

    ...(props.chartOptions['valueFormat']?{valueFormat: props.chartOptions['valueFormat']}:{ valueFormat: ">-.4s" }),
    ...(props.chartOptions['borderWidth']?{borderWidth: props.chartOptions['borderWidth']}:{ borderWidth: 20 }),
    ...(props.chartOptions['beforeSeparatorLength']?{beforeSeparatorLength: props.chartOptions['beforeSeparatorLength']}:{ beforeSeparatorLength: 100 }),
    ...(props.chartOptions['beforeSeparatorOffset']?{beforeSeparatorOffset: props.chartOptions['beforeSeparatorOffset']}:{ beforeSeparatorOffset: 20 }),
    ...(props.chartOptions['afterSeparatorLength']?{afterSeparatorLength: props.chartOptions['afterSeparatorLength']}:{ afterSeparatorLength: 100 }),
    ...(props.chartOptions['afterSeparatorOffset']?{afterSeparatorOffset: props.chartOptions['afterSeparatorOffset']}:{ afterSeparatorOffset: 20 }),
    ...(props.chartOptions['currentPartSizeExtension']?{currentPartSizeExtension: props.chartOptions['currentPartSizeExtension']}:{ currentPartSizeExtension: 10 }),
    ...(props.chartOptions['currentBorderWidth']?{currentBorderWidth: props.chartOptions['currentBorderWidth']}:{ currentBorderWidth: 40 }),

    ...(props.chartOptions['colors']?{colors: { scheme: props.chartOptions['colors'] }}:{colors: { scheme: 'spectral' } }),
    ...(props.chartOptions['labelColor']?{labelColor: props.chartOptions['labelColor']}:{labelColor: "black" }),

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
      React.createElement(Funnel, {
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
    downloadLink.download = "Funnelplot.svg";
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
        <ResponsiveFunnel
          data={props.chartData}
          {...plotOptions}
        />
      </CardContent>
    </div>
  );
}

FunnelPlot_stencil.propTypes = {
  classes: PropTypes.object
};

export default FunnelPlot_stencil;
