import React from "react";
import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";

import { CardContent, Grid, Tooltip, IconButton} from "@material-ui/core";
import ImportIcon from "@material-ui/icons/GetApp";
import { makeStyles } from '@material-ui/core/styles';

// sub component
import { ResponsiveNetwork, Network } from "@nivo/network";
import FullScreenDialog from "./FullScreenNetwork";

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

function NetworkPlot_stencil(props) {
  const  classes  = useStyles(props);

  if (props.chartData === undefined ){
    return "No chart data detected";
  }

  //console.log(props.chartOptions);
  // Networkplot settings
  const plotOptions = {
    ...(props.chartOptions['linkBlendMode']?{linkBlendMode: props.chartOptions['linkBlendMode']}:{ linkBlendMode: "multiply" }),
    ...(props.chartOptions['motionConfig']?{motionConfig: props.chartOptions['motionConfig']}:{ motionConfig: "wobbly" }),
    ...(props.chartOptions['nodeBorderWidth']?{nodeBorderWidth: props.chartOptions['nodeBorderWidth']}:{ nodeBorderWidth: 1 }),
    ...(props.chartOptions['centeringStrength']?{centeringStrength: props.chartOptions['centeringStrength']}:{ centeringStrength: 0.3 }),
    ...(props.chartOptions['repulsivity']?{repulsivity: props.chartOptions['repulsivity']}:{ repulsivity: 6 }),

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
    motionDamping: 15
  };

  // Function to export the plot as svg
  let svgString = "";
  const handleExport = () => {
    svgString = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Network, {
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
    downloadLink.download = "network.svg";
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
        <ResponsiveNetwork
          data={props.chartData}
          linkDistance={function(e){return e.distance}}
          nodeSize={function(n){return n.size}}
          activeNodeSize={function(n){return 1.5*n.size}}
          nodeColor={function(e){return e.color}}
          linkThickness={function(n){return 2+2*n.target.data.height}}
          {...plotOptions}
        />
      </CardContent>
    </div>
  );
}

NetworkPlot_stencil.propTypes = {
  classes: PropTypes.object
};

export default NetworkPlot_stencil;
