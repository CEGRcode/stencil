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
import CollapseTable from "../SubComponents/CollapseTable";
import Log2Histogram from "../SubComponents/Log2Histogram";
import FrequencyHistogram from "../SubComponents/FrequencyHistogram";

// component styles.
const styles = theme => ({
  card: {
    maxWidth: 1100
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
});

class ChromatinState extends React.Component {
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
    // console.log(this.props.data[this.props.tabs[selectedTab]]);
  };

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

    let tabnames = [];
    let count = 0;
    for (let t in this.props.tabs) {
      tabnames.push(<Tab label={this.props.tabs[t]} key={count} />);
      count++;
    }

    const textAlign = { textAlign: "center" };
    const tabExtender = { scrollable: classes.scroller };

    // Code to disable the plots in case the data is undefined
    var log2Plot = "";
    var freqHistogram = "";

    if (plots) {
      if (plots.log2barChart) {
        log2Plot = (
          <div>
            <Typography variant="body1" gutterBottom style={textAlign}>
              Log2 Histogram
            </Typography>
            <Log2Histogram data={plots.log2barChart} />
            <Divider />
          </div>
        );
      } else {
        log2Plot = (
          <CardContent className={classes.sectionHolder}>
            <Typography variant="overline" gutterBottom style={textAlign}>
              No Data Available : Log2Histogram
            </Typography>
            <Divider />
          </CardContent>
        );
      }

      if (plots.freqbarChart) {
        freqHistogram = (
          <div>
            <Typography variant="body1" gutterBottom style={textAlign}>
              Frequency Histogram
            </Typography>
            <FrequencyHistogram data={plots.freqbarChart} />
            <Divider />
          </div>
        );
      } else {
        freqHistogram = (
          <CardContent className={classes.sectionHolder}>
            <Typography variant="overline" gutterBottom style={textAlign}>
              No Data Available : Frequency Histogram
            </Typography>
            <Divider />
          </CardContent>
        );
      }
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
            <br />
            <Grid
              container
              spacing={3}
              direction="column"
              wrap="nowrap"
              alignItems="center"
              className={classes.mainContainer}
            >
              <Grid item>{log2Plot}</Grid>
              <Grid item>{freqHistogram}</Grid>
            </Grid>
            <br />

            {/* Table Goes here */}
            <CollapseTable tableData={plots.tableData} forMotifs={false} />
          </CardContent>
        </Paper>
      </div>
    );
  }
}

ChromatinState.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChromatinState);
