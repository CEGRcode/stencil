import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import CardActions from "@material-ui/core/CardActions";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

// component styles.
const styles = theme => ({
  fullList: {
    width: "auto",
    height: "100%"
  },
  table: {
    width: "auto",
    margin: "0 auto"
  },
  borderLine: {
    border: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing(1)}px ${theme.spacing(1) * 2}px`
  }
});

class SampleStatsTable extends React.Component {
  render() {
    const { classes } = this.props;
    const centerContent = {
      textAlign: "center"
    };

    var tableHeadKeys = Object.keys(this.props.stats[0]);
    const tableBody = [];

    // if there is an order specified then use the order
    if (typeof this.props.order !== "undefined") {
      tableHeadKeys = this.props.order.split(",");
    }

    // Create the table body with sample data.
    for (var j = 0; j < this.props.stats.length; j++) {
      let tcells = [];

      for (var i = 0; i < tableHeadKeys.length; i++) {
        let k = tableHeadKeys[i];
        tcells.push(
          <TableCell align="left" key={i + j} className={classes.borderLine}>
            {this.props.stats[j][k]}
          </TableCell>
        );
      }
      tableBody.push(
        <TableRow key={j} className={classes.borderLine}>
          {tcells}
        </TableRow>
      );
    }

    return (
      <CardContent className={classes.fullList}>
        <CardActions>
          <Grid container alignItems={"center"} justify={"space-between"}>
            <Grid item sm={"auto"}>
              <Tooltip title="Go Back" aria-label="Go Back">
                <Button
                  size="small"
                  color="primary"
                  onClick={this.props.handleBack}
                >
                  <ArrowBack />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item sm={"auto"}>
              {/* Add Actions here */}
            </Grid>
          </Grid>
        </CardActions>

        <Divider />
        <br />

        <CardContent>
          <Typography style={centerContent} variant="h6">
            Showing metadata for {this.props.stats.length + " "}
            Sample(s)
          </Typography>
        </CardContent>

        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.borderLine}>
              {tableHeadKeys.map(item => {
                return (
                  <TableCell
                    align="center"
                    key={item}
                    className={classes.borderLine}
                  >
                    {item}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>{tableBody}</TableBody>
        </Table>
      </CardContent>
    );
  }
}

SampleStatsTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SampleStatsTable);
