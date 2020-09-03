import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import { ResponsiveBar } from "@nivo/bar";

// Component styles
const styles = {
  card: {
    minWidth: 275
  },
  pos: {
    marginBottom: 12
  },
  chartContainer: {
    height: 600,
    width: "100%",
    margin: "0 auto"
  }
};

function BarChart(props) {
  const { classes } = props;

  // plot settings
  const colors = { scheme: "spectral" };
  const theme = {
    fontSize: 14,
    fontFamily: "Roboto Slab"
  };
  const borderColor = { from: "color", modifiers: [["darker", 1.6]] };
  const axisBottom = {
    tickSize: 5,
    tickPadding: 25,
    tickRotation: 0,
    legend: props.xLegend,
    legendPosition: "middle",
    legendOffset: 75
  };
  const axisLeft = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: props.yLegend,
    legendPosition: "middle",
    legendOffset: -100
  };

  return (
    <div className={classes.card}>
      <CardContent className={classes.chartContainer}>
        <ResponsiveBar
          data={props.chartData}
          keys={props.chartKeys}
          groupMode="stacked"
          indexBy="item"
          margin={props.margins}
          padding={0.3}
          innerPadding={3}
          theme={theme}
          enableLabel={false}
          layout={"horizontal"}
          colors={colors}
          borderColor={borderColor}
          borderWidth={1}
          axisBottom={axisBottom}
          enableGridX={true}
          axisLeft={axisLeft}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="inherit:darker(1.6)"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          tooltip={data => {
            return (
              <span>
                <strong>
                  {data.id} : {data.value}
                </strong>
              </span>
            );
          }}
        />
      </CardContent>
    </div>
  );
}

BarChart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BarChart);
