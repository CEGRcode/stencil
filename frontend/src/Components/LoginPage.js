import React from "react";
import PropTypes from "prop-types";

import Config from "../Config";

// MaterialUI packages
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";

// Cornell logos
import logo1 from '../logos/logo1.svg';
import logo2 from '../logos/logo2.svg';

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
  companyLogo: {
    width: 100
  },
  copyrightStyle: {
    textAlign: "center"
  }
});

class LoginPage extends React.Component {
  state = {
    selectedTab: 0,
    forceTabChange: 0
  };
  // handling tab changes
  handleChange = (event, selectedTab) => {
    this.setState({
      selectedTab: selectedTab,
      forceTabChange: 1
    });
  };

  render() {
    let postBackString = this.props.location.search;
    var { selectedTab,  forceTabChange} = this.state;
    const { classes } = this.props;
    const currentYear = new Date().getFullYear();

    let tabnames = [];
    tabnames.push(<Tab label="Local Login" key="0" />);
    tabnames.push(<Tab label="Single Sign-on" key="1" />);
    tabnames.push(<Tab label="Register" key="2" />);
    tabnames.push(<Tab label="Guest Login" key="3" />);

    let content = "";
    let headerMsg = "";
    let headerColor = "";

    if ((postBackString === "?1") && (forceTabChange===0))
    {
      //register successful, please login
      selectedTab =0;
      content = <LoginBox />
      headerMsg = "You have successfully registered. Please login.";
      headerColor = "primary";
    }
    else if ((postBackString === "?2") && (forceTabChange===0))
    {
      //login failed
      selectedTab =0;
      content = <LoginBox />
      headerMsg = "Login failed. Username and/or password are not correct!";
      headerColor = "error";
    }
    else if ((postBackString === "?3") && (forceTabChange===0))
    {
      //login failed
      selectedTab =2;
      content = <Register />
      headerMsg = "Registration failed. The passwords do not match. Please try again.";
      headerColor = "error";
    }
    else if ((postBackString === "?4") && (forceTabChange===0))
    {
      //login failed
      selectedTab =2;
      content = <Register />
      headerMsg = "Registration failed. The user name is taken. Please try again!";
      headerColor = "error";
    }
    else if ((postBackString === "?5") && (forceTabChange===0))
    {
      //login failed
      selectedTab =2;
      content = <Register />
      headerMsg = "User name not registered! Please register first.";
      headerColor = "error";
    }
    else
    {
      switch (selectedTab) {
        case 0:
          content = <LoginBox />
        break;
        case 1:
          content = <SSOlogin />
        break;
        case 2:
          content = <Register />
        break;
        case 3:
          content = <Guest />
        break;
        default:
          content = <LoginBox />

      }
    }


    return(
      <div className={classes.root}>
        <div className={classes.content}>

        <Paper square>
          <div className={classes.jumbotron}>
            <div className={classes.container}>
              <Typography variant="h4" align="center" gutterBottom>
                 STENCIL Login
              </Typography>
              {(headerMsg)?(<Typography variant="h6" color={headerColor} gutterBottom>
                 {headerMsg}
              </Typography>):("")
              }
              <Typography component="div" className={classes.contentHolder}>
                    <Tabs
                      value={selectedTab}
                      onChange={this.handleChange}
                      centered={true}
                      indicatorColor="primary"
                      textColor="primary"
                    >
                      {tabnames}
                    </Tabs>
                    <br />
                    {content}
              </Typography>
            </div>
          </div>
        </Paper>

        <br />
        <br />

        <Paper square>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <div className={classes.container}>
                <Typography variant="h6">Overview</Typography>
                <Divider />
                <br />
                <Typography variant="body1">
                  STENCIL is a web-based platform for visualizing results of data processing pipeline.
                </Typography>
                <br />
                <Divider />
              </div>
            </Grid>

            {/* Footer  Section */}
            <Grid item className={classes.center}>
              <Grid
                container
                spacing={4}
                alignItems={"center"}
                direction="row"
                justify="center"
                alignContent="center"
                className={classes.footer}
              >
                <Grid item>
                  <img
                    src={logo1}
                    alt="cib_logo"
                    className={classes.companyLogo}
                  />
                </Grid>
                <Grid item>
                  <img
                    src={logo2}
                    alt="cornell_logo"
                    className={classes.companyLogo}
                  />
                </Grid>
              </Grid>
              <br />
              <Divider />
            </Grid>

            {/* copyright info */}
            <Grid item>
              <Typography variant="body2" className={classes.copyrightStyle}>
                &copy; {currentYear} Cornell
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        </div>
      </div>

    )

  }
}

class SSOlogin extends React.Component{

  componentDidMount(){
    window.location.href = Config.settings.SSOURL;
  }
  render() {
    return(
      <div>
        <Typography variant="subtitle1" gutterBottom>
            <a href={Config.settings.SSOURL}>Click</a> if not redirected
        </Typography>
      </div>
    )
  }
}

class Guest extends React.Component{

  componentDidMount(){
    window.location.href =  Config.settings.apiURL + "/guest";
  } 
  render() {
    return(
      <div>
        <Typography variant="subtitle1" gutterBottom>
            <a href={Config.settings.apiURL + "/guest"}>Click</a> if not redirected to guest page.
        </Typography>
      </div>
    )
  }
}

class Register extends React.Component{
  render() {
    return (
              <div>
                <form
                    id="main-login"
                    action={Config.settings.apiURL + "/register"}
                    method="post">
                <Typography variant="subtitle1" align="center" gutterBottom>
                 * SSO users please leave the password fields blank.<br />
                </Typography>
                <Grid container spacing={2} direction="column" justify="center" alignItems="center">
                  <Grid item xs={8}>
                  <input type="text" name="username" placeholder="Username" size="small" variant="outlined" />
                  </Grid>
                </Grid>
                <Grid container spacing={2} direction="column" justify="center" alignItems="center">
                  <Grid item xs={8}>
                  <input type="text" name="email" placeholder="Email" size="small" variant="outlined" />
                  </Grid>
                </Grid>
                <Grid container spacing={2} direction="column" justify="center" alignItems="center">
                  <Grid item xs={8}>
                  <input type="password" name="password" placeholder="Password" size="small" variant="outlined" />
                  </Grid>
                </Grid>
                <Grid container spacing={2} direction="column" justify="center" alignItems="center">
                  <Grid item xs={8}>
                  <input type="password" name="password2" placeholder="Repeat password" size="small" variant="outlined" />
                  </Grid>
                </Grid>
                <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                  <Grid item  xs={3}>
                  <br />
                  <Button type="submit" color="primary" fullWidth variant="contained">Register</Button>
                  </Grid>
                </Grid>
                </form>
              </div>
    );
  }
}

class LoginBox extends React.Component{
  render() {
    return (
              <div>
                <form
                    id="main-login"
                    action={Config.settings.apiURL + "/login"}
                    method="post">
                  <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                    <Grid item xs={8}>
                      <input type="text" name="username" placeholder="Username" size="small" variant="outlined" />
                    </Grid>
                  </Grid>
                  <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                    <Grid item xs={8}>
                      <input type="password" name="password" placeholder="Password" size="small" variant="outlined" />
                    </Grid>
                  </Grid>
                  <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                    <Grid item xs={3}>
                    <br />
                    <Button type="submit" color="primary" fullWidth variant="contained">Submit</Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginPage);
