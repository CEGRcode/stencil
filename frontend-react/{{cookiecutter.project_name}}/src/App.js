import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Material ui styling
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// Material UI components
import LinearProgress from "@material-ui/core/LinearProgress";

// Sub Components
import Navbar from "./Components/Navbar";
import ExploreGrid from "./Components/ExploreGrid";
import LandingPage from "./Components/LandingPage";
import Sample from "./Components/Sample";
import Help from "./Components/Help";

// Configuration
import Config from "./Config";

// React contextAPI for common app data
import { DataProvider } from "./Components/DataContext";

// creating a themes with default fontfamily
const theme1 = createMuiTheme({
  typography: {
    fontFamily: [
      '"Roboto Slab"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ],
    useNextVariants: true
  }
});

const theme2 = createMuiTheme({
  palette: {
    primary: {
      light: "#60ad5e",
      main: "#2e7d32",
      dark: "#005005",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#fff"
    }
  },
  typography: {
    fontFamily: [
      '"Bree Serif"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ],
    useNextVariants: true
  }
});

// styles for the app page.
const styles = theme => ({
  borderLine: {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
});

// simple compare function to sort search suggestions
function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const itemA = a.value.toUpperCase();
  const itemB = b.value.toUpperCase();

  let comparison = 0;
  if (itemA > itemB) {
    comparison = 1;
  } else if (itemA < itemB) {
    comparison = -1;
  }
  return comparison;
}

class App extends Component {
  state = {
    isThemeLight: true,
    searchOptions: [],
    data: null
  };

  componentDidMount() {
    // Retrieve all samples.
    axios
      .get(Config.settings.apiURL + Config.settings.samplesEndpoint)
      .then(res => {
        const targets = res.data.samples.map(sample => {
          return sample.target;
        });
        //  create an array of unique targets
        const unique = [...new Set(targets)];

        // create the search options; [replace with existing search endpoint in future]
        const items = [];
        for (let i = 0; i < unique.length; i++) {
          items.push({ value: unique[i], label: unique[i] });
        }
        // sort the items
        items.sort(compare);

        this.setState({ data: res.data.samples, searchOptions: items });
        // console.log(items);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { isThemeLight } = this.state;
    // const { classes } = this.props;

    const appData = {
      data: this.state.data,
      searchOptions: this.state.searchOptions
    };

    const background = isThemeLight
      ? "linear-gradient(to bottom,#e8eaf6,#e8eaf6)"
      : "linear-gradient(to bottom,#e8f5e9,#e8f5e9)";

    // set the body color to the theme.
    document.body.style.background = background;

    return (
      <MuiThemeProvider theme={isThemeLight ? theme1 : theme2}>
        <CssBaseline />
        <div>
          <BrowserRouter>
            {this.state.data ? (
              <DataProvider value={appData}>
                <Navbar searchOptions={this.state.searchOptions} />
                <Switch>
                  <Route exact path="/" component={LandingPage} />
                  <Route
                    exact
                    path="/factor/:protein_name"
                    component={Sample}
                  />
                  <Route exact path="/help/" component={Help} />
                  <Route exact path="/explore/" component={ExploreGrid} />
                </Switch>
              </DataProvider>
            ) : (
              <LinearProgress />
            )}
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
