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
            Library: {props.data.libraryId}<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            Sample: {props.data.sampleId ? props.data.sampleId : "N/A"}
          </Typography>

          {/* group tag */}
          <Typography component="p" variant="body1">
            {props.data.libraryDescription ? props.data.libraryDescription : "-"}
          </Typography>

        </Grid>
      </Grid>

    </CardContent>
  );
}
export default HeaderInfo;
