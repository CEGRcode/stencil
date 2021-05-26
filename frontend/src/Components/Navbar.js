import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// MaterialUI packages
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, CardActions, Tooltip, IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Search from "./Search";
import DataContext from "./DataContext";
import Config from "../Config";

// component styles
const styles = {
  appBar: {
    background: "#eeeeee"
  },
  appBar2: {
    background: "#fff"
  }
};

class NavBar extends React.Component {
  static contextType = DataContext;

  render() {
    const { classes } = this.props;
    const location = this.props.location.pathname;

    return ( (location !== "/libraries") && (location !== "/login")) ? (
      <Paper
        square
        elevation={0}
        className={classes.appBar2}
      >
        <CardActions>
          <Grid container alignItems={"center"} justify={"space-between"}>
            <Grid item sm={"auto"}>
              <Grid
                container
                spacing={1}
                alignItems={"center"}
                justify={"space-between"}
              >
                {/* Filter Menu */}
                <Grid item sm={"auto"} >
                  Project: {this.props.currentProj}
                </Grid>

                <Grid item sm={"auto"}>
                <Search suggestions={this.props.searchOptions} defaultText={this.props.defaultText} handle={this.props.handle} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item sm={"auto"}>
              {/* just a place holder to separate the icons */}
            </Grid>

            <Grid item sm={"auto"}>
              <Link to="/">
                <Tooltip title="Home" aria-label="home">
                  <IconButton color="primary">
                    <HomeIcon />
                  </IconButton>
                </Tooltip>
              </Link>
              <Link to="/account">
                <Tooltip title="Account" aria-label="account">
                  <IconButton color="primary">
                    <AccountCircle />
                  </IconButton>
                </Tooltip>
              </Link>
              {
                (this.props.role==="admin")?(
                  <Link to="/admin">
                  <Tooltip title="Admin" aria-label="admin">
                    <IconButton color="primary">
                      <SupervisedUserCircle />
                    </IconButton>
                  </Tooltip>
                </Link>
                ):("")
              }
              <a href={Config.settings.apiURL + "/logout"}>
                <Tooltip title="Logout" aria-label="logout">
                  <IconButton color="primary">
                    <ExitToAppIcon />
                  </IconButton>
                </Tooltip>
              </a >

            </Grid>
          </Grid>
        </CardActions>
      </Paper>
    ) : (
      " "
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(NavBar));
