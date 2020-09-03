import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

// component styles
const styles = theme => ({
  root: {
    width: "100%"
  },
  table: {
    minWidth: 400
  },
  sectionTitle: {
    fontSize: 18
  },
  card: {
    maxWidth: 1100,
    margin: "auto"
  },
  borderLine: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
});

const CustomTableCell = withStyles(theme => ({
  head: {
    color: "black",
    fontSize: 16,
    fontWeight: 700
  },
  body: {
    fontSize: 15
  }
}))(TableCell);

function SequencingStats(props) {
  const { classes } = props;
  const { data, ordering } = props;

  const content = [];
  ordering.forEach(function(item, index) {
    let row = (
      <TableRow key={item}>
        <CustomTableCell
          component="th"
          scope="row"
          className={classes.borderLine}
        >
          {item.toUpperCase()}
        </CustomTableCell>
        <CustomTableCell align="left">{data[item]}</CustomTableCell>
      </TableRow>
    );
    content.push(row);
  });

  return (
    <div className={classes.card}>
      <Typography
        variant="overline"
        component="h5"
        gutterBottom
        className={classes.sectionTitle}
      >
        {props.title}
      </Typography>
      <Paper className={classes.root} elevation={1}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.header}>
              <CustomTableCell className={classes.borderLine}>
                Meta Information
              </CustomTableCell>
              <CustomTableCell align="left">Value</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{content}</TableBody>
        </Table>
      </Paper>
    </div>
  );
}

SequencingStats.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SequencingStats);
