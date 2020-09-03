import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import blue from "@material-ui/core/colors/blue";
import Radio from "@material-ui/core/Radio";

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
    // border: '2px solid gray'
  },
  featureHeatmap: {
    width: 210,
    height: 500,
    marginTop: 35
    //   border: '2px solid yellow'
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
  motifLogoControls: {},
  comparisonImage: {
    marginTop: 45
  }
});

class MotifAnalysis extends React.Component {
  // value is used to keep the tab active
  state = {
    selectedTab: 0,
    plots: this.props.data[this.props.tabs[0]],
    motifLogo: "forwardStrand"
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

  // To switch between positive and reverse strand

  handleRadioChange = event => {
    this.setState({ motifLogo: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { plots, selectedTab } = this.state;

    const tabExtender = { scrollable: classes.scroller };
    const textAlign = { textAlign: "center" };
    const radioClasses = {
      root: classes.radioButton,
      checked: classes.checked
    };

    // If the chartData is available & not undefined
    if (typeof plots !== "undefined") {
      var chart =
        Object.keys(plots).length > 0 ? (
          <MotifChart chartData={plots.subtypeComposite} />
        ) : (
          <Typography> No Data </Typography>
        );

      // set the motiflogo to forwardStrand
      var motifLogo =
        this.state.motifLogo === "forwardStrand" ? (
          <img
            src={plots.subtypePlot1}
            alt="MotifLogo"
            height="200"
            width="400"
          />
        ) : (
          <img
            src={plots.subtypePlot2}
            alt="MotifLogo"
            height="200"
            width="400"
          />
        );
    }

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
          {/* overriding the css using the css api for the tabs, 
        removed the scrollbar that appears otherwise 
        */}

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
                spacing={1}
                wrap="nowrap"
              >
                <Grid item>
                  <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="space-evenly"
                    className={classes.motifLogoControls}
                  >
                    <Grid item>
                      <Radio
                        checked={this.state.motifLogo === "forwardStrand"}
                        onChange={this.handleRadioChange}
                        value="forwardStrand"
                        name="forwardStrand-radio-button"
                        aria-label="forwardStrandButton"
                        classes={radioClasses}
                      />
                      Forward
                    </Grid>
                    <Grid item>
                      <Radio
                        checked={this.state.motifLogo === "reverseStrand"}
                        onChange={this.handleRadioChange}
                        value="reverseStrand"
                        name="reverseStrand-radio-button"
                        aria-label="reverseStrandButton"
                      />
                      Reverse
                    </Grid>
                  </Grid>
                  {motifLogo}
                </Grid>
                <Grid item>
                  <img
                    className={classes.comparisonImage}
                    src={plots.subtypePlot3}
                    alt="motifComparison"
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
                justify="space-evenly"
                alignItems="center"
                spacing={1}
                wrap="nowrap"
              >
                <Grid item>
                  <img
                    src={plots.subtypePlot4}
                    alt="Heatmap"
                    className={classes.featureHeatmap}
                  />
                </Grid>
                <Grid item>
                  <img
                    src={plots.subtypePlot5}
                    alt="4colorPlot"
                    className={classes.featureHeatmap}
                  />
                </Grid>
                <Grid item>
                  <img
                    src={plots.subtypePlot6}
                    alt="4colorPlot"
                    className={classes.featureHeatmap}
                  />
                </Grid>
                <Grid item>{chart}</Grid>
              </Grid>

              {/* <Divider/> */}
              <br />
              <CollapseTable tableData={plots.tableData} />
            </CardContent>
          )}
        </Paper>
      </div>
    );
  }
}

MotifAnalysis.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MotifAnalysis);
