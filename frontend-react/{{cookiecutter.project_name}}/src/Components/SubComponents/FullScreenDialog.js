import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import AspectRatio from "@material-ui/icons/AspectRatio";
import Tooltip from "@material-ui/core/Tooltip";
import { ResponsiveLine } from "@nivo/line";
import { CardContent } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  chartContainer: {
    height: 800,
    width: "100vw",
    overflow: ""
  },
  card: {
    overflow: "scroll"
  },
  fullScreen: {
    marginLeft: "88%"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let plotData = props.sampleAntiData
    ? [
        {
          id: "controlSense",
          data: props.controlSenseData
        },
        {
          id: "sampleSense",
          data: props.sampleSenseData
        },
        {
          id: "controlAnti",
          data: props.controlAntiData
        },
        {
          id: "sampleAnti",
          data: props.sampleAntiData
        }
      ]
    : [
        {
          id: "control",
          data: props.controlSenseData
        },
        {
          id: "sample",
          data: props.sampleSenseData
        }
      ];

  let plotColors = props.sampleAntiData
    ? ["#a0a0a0", "#0061ff", "#000000", "#e53935"]
    : ["#a0a0a0", "#0061ff"];

  const plotOptions = {
    margin: { top: 80, right: 80, bottom: 120, left: 80 },
    xScale: {
      type: "linear",
      stacked: false,
      min: "auto",
      max: "auto"
    },
    yScale: {
      type: "linear",
      stacked: false,
      min: props.ymin,
      max: props.ymax
    },
    axisTop: null,
    axisRight: null,
    axisBottom: {
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Distance from TSS (bp)",
      legendOffset: 46,
      legendPosition: "middle",
      tickValues: props.axisTickValues
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
    legends: [
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 100,
        itemsSpacing: 35,
        itemDirection: "left-to-right",
        itemWidth: 100,
        itemHeight: 20,
        itemOpacity: 1.0,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)"
      }
    ],
    enablePoints: false,
    enableSlices: "x",
    enableGridY: true,
    crosshairType: "cross",
    colors: plotColors
  };

  return (
    <div>
      <IconButton
        className={classes.fullScreen}
        color="primary"
        onClick={handleClickOpen}
      >
        <Tooltip title="Full Screen" aria-label="fullscreen">
          <AspectRatio />
        </Tooltip>
      </IconButton>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Interactive Composite
            </Typography>
            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Expanded Chart */}
        <div className={classes.card}>
          <CardContent className={classes.chartContainer}>
            <ResponsiveLine data={plotData} {...plotOptions} />
          </CardContent>
        </div>
      </Dialog>
    </div>
  );
}
