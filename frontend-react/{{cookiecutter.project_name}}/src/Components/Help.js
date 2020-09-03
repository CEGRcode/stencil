import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

// contextAPI
import DataContext from "./DataContext";

// sub component
import HelpStepper from "./SubComponents/HelpStepper";

// Component styles
const styles = {
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
};

class Help extends React.Component {
  static contextType = DataContext;

  render() {
    const { classes } = this.props;
    // Setting the title of the browser tab
    document.title = "HELP";

    return (
      <div className={classes.root}>
        {/* "HelpStepper" is a default help component, replace it with your own if necessary */}
        <HelpStepper />
      </div>
    );
  }
}

Help.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Help));
