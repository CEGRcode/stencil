import React, { Component } from "react";
import axios from "axios";

// material-ui imports
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";


// subComponents
import HeaderInfo from "./SubComponents/LibraryHeaderInfo";
import LayoutList from "./LayoutList";
import Config from "../Config";
// retrieve app configuration settings
require("dotenv").config();

// component styles.
const styles = theme => ({
  center: {
    margin: "auto",
    maxWidth: 1200,
    padding: 10
  },
  card: {
    maxWidth: 1200
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  searchbar: {
    width: 1100
  },
  textField: {
    marginLeft: 10,
    width: 160
  },
  filterContainer: {
    marginLeft: 60
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

class Library extends Component {
  state = {
    data: null,
    dbid: null,
    loading: true,
    message: "Fetching data for the library ...",
  };

  loadData = id => () => {
    let dataURL = Config.settings.apiURL + Config.settings.libraryPageEndPoint + "/" + id;
    //console.log(dataURL);
    axios
      .get(dataURL)
      .then(res => {
        this.setState({
          dbid: id,
          data: res.data.libraries[0],
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });

    // Setting the title of the browser tab
    document.title = id.toUpperCase();
  };

  // you would access the route parameter here and then fetch data
  componentDidMount() {
    let id = this.props.match.params.library_id;
    this.loadData(id)();
  }

  // Checks if the props have changed for the page and re-fetch the data.
  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.library_id !==
      this.props.match.params.library_id
    ) {
      let id = this.props.match.params.library_id;
      this.loadData(id)();
    }
  }

  //  Custom Handlers
  toggleDrawer = option => () => {
    this.setState({
      drawer: option
    });
  };

  handleTrackLoaderOpen = () => {
    this.setState({ trackLoader: true });
  };

  handleTrackLoaderClose = () => {
    this.setState({ trackLoader: false });
  };

  render() {
    const { classes } = this.props;
    const { loading, message } = this.state;

    const post = loading ? (
      <Typography component="div" className={classes.center}>
        <Typography component="p" variant="subtitle1">
          {message}
        </Typography>
      </Typography>
    ) : (
      <div className={classes.card}>
        {/* Header Section */}
        <Card>
          <HeaderInfo data={this.state.data} />
        </Card>
        <LayoutList libraryData={this.state.data.libraryData} />
      </div>
    );

    return (
      <div>
        {/* main Library Content */}
        <Typography component="div" className={classes.center}>
          {post}
        </Typography>
      </div>
    );
  }
}

Library.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Library);
