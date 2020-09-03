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
  bottomSection: {},
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

class FeatureHeatmaps extends React.Component {
  // set the imageUrl to the props and when tab is changed
  state = {
    imageUrl: this.props.images
  };

  // Used to update the sample images , when new replicate tab is selected
  componentDidUpdate(prevProps) {
    if (prevProps.images !== this.props.images) {
      this.setState({
        selectedTab: 0,
        imageUrl: this.props.images
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { imageUrl } = this.state;

    return (
      <div className={classes.card}>
        {/* Header */}
        <Typography
          variant="overline"
          component="h5"
          gutterBottom
          className={classes.sectionTitle}
        >
          Feature Heatmaps
        </Typography>

        <Paper>
          <CardContent className={classes.sectionHolder}>
            <Typography component="div">
              <Grid
                container
                spacing={2}
                direction="column"
                wrap="nowrap"
                justify="flex-start"
                className={classes.mainContainer}
              >
                {/* Buffer Section */}
                <Grid item />

                {/* Bottom Section */}
                <Grid item className={classes.bottomSection}>
                  <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={0}
                  >
                    <Grid item>
                      <img
                        src={imageUrl.heatmap1}
                        alt="Heatmap1"
                        className={classes.featureHeatmap}
                      />
                    </Grid>
                    <Grid item>
                      <img
                        src={imageUrl.heatmap2}
                        alt="Heatmap2"
                        className={classes.featureHeatmap}
                      />
                    </Grid>
                    <Grid item>
                      <img
                        src={imageUrl.heatmap3}
                        alt="Heatmap3"
                        className={classes.featureHeatmap}
                      />
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        spacing={1}
                      >
                        <Grid item>
                          <img
                            src={imageUrl.heatmap4}
                            alt="Heatmap4"
                            className={classes.internalHeatmap}
                          />
                        </Grid>
                        <Grid item>
                          <img
                            src={imageUrl.heatmap5}
                            alt="Heatmap5"
                            className={classes.internalHeatmap}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Paper>
      </div>
    );
  }
}

FeatureHeatmaps.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FeatureHeatmaps);
