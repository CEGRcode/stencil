import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Paper, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: `theme.spacing.unit()`,
    border: `1px solid ${theme.palette.divider}`
  },
  expandButton: {
    margin: 20
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
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
  },
  rootOverride: {
    overflow: "scroll",
    border: "2px solid green",
    maxWidth: 100
  }
});

class CollapseTable extends React.Component {
  state = {
    expanded: false,
    data: {}
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  componentDidMount() {
    // creating the data
    const tableInfo = {};
    const tData = this.props.tableData;
    if (typeof this.props.tableData !== "undefined") {
      if (typeof this.props.tableData["order"] !== "undefined") {
        let order = this.props.tableData["order"].split(",");
        order.forEach(function(item, index) {
          if (item !== "header" && item !== "order") {
            tableInfo[item] = tData[item].split(",");
          }
        });
      }
    } else {
      // for each key separate out the values
      for (var key in this.props.tableData) {
        if (key !== "header" && key !== "order") {
          tableInfo[key] = this.props.tableData[key].split(",");
        }
      }
    }

    this.setState({
      data: tableInfo
    });
  }

  // changing to componentDidUpdate
  componentDidUpdate(prevProps) {
    if (prevProps.tableData !== this.props.tableData) {
      // creating the data
      const tableInfo = {};
      const data = this.props.tableData;
      if (typeof data !== "undefined") {
        if (typeof data["order"] !== "undefined") {
          let order = data["order"].split(",");
          order.forEach(function(item, index) {
            if (item !== "header" && item !== "order") {
              tableInfo[item] = data[item].split(",");
            }
          });
        }
      } else {
        // for each key separate out the values
        for (var key in data) {
          if (key !== "header" && key !== "order") {
            tableInfo[key] = data[key].split(",");
          }
        }
      }

      this.setState({
        data: tableInfo
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;
    const rows = [];

    var tableHead = (
      <TableHead>
        <TableRow className={classes.header}>
          <TableCell className={classes.borderLine}>Motif Stats</TableCell>
          <TableCell align="left">Value</TableCell>
        </TableRow>
      </TableHead>
    );

    if (this.props.tableData !== "undefined") {
      // create the table header
      let items = [];
      this.props.tableData["header"].split(",").forEach(function(item, index) {
        items.push(
          <TableCell key={item} className={classes.borderLine}>
            {item}
          </TableCell>
        );
      });

      tableHead = (
        <TableHead>
          <TableRow className={classes.header} key={"headerData"}>
            {items}
          </TableRow>
        </TableHead>
      );

      // create the individual data rows
      for (let key in data) {
        var cells = [];

        // create row cells
        for (let j = 0; j < data[key].length; j++) {
          // checking for strings
          if (parseFloat(data[key][j])) {
            //  if the data values have commas in them
            if (data[key][j].indexOf(",") > -1) {
              cells.push(
                <TableCell
                  className={classes.borderLine}
                  align="left"
                  key={key + j}
                >
                  {data[key][j]}
                </TableCell>
              );
            } else {
              cells.push(
                <TableCell
                  className={classes.borderLine}
                  align="left"
                  key={key + j}
                >
                  {Number.parseFloat(data[key][j]).toPrecision(3)}
                </TableCell>
              );
            }
          } else {
            // console.info(data[key][j]);
            cells.push(
              <TableCell
                className={classes.borderLine}
                align="left"
                key={key + j}
              >
                {data[key][j]}
              </TableCell>
            );
          }
        }

        // add rows into an array
        rows.push(
          <TableRow key={key}>
            <TableCell
              component="th"
              scope="row"
              className={classes.borderLine}
            >
              {key}
            </TableCell>
            {cells}
          </TableRow>
        );
      }
    } else {
      // When no data is available to display.
      tableHead = (
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell align="left">Data</TableCell>
          </TableRow>
        </TableHead>
      );
      rows.push(
        <TableRow key={"nodata"}>
          <TableCell component="th" scope="row" className={classes.borderLine}>
            No Data Available
          </TableCell>
        </TableRow>
      );
    }

    return (
      <div className={classes.card}>
        {/* expansion button */}
        <Button
          variant="outlined"
          color="primary"
          className={classes.expandButton}
          onClick={this.handleExpandClick}
          aria-expanded={this.state.expanded}
          aria-label="Show more"
        >
          {"More Information "}
          <ExpandMoreIcon
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
          />
        </Button>

        {/* Collapable table */}
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <Paper className={classes.root} elevation={0}>
            <Table className={classes.table}>
              {tableHead}
              <TableBody>
                {rows.map(item => {
                  return item;
                })}
              </TableBody>
            </Table>
          </Paper>
        </Collapse>
      </div>
    );
  }
}

CollapseTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CollapseTable);
