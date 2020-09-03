import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, Paper, Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// ContextAPI
import DataContext from "./DataContext";

// component styles
const styles = theme => ({
  simpleDiv: {
    marginRight: 15,
    marginBottom: 15,
    padding: 10,
    height: 50,
    width: 50,
    border: "2px solid black"
  },
  myLinks: {
    textDecoration: "none",
    color: "black"
  },
  containerGrid: {
    padding: 20
  },
  root: {
    width: "85vw",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: "98vw",
      margin: "0 auto"
    },
    [theme.breakpoints.up("md")]: {
      width: "80vw",
      margin: "0 auto"
    },
    background: "linear-gradient(to bottom,#e8eaf6,#e8eaf6)"
  },
  TextField: {
    width: "100%"
  },
  filterBar: {
    width: 500,
    padding: 10,
    marginTop: 20,
    marginLeft: 20
  }
});

class ExploreGrid extends Component {
  static contextType = DataContext;

  state = {
    data: this.context.searchOptions,
    value: ""
  };

  handleChange = event => {
    const filteredItems = this.context.searchOptions.filter(item => {
      return item.value.startsWith(event.target.value.toUpperCase());
    });
    this.setState({ value: event.target.value, data: filteredItems });
  };

  render() {
    const { classes } = this.props;

    var myDict = {};

    this.state.data.map(item => {
      // get the first letter
      let letter = item.value.toUpperCase().charAt(0);
      // fill the array with alphabets as keys
      if (!myDict[letter]) {
        myDict[letter] = [item.value];
      } else {
        myDict[letter].push(item.value);
      }
      return 0;
    });

    // reference to iterate through the object of arrays
    // https://zellwk.com/blog/looping-through-js-objects/

    //  sort alpabetically
    let ordered = {};
    for (let value of Object.keys(myDict)
      .sort()
      .values()) {
      ordered[value] = myDict[value];
    }

    const entries = Object.entries(ordered);
    // console.log(entries);

    const sections = [];
    for (const [letter, proteinNames] of entries) {
      const alphaitems = proteinNames.map(item => {
        return (
          <Grid item key={letter + "-" + item}>
            <Link to={"/factor/" + item} className={classes.myLinks}>
              <Button variant="outlined" key={item}>
                {item}
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
        <Paper square className={classes.filterBar}>
          <Typography variant="h5">Explore</Typography>
          <Typography variant="subtitle2" gutterBottom>
            Using target names
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
        </Paper>
        <Grid container direction="column" className={classes.containerGrid}>
          <Paper square>{sections}</Paper>
        </Grid>
        <br />
      </div>
    );
  }
}

export default withStyles(styles)(ExploreGrid);
