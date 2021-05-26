import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MaterialUI packages
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, Paper, Divider, Grid, TextField } from "@material-ui/core";

// Sub Components
import Search from "./Search";
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
  simpleDiv: {
    marginRight: 15,
    marginBottom: 15,
    padding: 10,
    height: 50,
    width: 50,
    border: "2px solid black"
  },
  containerGrid: {
    padding: 20
  },
  myLinks: {
    textDecoration: "none",
    color: "black"
  },
  TextField: {
    width: "100%"
  },
  filterBar: {
    width: 400,
    padding: 10,
    marginTop: 20,
    marginLeft: 20
  }
});

class HomePage extends React.Component {
  // using the context
  static contextType = DataContext;

  state = {
    data: this.context.allLibraryList,
    value: ""
  };

  handleChange = event => {
    const filteredItems = this.context.allLibraryList.filter(item => {
      return item.label.toUpperCase().startsWith(event.target.value.toUpperCase());
    });
    this.setState({ value: event.target.value, data: filteredItems });
  };


  render() {
    const { classes } = this.props;

    // Setting the title of the browser tab
    document.title = "Home";
    // Initialize array containing unique list of letters
    var myDict = {};
    this.state.data.map(item => {
      // get the first letter
      let letter = item.label.toUpperCase().charAt(0);
      // fill the array with alphabets as keys
      if (!myDict[letter]) {
        myDict[letter] = [item];
      } else {
        myDict[letter].push(item);
      }
      return 0;
    });
    // console.log(myDict);
    // reference to iterate through the object of arrays
    // https://zellwk.com/blog/looping-through-js-objects/

    //  sort alpabetically
    let ordered = {};
    for (let value of Object.keys(myDict).sort().values()) {
      ordered[value] = myDict[value];
    }
    const entries = Object.entries(ordered);
    // console.log(entries);

    const sections = [];
    for (const [letter, expNames] of entries) {
      //console.log(expNames);
      const alphaitems = expNames.map(item => {
        return (
          <Grid item key={letter + "-" + item.label}>
            <Link to={"/getLib/" + item.value} className={classes.myLinks}>
              <Button variant="outlined" key={item.label}>
                {item.label}
              </Button>
            </Link>
          </Grid>
        );
      });
      sections.push(
        <Grid
          container
          spacing={1}
          key={letter + "+" + letter}
          className={classes.containerGrid}
        >
          <div className={classes.simpleDiv}>
            <Typography variant="h5">{letter}</Typography>
          </div>
          {alphaitems}
        </Grid>
      );
      sections.push(<Divider key={letter + "_" + letter} />);
    }

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Paper square>
            {/* Jumbotron or main message */}
            <div className={classes.jumbotron}>
              <div className={classes.container}>
                <Typography variant="h4" gutterBottom>
                  Browse Experiments
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                {(this.context.login)?("Logged in as: " + this.context.uid):(<a href="../login"> You need to login first. </a>)}
                </Typography>
                <Divider />
              </div>
            </div>
            <Grid container spacing={2} direction="row" alignContent="center" alignItems="center">
              {/* SearchBar */}
              <Grid item>
                <Search suggestions={this.context.projList} defaultText={"Project ID: " + this.context.currentProject} handle="project" />
              </Grid>
              <Grid item>
                <Search suggestions={this.context.allLibraryList} defaultText="Search by experiment ID" handle="getLib" />
              </Grid>

              <Grid item></Grid>

              <Grid item>
                <div className={classes.container}>
                  <Typography variant="h6">Project Overview</Typography>
                  <Divider />
                  <br />
                  <Typography variant="body1">
                  {this.context.projDesc[this.context.currentProject]}
                  </Typography>
                  <br />
                </div>
              </Grid>
            </Grid>
          </Paper>
          <br />
          <br />
          <Paper square>
            <Grid container spacing={2}>
              <Grid item>
                <div className={classes.filterBar}>
                  <Typography variant="h5">Explore</Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Using experiment IDs
                  </Typography>
                  <Divider />
                  <br />
                  <TextField
                    id="standard-name"
                    label="Search & Filter"
                    value={this.state.value}
                    onChange={this.handleChange}
                    variant="outlined"
                    className={classes.TextField}
                  />
                </div>
              </Grid>
            </Grid>
            <Paper square>{sections}</Paper>
          </Paper>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);
