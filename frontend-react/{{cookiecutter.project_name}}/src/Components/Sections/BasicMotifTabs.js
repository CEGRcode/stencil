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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = theme => ({
  card: {
    maxWidth: 1100
  },
  mainContainer: {
    overflow: "scroll"
  },
  radioButton: {
    "&$checked": {
      color: blue["A700"]
    }
  },
  checked: {},

  featureHeatmap: {
    width: 250,
    height: 500
  },
  motifComposite: {
    height: 200,
    width: 275
  },
  motifHeatmap: {
    width: 250,
    height: 500,
    marginTop: -20
  },
  motifLogo: {
    width: 250,
    height: 100
  },
  motifLogoControls: {
    marginTop: 18
  },

  sectionTitle: {
    fontSize: 18
  },
  scroller: {
    overflow: "hidden"
  }
});

class BasicMotifTabs extends React.Component {
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

  // Used to update the component , when new props are passed
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

    if (typeof plots !== "undefined") {
      // set the motiflogo to forwardStrand
      var motifLogo =
        this.state.motifLogo === "forwardStrand" ? (
          <img
            src={plots.motifLogo}
            alt="MotifLogo"
            className={classes.motifLogo}
          />
        ) : (
          <img
            src={plots.motifLogoReverse}
            alt="MotifLogo"
            className={classes.motifLogo}
          />
        );
    }

    let tabnames = [];
    let count = 0;
    for (let t in this.props.tabs) {
      tabnames.push(<Tab label={this.props.tabs[t]} key={count} />);
      count++;
    }

    const motifContent =
      this.props.motifCount <= 0 ? (
        <CardContent className={classes.sectionHolder}>
          <Typography
            variant="overline"
            component="p"
            gutterBottom
            style={textAlign}
          >
            No Motifs were Reported
          </Typography>
        </CardContent>
      ) : (
        <CardContent className={classes.sectionHolder}>
          <Typography component="div">
            <Grid
              container
              spacing={3}
              direction="row"
              justify="center"
              className={classes.mainContainer}
            >
              {/* Left Section */}
              <Grid item>
                <Grid
                  container
                  direction="column"
                  justify="space-evenly"
                  alignItems="center"
                  spacing={0}
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
                          color="default"
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
                      src={plots.motifFourColor}
                      alt="FourColor Plot"
                      className={classes.featureHeatmap}
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
                  direction="column"
                  justify="space-evenly"
                  alignItems="center"
                  spacing={0}
                >
                  <Grid item>
                    <img
                      src={plots.motifComposite}
                      alt="Motif Composite"
                      className={classes.motifComposite}
                    />
                  </Grid>
                  <Grid item>
                    <img
                      src={plots.motifHeatmap}
                      alt="Motif Heatmap"
                      className={classes.motifHeatmap}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
      );

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
            motifContent
          )}
        </Paper>
      </div>
    );
  }
}

BasicMotifTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BasicMotifTabs);
