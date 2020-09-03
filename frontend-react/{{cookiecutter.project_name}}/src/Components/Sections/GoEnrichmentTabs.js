import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// sub components
import BarChart from "./BarChart";

// component styles
const styles = theme => ({
  card: {
    width: "100%"
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
  }
});

class GoEnrichmentTabs extends React.Component {
  // value is used to keep the tab active
  state = {
    selectedTab: 0,
    data: this.props.data[0]
  };

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        selectedTab: 0,
        data: this.props.data[0]
      });
    }
  }
  // handling tab changes
  handleChange = (event, selectedTab) => {
    // set the state based on the array values
    this.setState({
      selectedTab: selectedTab,
      data: this.props.data[selectedTab]
    });
  };

  render() {
    const { classes } = this.props;
    const { data, selectedTab } = this.state;
    const textAlign = { textAlign: "center" };
    const tabExtender = { scrollable: classes.scroller };

    let content = "";
    let chartData = [];
    let chartKeys = [];
    var HistogramFlag = [];

    if (data) {
      switch (selectedTab) {
        case 0:
          for (let i = 0; i < data.length; i++) {
            let temp = data[i].split(",");
            if (parseFloat(parseFloat(temp[1]).toPrecision(3)) > 0) {
              HistogramFlag.push(temp[1]);
            }
            chartData.push({
              item: temp[0],
              [temp[0]]: parseFloat(parseFloat(temp[1]).toPrecision(3))
            });
            chartKeys.push(temp[0]);
          }

          // checking if the values are valid
          if (HistogramFlag.length > 0) {
            const margin = { top: 0, right: 10, bottom: 90, left: 130 };
            content = (
              <BarChart
                chartData={chartData}
                chartKeys={chartKeys}
                margins={margin}
                xLegend={"Count"}
                yLegend={"Distance from TSS (kb)"}
              />
            );
          } else {
            content = (
              <CardContent className={classes.sectionHolder}>
                <Typography variant="overline" gutterBottom style={textAlign}>
                  No Data Available
                </Typography>
              </CardContent>
            );
          }

          break;

        case 1:
          for (let key in data) {
            let temp = data[key].split(",");

            chartData.push({
              item: temp[0],
              [temp[0]]: parseFloat(parseFloat(temp[2]).toPrecision(2))
            });
            chartKeys.push(temp[0]);
          }
          const margin1 = { top: 0, right: 10, bottom: 90, left: 450 };
          content = (
            <BarChart
              chartData={chartData}
              chartKeys={chartKeys}
              margins={margin1}
              xLegend={"-Log10(p-Value)"}
              yLegend={""}
            />
          );
          break;

        case 2:
          for (let key in data) {
            let temp = data[key].split(",");

            chartData.push({
              item: temp[0],
              [temp[0]]: parseFloat(parseFloat(temp[2]).toPrecision(2))
            });
            chartKeys.push(temp[0]);
          }
          const margin2 = { top: 0, right: 10, bottom: 90, left: 350 };
          content = (
            <BarChart
              chartData={chartData}
              chartKeys={chartKeys}
              margins={margin2}
              xLegend={"-Log10(p-Value)"}
              yLegend={""}
            />
          );
          break;

        case 3:
          for (let key in data) {
            let temp = data[key].split(",");

            chartData.push({
              item: temp[0],
              [temp[0]]: parseFloat(parseFloat(temp[2]).toPrecision(2))
            });
            chartKeys.push(temp[0]);
          }
          const margin3 = { top: 0, right: 10, bottom: 90, left: 340 };
          content = (
            <BarChart
              chartData={chartData}
              chartKeys={chartKeys}
              margins={margin3}
              xLegend={"-Log10(p-Value)"}
              yLegend={""}
            />
          );
          break;

        default:
          content = <Typography>Missing Data {selectedTab}</Typography>;
          break;
      }
    } else {
      content = (
        <CardContent className={classes.sectionHolder}>
          <Typography variant="overline" gutterBottom style={textAlign}>
            No Data Available
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
          Go Enrichment
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
            <Tab label="Histogram" key={0} />
            <Tab label="Biological Process" key={1} />
            <Tab label="Cellular Component" key={2} />
            <Tab label="Molecular Function" key={3} />
          </Tabs>

          <Divider />

          <CardContent className={classes.sectionHolder}>{content}</CardContent>
        </Paper>
      </div>
    );
  }
}

GoEnrichmentTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GoEnrichmentTabs);
