import React from "react";

import { Dialog, AppBar, Toolbar, IconButton, Typography, Tooltip, Slide, CardContent} from "@material-ui/core";
import { AspectRatio, Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

// Nivo charts
import { ResponsiveLine } from "@nivo/line";

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

  let plotData = props.plotData;
  let plotOptions = props.plotOptions;

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
            <ResponsiveLine data={plotData} {...plotOptions} />
          </CardContent>
        </div>
      </Dialog>
    </div>
  );
}
