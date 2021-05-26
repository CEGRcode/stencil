import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Config from "../Config";
import DataContext from "./DataContext";

const styles = theme => ({
  root: {
    height: "100%",
    maxWidth: 980,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto",
    padding: 20
  },
  footer: {
    /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */
    flexShrink: 0
  },
  jumbotron: {
    padding: "2rem 2rem",
    [theme.breakpoints.down("sm")]: {
      padding: "4rem 0rem"
    }
  },
  container: {
    maxWidth: "1140px",
    paddingRight: 15,
    paddingLeft: 15,
    margin: "auto"
  },
  center: {
    margin: "auto",
    maxWidth: 1140
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  companyLogo: {
    width: 160
  },
  copyrightStyle: {
    textAlign: "center"
  }
});

class AccountPage extends React.Component {

  static contextType = DataContext;
  state = {userName:"", userEmail:"", role:"", projects:""};
  componentDidMount() {
    axios
      .get(Config.settings.apiURL + "/libraries/uid/" + this.context.uid, {withCredentials: true})
      .then(res => {
        const targets = res.data;
        //console.log(targets.user);
        this.setState(targets.user);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;

    // Setting the title of the browser tab
    document.title = "Edit User";

    let postBackString = this.props.location.search;
    let headerMsg = "";
    let headerColor ="";
    if (postBackString === "?1")
    {
      //update successful
      headerMsg = "User information updated.";
      headerColor = "primary";
    }
    else if (postBackString === "?2")
    {
      //update not successful, password not matching
      headerMsg = "Passwords do not match.";
      headerColor = "error";
    }


    return(
      <div className={classes.root}>
        <div className={classes.content}>
        <form
                    id="main-login"
                    action={Config.settings.apiURL + "/account"}
                    method="post">

        <Paper square>
          <div className={classes.jumbotron}>
            <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Account Information
            </Typography>
            {(headerMsg)?(<Typography variant="h6" color={headerColor} gutterBottom>
               {headerMsg}
            </Typography>):("")
            }
               <input type='hidden' name="uid" value={this.state.userName} />
              <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                  <Grid item xs={3}>
                    <Typography variant="h6" gutterBottom>User</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2" gutterBottom>{this.state.userName}</Typography>
                  </Grid>
              </Grid>
              <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                  <Grid item xs={3}>
                    <Typography variant="h6" gutterBottom>Role</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2" gutterBottom>{this.state.role}</Typography>
                  </Grid>
              </Grid>
              <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                  <Grid item  xs={3}>
                    <Typography variant="h6" gutterBottom>Email</Typography>
                  </Grid>
                  <Grid item  xs={2}>
                  <input
                    type="text"
                    name="email"
                    placeholder={this.state.userEmail}
                    variant="outlined" size="25"/>
                  </Grid>
              </Grid>
              <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                  <Grid item  xs={3}>
                    <Typography variant="h6" gutterBottom>Password</Typography>
                  </Grid>
                  <Grid item  xs={2}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Leave blank if unchanged"
                    variant="outlined" size="25"/>
                  </Grid>
              </Grid>
              <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                  <Grid item  xs={3}>
                    <Typography variant="h6" gutterBottom>Confirm Password</Typography>
                  </Grid>
                  <Grid item  xs={2}>
                  <input
                    type="password"
                    name="password2"
                    placeholder="Leave blank if unchanged"
                    variant="outlined" size="25"/>
                  </Grid>
              </Grid>
              <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                  <Grid item  xs={3}>
                  <br />
                  <Button type="submit" color="primary" fullWidth variant="contained">Edit User</Button>
                  </Grid>
                </Grid>
            </div>
          </div>
        </Paper>
        </form>
        </div>
      </div>

    )

  }
}



AccountPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountPage);
