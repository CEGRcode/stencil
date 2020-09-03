import React, { Component } from "react";
import axios from "axios";

// material-ui imports
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import TrackHubIcon from "@material-ui/icons/AssessmentOutlined";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

// subComponents
import ReplicateTabs from "./ReplicateTabs";
import SampleStatsTable from "./SubComponents/SampleStatsTable";
import TrackLoader from "./SubComponents/TrackLoader";
import HeaderInfo from "./SubComponents/HeaderInfo";

// retrieve app configuration settings
import Config from "../Config";

// component styles.
const styles = theme => ({
  center: {
    margin: "auto",
    maxWidth: 1200,
    padding: 10
  },
  card: {
    maxWidth: 1200
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  searchbar: {
    width: 1100
  },
  textField: {
    marginLeft: 10,
    width: 160
  },
  filterContainer: {
    marginLeft: 60
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

class Sample extends Component {
  state = {
    post: null,
    proteinName: null,
    pageData: null,
    drawer: false,
    samples: null,
    loading: true,
    message: "Fetching Samples",
    trackLoader: false,
    summaryInfo: null
  };

  loadData = id => () => {
    let dataURL =
      Config.settings.apiURL + Config.settings.samplesEndpoint + "/" + id;
    axios
      .get(dataURL)
      .then(res => {
        let summaryItems = res.data.samples.map(item => {
          // console.log(item.summaryInfo.data);
          return item.summaryInfo.data;
        });

        this.setState({
          post: res.data.samples[0],
          proteinName: id,
          samples: res.data.samples,
          pageData: res.data.samples,
          loading: false,
          summaryInfo: summaryItems
        });
      })
      .catch(error => {
        console.log(error);
      });

    // Setting the title of the browser tab
    document.title = id.toUpperCase();
  };

  // you would access the route parameter here and then fetch data
  componentDidMount() {
    let id = this.props.match.params.protein_name;
    this.loadData(id)();
  }

  // Checks if the props have changed for the page and re-fetch the data.
  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.protein_name !==
      this.props.match.params.protein_name
    ) {
      let id = this.props.match.params.protein_name;
      this.loadData(id)();
    }
  }

  //  Custom Handlers
  toggleDrawer = option => () => {
    this.setState({
      drawer: option
    });
  };

  handleTrackLoaderOpen = () => {
    this.setState({ trackLoader: true });
  };

  handleTrackLoaderClose = () => {
    this.setState({ trackLoader: false });
  };

  render() {
    const { classes } = this.props;
    const { loading, message } = this.state;

    const post = loading ? (
      <Typography component="div" className={classes.center}>
        <Typography component="p" variant="subtitle1">
          {message}
        </Typography>
        <LinearProgress variant="query" />
      </Typography>
    ) : (
      <div className={classes.card}>
        <Card>
          {/* Header Section */}
          <HeaderInfo data={this.state.pageData[0].headerInfo.data} />
          <Divider variant="middle" />

          {/* Action toolbar */}
          <CardActions>
            <Grid container alignItems={"center"} justify={"space-between"}>
              <Grid item sm={"auto"}>
                <Button
                  size="small"
                  color="primary"
                  onClick={this.handleTrackLoaderOpen}
                >
                  <TrackHubIcon className={classes.leftIcon} />
                  UCSC Genome Browser
                </Button>

                <Button
                  size="small"
                  color="primary"
                  onClick={this.toggleDrawer(true)}
                >
                  <InfoIcon className={classes.leftIcon} />
                  Summary
                </Button>
              </Grid>
              <Grid item sm={"auto"} />
            </Grid>
          </CardActions>

          {/* Drawer to show all the individual sample stats */}
          <Drawer
            anchor="top"
            open={this.state.drawer}
            onClose={this.toggleDrawer(false)}
          >
            <div tabIndex={0} role="button">
              <SampleStatsTable
                stats={this.state.summaryInfo}
                order={this.state.pageData[0].summaryInfo.order}
                handleBack={this.toggleDrawer(false)}
              />
            </div>
          </Drawer>
        </Card>

        {/* Second Section with Tabs */}
        <ReplicateTabs samples={this.state.pageData} />
      </div>
    );

    return (
      <div>
        {/* main Sample Content */}
        <Typography component="div" className={classes.center}>
          {post}
        </Typography>

        <Dialog
          open={this.state.trackLoader}
          onClose={this.handleTrackLoaderClose}
          aria-labelledby="trackLoader-dialog-title"
          maxWidth={"md"}
        >
          <DialogTitle id="trackLoader-dialog-title">
            UCSC Genome Browser
            <IconButton
              aria-label="Close"
              className={classes.closeButton}
              onClick={this.handleTrackLoaderClose}
            >
              <CloseIcon color="primary" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Visualize sample tracks on UCSC genome browser.
            </DialogContentText>
            <br />
            <Divider />
            <TrackLoader samples={this.state.pageData} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

Sample.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sample);
