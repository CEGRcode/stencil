import React from "react";
import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";

import { CardContent, Grid, Tooltip, IconButton} from "@material-ui/core";
import ImportIcon from "@material-ui/icons/GetApp";
import { makeStyles } from '@material-ui/core/styles';

// sub component
import { ResponsiveTreeMap, TreeMap } from "@nivo/treemap";
import FullScreenDialog from "./FullScreenTreemap";

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

function Treemap_stencil(props) {
  const  classes  = useStyles(props);

  if (props.chartData === undefined ){
    return "No chart data detected";
  }

  //console.log(props.chartOptions);
  // Treemap settings
  const plotOptions = {
    ...(props.chartOptions['identity']?{identity: props.chartOptions['identity']}:{ }),
    ...(props.chartOptions['value']?{value: props.chartOptions['value']}:{ }),
    ...(props.chartOptions['valueFormat']?{valueFormat: props.chartOptions['valueFormat']}:{ }),

    ...(props.chartOptions['labelSkipSize']?{labelSkipSize: props.chartOptions['labelSkipSize']}:{ labelSkipSize: 12 }),
    ...(props.chartOptions['labelTextColor']?{labelTextColor: props.chartOptions['labelTextColor']}:{ labelTextColor: "black" }),

    ...(props.chartOptions['parentLabelPosition']?{parentLabelPosition: props.chartOptions['parentLabelPosition']}:{ parentLabelPosition: "left" }),
    ...(props.chartOptions['parentLabelTextColor']?{parentLabelTextColor: props.chartOptions['parentLabelTextColor']}:{ parentLabelTextColor: "black" }),

    ...(props.chartOptions['borderColor']?{borderColor: props.chartOptions['borderColor']}:{ borderColor: "black" }),

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
      fontSize: 12,
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
      React.createElement(TreeMap, {
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
    downloadLink.download = "Treemap.svg";
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
        <ResponsiveTreeMap
          data={props.chartData}
          {...plotOptions}
        />
      </CardContent>
    </div>
  );
}

Treemap_stencil.propTypes = {
  classes: PropTypes.object
};

export default Treemap_stencil;
