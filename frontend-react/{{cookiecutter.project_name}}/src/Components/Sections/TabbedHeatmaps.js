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
  topSection: {},
  featureHeatmap: {
    width: 250
  },
  mainContainer: {
    overflow: "scroll"
  },
  sectionTitle: {
    fontSize: 18
  },
  scroller: {
    overflow: "hidden"
  }
};

class TabedHeatmaps extends React.Component {
  // set the imageUrl to the props and when tab is changed
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
                direction="column"
                wrap="nowrap"
                justify="flex-start"
                className={classes.mainContainer}
              >
                {/* Buffer Section */}
                <Grid item />

                <Grid item className={classes.topSection}>
                  <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={0}
                  >
                    <Grid item>
                      <img
                        src={plots.heatmap1}
                        alt="Heatmap"
                        className={classes.featureHeatmap}
                      />
                    </Grid>
                    <Grid item>
                      <img
                        src={plots.heatmap2}
                        alt="Heatmap"
                        className={classes.featureHeatmap}
                      />
                    </Grid>
                    <Grid item>
                      <img
                        src={plots.heatmap3}
                        alt="Heatmap"
                        className={classes.featureHeatmap}
                      />
                    </Grid>
                    <Grid item>
                      <img
                        src={plots.heatmap4}
                        alt="Heatmap"
                        className={classes.featureHeatmap}
                      />
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

TabedHeatmaps.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TabedHeatmaps);
