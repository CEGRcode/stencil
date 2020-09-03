import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function HeaderInfo(props) {
  return (
    <CardContent>
      <Grid container spacing={1} alignItems={"center"}>
        <Grid item sm={"auto"}>
          <Typography gutterBottom variant="h4" component="h2">
            {/* Target */}
            {props.data.target}

            {/* featureName */}
            {props.data.featureName ? (
              <Typography component="p" variant="caption">
                <strong>Systematic Name: </strong>
                {props.data.featureName}
              </Typography>
            ) : (
              ""
            )}

            {/* featureType */}
            {props.data.alias ? (
              <Typography component="p" variant="caption">
                <strong>Feature Type: </strong> {props.data.featureType}
              </Typography>
            ) : (
              ""
            )}

            {/* alias */}
            {props.data.alias ? (
              <Typography component="p" variant="caption">
                <strong>Aliases: </strong> {props.data.alias}
              </Typography>
            ) : (
              ""
            )}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems={"center"}>
        <Grid item sm={"auto"}>
          {/* description */}
          <Typography component="p" variant="body1">
            {props.data.description ? props.data.description : "-"}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  );
}
export default HeaderInfo;
