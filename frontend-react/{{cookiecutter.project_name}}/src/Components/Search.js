import React from "react";
import Select from "react-select";
import { withRouter } from "react-router-dom";

// material ui
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";

// component style
const styles = theme => ({
  root: {
    minwidth: 700,
    [theme.breakpoints.down("sm")]: {
      minWidth: 300
    },
    [theme.breakpoints.up("md")]: {
      minWidth: 500
    }
  },
  input: {
    display: "flex",
    padding: 20,
    border: `1px solid ${theme.palette.primary[300]}`
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2)
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 25,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 999,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

NoOptionsMessage.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * Props to be passed on to the wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired
};

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any.isRequired })
  ])
};

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps }
  } = props;

  var inputprops = {
    inputComponent,
    inputProps: {
      className: classes.input,
      ref: innerRef,
      children,
      ...innerProps
    }
  };
  return (
    <TextField fullWidth={true} InputProps={inputprops} {...TextFieldProps} />
  );
}

Control.propTypes = {
  /**
   * Children to render.
   */
  children: PropTypes.node,
  /**
   * The mouse down event and the innerRef to pass down to the controller element.
   */
  innerProps: PropTypes.shape({ onMouseDown: PropTypes.func.isRequired })
    .isRequired,
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any.isRequired })
  ]).isRequired,
  selectProps: PropTypes.object.isRequired
};

function Option(props) {
  var itemStyle = {
    fontWeight: props.isSelected ? "bold" : 400
  };
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={itemStyle}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.placeholder}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

Placeholder.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
};

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

ValueContainer.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired
};

function Menu(props) {
  return (
    <Paper
      square={true}
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

Menu.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.element.isRequired,
  /**
   * Props to be passed to the menu wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired
};

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

class SearchBar extends React.Component {
  state = {
    single: ""
  };

  handleChangeSingle = item => {
    this.setState({ single: item });
    //Do nothing when the value is null
    if (!item) {
      console.log(item);
    } else {
      this.props.history.push("/factor/" + item.value);
    }
  };

  handleBlur = () => {
    this.setState({ single: "" });
  };

  render() {
    const { classes, theme, suggestions } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };

    const textfieldprops = {
      InputLabelProps: {
        htmlFor: "react-select-single",
        shrink: true
      }
    };

    return (
      <div className={classes.root}>
        <Paper className={classes.inputContainer} square={true} elevation={1}>
          <NoSsr>
            <Select
              classes={classes}
              styles={selectStyles}
              inputId="react-select-single"
              TextFieldProps={textfieldprops}
              placeholder="Search your favourite target"
              options={suggestions}
              components={components}
              value={this.state.single}
              onChange={this.handleChangeSingle}
              isClearable="isClearable"
              autoFocus="autoFocus"
            />
          </NoSsr>
        </Paper>
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(withRouter(SearchBar));
