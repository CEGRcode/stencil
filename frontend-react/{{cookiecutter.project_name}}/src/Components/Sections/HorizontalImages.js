import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = {
  card: {
    maxWidth: 1100
  },
  featureHeatmap: {
    width: 250
  },
  mainContainer: {
    overflow: "scroll"
  },
  sectionTitle: {
    fontSize: 18
  },
  internalHeatmap: {
    width: 230
  }
};

class HorizontalImages extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.card}>
        {/* Header */}
        <Typography
          variant="overline"
          component="h5"
          gutterBottom
          className={classes.sectionTitle}
        >
          {this.props.title}
        </Typography>

        <Paper>
          <CardContent className={classes.sectionHolder}>
            <Grid
              container
              spacing={2}
              direction="row"
              wrap="nowrap"
              justify="flex-start"
              className={classes.mainContainer}
            >
              <Grid item>
                <img
                  src={this.props.data.heatmap1}
                  alt="Heatmap"
                  className={classes.featureHeatmap}
                />
              </Grid>
              <Grid item>
                <img
                  src={this.props.data.heatmap2}
                  alt="Heatmap"
                  className={classes.featureHeatmap}
                />
              </Grid>
              <Grid item>
                <img
                  src={this.props.data.heatmap3}
                  alt="Heatmap"
                  className={classes.featureHeatmap}
                />
              </Grid>

              {/* Stacked Heatmap */}
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <img
                      src={this.props.data.heatmap4}
                      alt="Heatmap"
                      className={classes.internalHeatmap}
                    />
                  </Grid>
                  <Grid item>
                    <img
                      src={this.props.data.heatmap5}
                      alt="Heatmap"
                      className={classes.internalHeatmap}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Stacked Heatmap */}
            </Grid>
          </CardContent>
        </Paper>
      </div>
    );
  }
}

HorizontalImages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HorizontalImages);
