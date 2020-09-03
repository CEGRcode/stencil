import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { Button, CardActions } from "@material-ui/core";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import ListIcon from "@material-ui/icons/ViewList";

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

class SimpleLandingPage extends React.Component {
  // using the context
  static contextType = DataContext;

  render() {
    const { classes } = this.props;
    const currentYear = new Date().getFullYear();

    // Setting the title of the browser tab
    document.title = "{{cookiecutter.hero_title}}";

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Paper square>
            <CardActions>
              <Grid container alignItems={"center"} justify={"space-between"}>
                <Grid item sm={"auto"}>
                  <Link to="/explore">
                    <Button size="small" color="primary">
                      <ListIcon className={classes.leftIcon} />
                      Explore
                    </Button>
                  </Link>

                  <Link to="/help">
                    <Button size="small" color="primary">
                      <InfoIcon className={classes.leftIcon} />
                      Help
                    </Button>
                  </Link>
                </Grid>
                <Grid item sm={"auto"} />
              </Grid>
            </CardActions>
          </Paper>

          <Paper square>
            {/* Jumbotron or main message */}
            <div className={classes.jumbotron}>
              <div className={classes.container}>
                <Typography variant="h2" gutterBottom>
                  {{cookiecutter.hero_title}}
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                  {{cookiecutter.hero_subtitle}}
                </Typography>
                <Divider />
                <Typography variant="caption" component="p" gutterBottom>
                  {{cookiecutter.hero_caption}}
                </Typography>
              </div>
            </div>
            <Grid
              container
              spacing={2}
              direction="column"
              alignContent="center"
              alignItems="center"
            >
              {/* SearchBar */}
              <Grid item>
                <Search suggestions={this.context.searchOptions} />
              </Grid>

              <Grid item></Grid>
            </Grid>
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
                    {% if cookiecutter.hero_abstract == 'lorem-english' -%}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt odit sit, error ad enim iste ullam harum perferendis aliquid ipsam, laboriosam facere nam voluptates. Magnam numquam consequatur debitis corrupti placeat Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt repudiandae velit voluptatem vitae dignissimos aliquid distinctio in. Porro aspernatur obcaecati eos rerum assumenda quae quas natus, delectus excepturi magnam perspiciatis

                    {% elif cookiecutter.hero_abstract == 'lorem-spanish' %}

                    Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
                    {% endif %}
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
                      src="https://via.placeholder.com/150"
                      alt="company_logo1"
                      className={classes.companyLogo}
                    />
                  </Grid>
                  <Grid item>
                    <img
                      src="https://via.placeholder.com/150"
                      alt="company_logo2"
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
                  &copy; {currentYear} {{cookiecutter.affiliation}}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    );
  }
}

SimpleLandingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleLandingPage);
