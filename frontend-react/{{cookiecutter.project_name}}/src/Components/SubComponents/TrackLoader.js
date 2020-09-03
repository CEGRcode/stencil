import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Button, DialogActions } from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TrackHubIcon from "@material-ui/icons/AssessmentOutlined";

// contextAPI
import DataContext from "../DataContext";

// retrieve app configuration settings
import Config from "../../Config";

const styles = theme => ({
  tableHeader: {
    backgroundColor: "#e8eaf6",
    fontSize: 15
  },
  borderLine: {
    border: `1px solid ${theme.palette.divider}`,
    color: "black",
    fontSize: 15
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  }
});

class TrackLoader extends React.Component {
  static contextType = DataContext;

  singleTrackLoader = sampleId => () => {
    console.log("Loading single sample track, sampleID : " + sampleId);
    console.log(
      "Use trackHubPrefix in the configuration " +
        Config.settings.trackHubPrefix
    );

    // implement your track hub specific single track loader.
  };

  handleTrackHubClick = () => {
    console.log(
      "Loading all samples tracks, using trackHubPrefix " +
        Config.settings.trackHubPrefix
    );
    // implement your track hub specific multi-track loader.
  };

  render() {
    const { classes } = this.props;
    // console.log(this.props.samples);

    return (
      <Paper square elevation={0} className={classes.appBar}>
        <DialogActions>
          <Button
            size="small"
            color="primary"
            onClick={this.handleTrackHubClick}
            className={classes.closeButton}
          >
            <TrackHubIcon className={classes.leftIcon} />
            visualize all
          </Button>
        </DialogActions>
        <CardContent>
          <Table className={classes.table}>
            <TableHead className={classes.tableHeader}>
              <TableRow className={classes.borderLine}>
                <TableCell align="left" className={classes.borderLine}>
                  Target
                </TableCell>
                <TableCell align="left" className={classes.borderLine}>
                  Sample ID
                </TableCell>
                <TableCell align="center" className={classes.borderLine}>
                  Assay
                </TableCell>
                <TableCell align="center" className={classes.borderLine}>
                  Lab
                </TableCell>
                <TableCell align="center" className={classes.borderLine}>
                  Track Loader
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.samples.map(item => {
                return (
                  <TableRow key={item._id} className={classes.borderLine}>
                    <TableCell align="left" className={classes.borderLine}>
                      {item.target}
                    </TableCell>
                    <TableCell align="left" className={classes.borderLine}>
                      {item.sampleID}
                    </TableCell>
                    <TableCell align="left" className={classes.borderLine}>
                      {item.assayType}
                    </TableCell>
                    <TableCell align="left" className={classes.borderLine}>
                      {item.lab}
                    </TableCell>
                    <TableCell align="center" className={classes.borderLine}>
                      <Button
                        size="small"
                        color="primary"
                        onClick={this.singleTrackLoader(item.sampleID)}
                      >
                        <LaunchIcon className={classes.leftIcon} />
                        visualize
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Paper>
    );
  }
}

TrackLoader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TrackLoader);
