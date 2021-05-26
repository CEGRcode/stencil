import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DataContext from "./DataContext";
import Config from "../Config";
import axios from "axios";
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

class EditUserPage extends React.Component {

  static contextType = DataContext;
  state = {userName:"", userEmail:"", role:"", status:"", projects:""};

  componentDidMount() {
    var uid = this.props.match.params.uid;
    //console.log("edit user id: ", uid);
    axios
      .get(Config.settings.apiURL + "/libraries/uid/" +uid, {withCredentials: true})
      .then(res => {
        const targets = res.data;
        //console.log("retrieved: ", targets.user);
        this.setState(targets.user);
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleChange = (event) => {
    this.setState({"role":event.target.value});
  };
  handleChangeStatus = (event) => {
    this.setState({"status":event.target.value});
  };

  handleChangeProjects = (event) => {
    this.setState({"projects":event.target.value});
  };
  render() {
    const { classes } = this.props;
    // console.log("render edituser id");
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
                    action={Config.settings.apiURL + "/edituser"}
                    method="post">

        <Paper square>
          <div className={classes.jumbotron}>
            <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Admin Page For User Account
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
                  <Grid item xs={3}>
                    <Typography variant="body2" gutterBottom>{this.state.userName}</Typography>
                  </Grid>
              </Grid>
              <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                  <Grid item  xs={3}>
                    <Typography variant="h6" gutterBottom>Role</Typography>
                  </Grid>
                  <Grid item  xs={3}>
                    <Select
                      labelId="selectrole"
                      id="selectrole"
                      name="selectrole"
                      value={this.state.role}
                      onChange={this.handleChange}
                    >
                      <MenuItem value="admin">admin</MenuItem>
                      <MenuItem value="regular">regular</MenuItem>
                      <MenuItem value="guest">guest</MenuItem>
                    </Select>
                  </Grid>
              </Grid>
              <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                  <Grid item  xs={3}>
                    <Typography variant="h6" gutterBottom>Status</Typography>
                  </Grid>
                  <Grid item  xs={3}>
                    <Select
                      labelId="selectstatus"
                      id="selectstatus"
                      name="selectstatus"
                      value={this.state.status}
                      onChange={this.handleChangeStatus}
                    >
                      <MenuItem value="active">active</MenuItem>
                      <MenuItem value="inactive">inactive</MenuItem>
                    </Select>
                  </Grid>
              </Grid>
              <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                  <Grid item  xs={3}>
                    <Typography variant="h6" gutterBottom>Projects</Typography>
                  </Grid>
                  <Grid item  xs={3}>
                  <input
                    type="text"
                    name="projects"
                    value={this.state.projects}
                    size="25" variant="outlined"
                    onChange={this.handleChangeProjects}/>
                  </Grid>
              </Grid>
              <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                  <Grid item  xs={3}>
                    <Typography variant="h6" gutterBottom>Email</Typography>
                  </Grid>
                  <Grid item  xs={3}>
                  <input type="text" name="email" placeholder={this.state.userEmail} size="25" variant="outlined" />
                  </Grid>
              </Grid>
              <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                  <Grid item  xs={3}>
                    <Typography variant="h6" gutterBottom>Password</Typography>
                  </Grid>
                  <Grid item  xs={3}>
                  <input type="password" name="password" placeholder="Leave blank if unchanged" size="25" variant="outlined" />
                  </Grid>
              </Grid>
              <Grid container spacing={2} justify="center" alignItems="center" direction="row">
                  <Grid item  xs={3}>
                    <Typography variant="h6" gutterBottom>Confirm Password</Typography>
                  </Grid>
                  <Grid item  xs={3}>
                  <input type="password" name="password2" placeholder="Leave blank if unchanged" size="25" variant="outlined" />
                  </Grid>
              </Grid>
              <Grid container spacing={2} direction="row" justify="center" alignItems="center">
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



EditUserPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditUserPage);
