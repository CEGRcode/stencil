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

// sub components
import LinePlot from "../SubComponents/LinePlot";
import CollapseTable from "../SubComponents/CollapseTable";

// component styles
const styles = theme => ({
  card: {
    maxWidth: 1100
  },
  leftSection: {},
  featureHeatmap: {
    width: 210,
    height: 530,
    marginTop: 35
  },
  mainContainer: {
    overflow: "scroll"
  },
  regionHeatmap: {
    width: 600
  },
  sectionTitle: {
    fontSize: 18
  },
  scroller: {
    overflow: "hidden"
  },
  sectionHolder: {
    minWidth: 600
  }
});

class FeaturePileup extends React.Component {
  // value is used to keep the tab active
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
    const { plots, selectedTab } = this.state;
    const tabExtender = { scrollable: classes.scroller };
    const textAlignment = { textAlign: "center" };

    let tabnames = [];
    let count = 0;
    for (let t in this.props.tabs) {
      tabnames.push(<Tab label={this.props.tabs[t]} key={count} />);
      count++;
    }

    // If the chartData is available & not undefined
    if (plots.compositeData) {
      var chart = <LinePlot chartData={plots.compositeData} />;
    } else {
      chart = (
        <CardContent className={classes.sectionHolder}>
          <Typography
            variant="overline"
            component="p"
            gutterBottom
            style={textAlignment}
          >
            No Data Reported
          </Typography>
        </CardContent>
      );
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
                spacing={3}
                direction="row"
                wrap="nowrap"
                justify="flex-start"
                className={classes.mainContainer}
              >
                <Grid item></Grid>

                <Grid item className={classes.leftSection}>
                  <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={1}
                    wrap="nowrap"
                  >
                    <Grid item>{chart}</Grid>
                    <Grid item>
                      <img
                        src={plots.samplePlot}
                        alt="Sample Heatmap"
                        className={classes.featureHeatmap}
                      />
                    </Grid>
                    <Grid item>
                      <img
                        src={plots.controlPlot}
                        alt="Control Heatmap"
                        className={classes.featureHeatmap}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Typography>

            {/* Table Goes here */}
            <CollapseTable tableData={plots.tableData} forMotifs={true} />
          </CardContent>
        </Paper>
      </div>
    );
  }
}

FeaturePileup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FeaturePileup);
