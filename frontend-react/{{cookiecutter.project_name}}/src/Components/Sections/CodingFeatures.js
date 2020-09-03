import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = {
  card: {
    maxWidth: 1100
  },
  paper: {
    height: 200,
    width: 200,
    padding: 20
  },
  leftSection: {},
  rightSection: {},
  featureHeatmap: {
    width: 210,
    height: 530,
    marginTop: 35
  },
  colorBar: {
    height: 470,
    width: 20,
    marginTop: 14,
    marginLeft: -25
  },
  enrichedcolorBar: {
    height: 443,
    width: 20,
    marginTop: 11,
    marginLeft: -12.5
  },
  mainContainer: {
    overflow: "scroll"
  },
  composite: {
    height: 135,
    marginLeft: -6,
    marginBottom: -8,
    marginTop: 25
  },
  regionHeatmap: {
    height: 410
  },
  sectionTitle: {
    fontSize: 18
  },
  scroller: {
    overflow: "hidden"
  },
  chexmixContent: {
    border: "2px solid red"
  }
};

class CodingFeatures extends React.Component {
  // set the plots to the props and when tab is changed
  state = {
    selectedTab: 0,
    plots: this.props.data[this.props.tabs[0]]
  };

  componentDidMount() {
    this.setState({
      selectedTab: 0,
      plots: this.props.data[this.props.tabs[0]]
    });
  }

  // Used to update the section images , when new replicate tab is selected
  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        selectedTab: 0,
        plots: this.props.data[this.props.tabs[0]]
      });
    }
  }

  handleChange = (event, selectedTab) => {
    selectedTab === 0
      ? this.setState({
          selectedTab: selectedTab,
          plots: this.props.data[this.props.tabs[selectedTab]]
        })
      : this.setState({
          selectedTab: selectedTab,
          plots: this.props.data[this.props.tabs[selectedTab]]
        });
  };

  render() {
    const { classes } = this.props;
    const { plots } = this.state;
    const { selectedTab } = this.state;
    const tabExtender = { scrollable: classes.scroller };

    let tabnames = [];
    let count = 0;
    for (let t in this.props.tabs) {
      tabnames.push(<Tab label={this.props.tabs[t]} key={count} />);
      count++;
    }

    return (
      <div className={classes.card}>
        {/* Header */}
        <Typography
          variant="overline"
          component="h5"
          gutterBottom
          className={classes.sectionTitle}
        >
          {this.props.title}
        </Typography>

        <Paper>
          <Tabs
            value={selectedTab}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="on"
            classes={tabExtender}
          >
            {tabnames}
          </Tabs>

          <Divider />

          <CardContent className={classes.sectionHolder}>
            <Typography component="div">
              <Grid
                container
                spacing={2}
                direction="row"
                wrap="nowrap"
                justify="flex-start"
                className={classes.mainContainer}
              >
                {/* Buffer Section */}
                <Grid item />

                {/* Left Section */}
                <Grid item className={classes.leftSection}>
                  <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={1}
                    wrap="nowrap"
                  >
                    <Grid item>
                      <img
                        src={plots.heatmap1}
                        alt="All Features Heatmap"
                        className={classes.featureHeatmap}
                      />
                    </Grid>
                    <Grid item>
                      <img
                        src={plots.heatmap2}
                        alt="Bound Features Colorbar"
                        className={classes.colorBar}
                      />
                    </Grid>
                    <Grid item />
                    <Grid item>
                      <img
                        src={plots.heatmap3}
                        alt="Bound Features Heatmap"
                        className={classes.featureHeatmap}
                      />
                    </Grid>
                    <Grid item>
                      <img
                        src={plots.heatmap4}
                        alt="Bound Features Colorbar"
                        className={classes.colorBar}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Buffer Section */}
                <Grid item />

                {/* Right Section */}
                <Grid item className={classes.rightSection}>
                  <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={0}
                    wrap="nowrap"
                  >
                    {/* NFR */}
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                        spacing={0}
                      >
                        <Grid item>
                          <img
                            src={plots.heatmap5}
                            alt="NFR Composite"
                            className={classes.composite}
                          />
                        </Grid>
                        <Grid item>
                          <img
                            src={plots.heatmap6}
                            alt="NFR Heatmap"
                            className={classes.regionHeatmap}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* TSS */}
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                        spacing={0}
                      >
                        <Grid item>
                          <img
                            src={plots.heatmap7}
                            alt="TSS Composite"
                            className={classes.composite}
                          />
                        </Grid>
                        <Grid item>
                          <img
                            src={plots.heatmap8}
                            alt="TSS Heatmap"
                            className={classes.regionHeatmap}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* TES */}
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                        spacing={0}
                      >
                        <Grid item>
                          <img
                            src={plots.heatmap9}
                            alt="TES Composite"
                            className={classes.composite}
                          />
                        </Grid>
                        <Grid item>
                          <img
                            src={plots.heatmap10}
                            alt="TES Heatmap"
                            className={classes.regionHeatmap}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Paper>
      </div>
    );
  }
}

CodingFeatures.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CodingFeatures);
