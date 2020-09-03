import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import { Grid } from "@material-ui/core";

// Sectional components
import FeaturePileup from "./Sections/FeaturePileup";
import AprioriMotifs from "./Sections/AprioriMotifs";
import SequencingStats from "./Sections/SequencingStats";
import ChromatinState from "./Sections/ChromatinState";
import MotifAnalysis from "./Sections/MotifAnalysis";
import HorizontalImages from "./Sections/HorizontalImages";
import BasicMotifTabs from "./Sections/BasicMotifTabs";
import TabbedHeatmaps from "./Sections/TabbedHeatmaps";
import CodingFeatures from "./Sections/CodingFeatures";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%"
  },
  scroller: {
    overflow: "hidden"
  },
  card: {
    marginTop: 20
  },
  treatmentBadge: {
    marginRight: 20
  },
  sectionHolder: {
    background: "#fafafa"
  },
  contentHolder: {
    //  setting the padding based on the screen size
    [theme.breakpoints.down("sm")]: {
      padding: 8
    },
    [theme.breakpoints.up("md")]: {
      padding: 8 * 3
    },
    [theme.breakpoints.up("lg")]: {
      padding: 8 * 3
    }
  }
});

class ReplicateTabs extends React.Component {
  state = {
    replicate: 0,
    samples: this.props.samples[0]
  };

  handleChange = (event, replicate) => {
    this.setState({
      replicate: replicate,
      samples: this.props.samples[replicate]
    });
  };

  componentDidMount() {
    this.setState({
      replicate: 0,
      samples: this.props.samples[0]
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.samples !== this.props.samples) {
      this.setState({
        replicate: 0,
        samples: this.props.samples[0]
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { replicate, samples } = this.state;

    const tabExtender = { scrollable: classes.scroller };

    // creating tabs
    let i = -1;
    let tabList = this.props.samples.map(sample => {
      i++;
      return <Tab label={sample.sampleID} key={i} />;
    });

    // create sections based on layout
    let content = [];
    var tabitems = "";
    var ordered = {};

    for (let item in samples) {
      if (typeof samples[item] === "object") {
        switch (samples[item].layout) {
          case "aprioriTabs":
            // create a tab order, ascii sort
            ordered = {};
            for (var value of Object.keys(samples[item].data)
              .sort()
              .values()) {
              ordered[value] = samples[item].data[value];
            }

            tabitems = Object.keys(ordered);
            content.push(
              <Grid item key={item}>
                <span id="section4" />
                <AprioriMotifs
                  data={samples[item].data}
                  tabs={tabitems}
                  title={samples[item].title}
                />
              </Grid>
            );
            break;

          case "barGraphTabs":
            // create a tab order, ascii sort
            ordered = {};
            for (value of Object.keys(samples[item].data)
              .sort()
              .values()) {
              ordered[value] = samples[item].data[value];
            }
            tabitems = Object.keys(ordered);
            content.push(
              <Grid item key={item}>
                <span id="section6" />
                <ChromatinState
                  data={ordered}
                  tabs={tabitems}
                  title={samples[item].title}
                />
              </Grid>
            );
            break;

          case "featurePileup":
            // create a tab order, ascii sort
            ordered = {};
            for (value of Object.keys(samples[item].data)
              .sort()
              .values()) {
              ordered[value] = samples[item].data[value];
            }
            tabitems = Object.keys(ordered);
            content.push(
              <Grid item key={item}>
                <span id="section5" />
                <FeaturePileup
                  data={ordered}
                  tabs={tabitems}
                  title={samples[item].title}
                />
              </Grid>
            );
            break;

          case "horizontalImageTabs":
            // create a tab order, ascii sort
            ordered = {};
            for (value of Object.keys(samples[item].data)
              .sort()
              .values()) {
              ordered[value] = samples[item].data[value];
            }
            tabitems = Object.keys(ordered);
            content.push(
              <Grid item key={item}>
                <span id="section5" />
                <TabbedHeatmaps
                  data={ordered}
                  tabs={tabitems}
                  title={samples[item].title}
                />
              </Grid>
            );
            break;

          case "horizontalImageTabs2":
            // create a tab order, ascii sort
            ordered = {};
            for (value of Object.keys(samples[item].data)
              .sort()
              .values()) {
              ordered[value] = samples[item].data[value];
            }
            tabitems = Object.keys(ordered);
            content.push(
              <Grid item key={item}>
                <span id="section5" />
                <CodingFeatures
                  data={ordered}
                  tabs={tabitems}
                  title={samples[item].title}
                />
              </Grid>
            );
            break;

          case "infoTable":
            const ordering =
              samples[item].order !== "undefined"
                ? samples[item].order.split(",")
                : Object.keys(samples[item].data);
            content.push(
              <Grid item key={item}>
                <span id="section1"></span>
                <SequencingStats
                  data={samples[item].data}
                  ordering={ordering}
                  title={samples[item].title}
                />
              </Grid>
            );
            break;

          case "motifTabs":
            // create a tab order, ascii sort
            ordered = {};
            for (value of Object.keys(samples[item].data)
              .sort()
              .values()) {
              ordered[value] = samples[item].data[value];
            }

            tabitems = Object.keys(ordered);
            content.push(
              <Grid item key={item}>
                <span id="section4" />
                <MotifAnalysis
                  data={samples[item].data}
                  tabs={tabitems}
                  title={samples[item].title}
                />
              </Grid>
            );
            break;

          case "basicMotifTabs":
            // create a tab order, ascii sort
            ordered = {};
            for (value of Object.keys(samples[item].data)
              .sort()
              .values()) {
              ordered[value] = samples[item].data[value];
            }

            tabitems = Object.keys(ordered);
            content.push(
              <Grid item key={item}>
                <span id="section4" />
                <BasicMotifTabs
                  data={samples[item].data}
                  tabs={tabitems}
                  title={samples[item].title}
                />
              </Grid>
            );
            break;

          case "horizontalImage":
            content.push(
              <Grid item key={item}>
                <span id="section4" />
                <HorizontalImages
                  data={samples[item].data}
                  title={samples[item].title}
                />
              </Grid>
            );
            break;

          default:
            console.log("Missing a layout type " + samples[item].title);
            break;
        }
      }
    }

    return (
      <div className={classes.root}>
        <Paper className={classes.card}>
          <Tabs
            value={replicate}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="on"
            classes={tabExtender}
          >
            {tabList}
          </Tabs>

          <Divider />

          {/* Sections */}
          <CardContent className={classes.sectionHolder}>
            <Typography component="div" className={classes.contentHolder}>
              <Grid
                container
                spacing={3}
                direction="column"
                wrap="nowrap"
                justify="flex-start"
                className={classes.mainContainer}
              >
                {content}
              </Grid>
            </Typography>
          </CardContent>
        </Paper>
      </div>
    );
  }
}

ReplicateTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReplicateTabs);
