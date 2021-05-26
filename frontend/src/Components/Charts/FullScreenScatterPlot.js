import React from "react";
import { useState } from 'react';

import { TextField, Dialog, AppBar, Toolbar, IconButton, Typography, Tooltip, Slide, CardContent} from "@material-ui/core";
import { AspectRatio, Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

// Nivo charts
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  chartContainer: {
    height: 700,
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

  let plotData = props.plotData;
  let plotOptions = props.plotOptions;
  let plotColor = props.plotColor;

  const [ xMin, setXmin ] = useState(props.plotOptions.xScale.min);
  const [ xMax, setXmax ] = useState(props.plotOptions.xScale.max);
  const [ yMin, setYmin ] = useState(props.plotOptions.yScale.min);
  const [ yMax, setYmax ] = useState(props.plotOptions.yScale.max);
  let xType = props.plotOptions.xScale.type;
  let yType = props.plotOptions.yScale.type;

  const handleXMin = (event) => {
    setXmin(!isNaN(event.target.value) ? event.target.value : 'auto');
  };

  const handleXMax = (event) => {
    setXmax(!isNaN(event.target.value) ? event.target.value : 'auto');
  };

  const handleYMin = (event) => {
    setYmin(!isNaN(event.target.value) ? event.target.value : 'auto');
  };

  const handleYMax = (event) => {
    setYmax(!isNaN(event.target.value) ? event.target.value : 'auto');
  };

  //console.log(props.plotOptions.xScale.type);

  return (
    <div>
      <IconButton className={classes.fullScreen} color="primary" onClick={handleClickOpen}>
        <Tooltip title="Full Screen" aria-label="fullscreen">
          <AspectRatio />
        </Tooltip>
      </IconButton>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Interactive Chart
            </Typography>
            <IconButton color="inherit" onClick={handleClose} aria-label="Close">
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Expanded Chart */}
        <div className={classes.card}>
          <CardContent className={classes.chartContainer}>
            <ResponsiveScatterPlotCanvas
              data={plotData}
              {...plotOptions}
              colors={plotColor}
              xScale={{ type: xType, min: xMin, max: xMax }}
              yScale={{ type: yType, min: yMin, max: yMax }}
            />
          </CardContent>
        </div>

        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item>
              <TextField
                id="xMin-textfield"
                label="X-axis (min)"
                variant="outlined"
                margin="dense"
                onChange={handleXMin}
              />
          </Grid>
          <Grid item>
              <TextField
                id="xMax-textfield"
                label="X-axis (max)"
                variant="outlined"
                margin="dense"
                onChange={handleXMax}
              />
          </Grid>
          <Grid item>
              <TextField
                id="yMin-textfield"
                label="Y-axis (min)"
                variant="outlined"
                margin="dense"
                onChange={handleYMin}
              />
          </Grid>
          <Grid item>
            <TextField
                id="yMax-textfield"
                label="Y-axis (max)"
                variant="outlined"
                margin="dense"
                onChange={handleYMax}
              />
          </Grid>
        </Grid>

      </Dialog>
    </div>
  );
}
