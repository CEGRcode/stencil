import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import blue from "@material-ui/core/colors/blue";

//  for pileup tabs
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CollapseTable from "../SubComponents/CollapseTable";

// sub components
import MotifChart from "../SubComponents/MotifChart";

const styles = theme => ({
  card: {
    // border: `2px solid green`,
    maxWidth: 1100
  },
  leftSection: {
    // border: "2px solid gray"
  },
  featureHeatmap: {
    width: 210,
    height: 500,
    marginTop: 35
    // border: "2px solid yellow"
  },
  mainContainer: {
    overflow: "scroll"
  },
  regionHeatmap: {
    // width: 410
    height: 350
  },
  sectionTitle: {
    fontSize: 18
  },
  scroller: {
    overflow: "hidden"
  },
  radioButton: {
    "&$checked": {
      color: blue["A700"]
    }
  },
  checked: {},
  motifLogoControls: {}
});

class AprioriMotifs extends React.Component {
  // value is used to keep the tab active
  state = {
    selectedTab: 0,
    plots: this.props.data[this.props.tabs[0]]
  };

  // handling tab changes
  handleChange = (event, selectedTab) => {
    this.setState({
      selectedTab: selectedTab,
      plots: this.props.data[this.props.tabs[selectedTab]]
    });
  };

  componentDidMount() {
    this.setState({
      selectedTab: 0,
      plots: this.props.data[this.props.tabs[0]]
    });
  }

  // Used to update the AprioriMotifs , when new props are passed
  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        selectedTab: 0,
        plots: this.props.data[this.props.tabs[0]]
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { plots, selectedTab } = this.state;
    const tabExtender = { scrollable: classes.scroller };
    const textAlign = { textAlign: "center" };

    // If the chartData is available & not undefined
    if (typeof plots.aprioriComposite !== "undefined") {
      var chart =
        Object.keys(plots.aprioriComposite).length > 0 ? (
          <MotifChart chartData={plots.aprioriComposite} />
        ) : (
          <Typography> No Data </Typography>
        );
    }

    //  create tabs
    let tabnames = [];
    let count = 0;
    for (let t in this.props.tabs) {
      tabnames.push(<Tab label={this.props.tabs[t]} key={count} />);
      count++;
    }

    return (
      <div className={classes.card}>
        {/* Section Title */}
        <Typography
          variant="overline"
          component="h5"
          gutterBottom
          className={classes.sectionTitle}
        >
          {this.props.title}
        </Typography>

        {/* Section Tabs */}
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

          {tabnames.length < 1 ? (
            <CardContent className={classes.sectionHolder}>
              <Typography variant="overline" gutterBottom style={textAlign}>
                No Motifs were Reported
              </Typography>
            </CardContent>
          ) : (
            <CardContent className={classes.sectionHolder}>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                spacing={0}
                wrap="nowrap"
              >
                <Grid item>
                  <img
                    src={plots.aprioriPlot1}
                    alt="Motif-Logo"
                    height="200"
                    width="400"
                  />
                </Grid>
              </Grid>

              <Divider />
              <br />

              <Grid
                container
                direction="row"
                alignItems="center"
                spacing={0}
                wrap="nowrap"
                className={classes.mainContainer}
              >
                <Grid item>
                  <img
                    src={plots.aprioriPlot2}
                    alt="4color-plot"
                    className={classes.featureHeatmap}
                  />
                </Grid>
                <Grid item>
                  <img
                    src={plots.aprioriPlot3}
                    alt="sampleheatmap"
                    className={classes.featureHeatmap}
                  />
                </Grid>
                <Grid item>
                  <img
                    src={plots.aprioriPlot4}
                    alt="controlheatmap"
                    className={classes.featureHeatmap}
                  />
                </Grid>
                {/* composite Plot */}
                <Grid item>{chart}</Grid>
              </Grid>

              <br />
              <Divider />
              {/* Table Goes here */}
              <CollapseTable tableData={plots.tableData} />
            </CardContent>
          )}
        </Paper>
      </div>
    );
  }
}

AprioriMotifs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AprioriMotifs);
