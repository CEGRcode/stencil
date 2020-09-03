import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

// Help Data and components
const itemStyle = { minWidth: 400, padding: 20, border: "2px solid black" };
const tutorialSteps = [
  {
    label: "Item Description-1",
    content: (
      <React.Fragment>
        <Typography>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, quam.
          At mollitia eveniet repellendus esse amet eaque rerum, porro
          reiciendis nam numquam nihil temporibus laboriosam minima iure illum
          quasi ullam.Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Dolor, quam. At mollitia eveniet repellendus esse amet eaque rerum,
          porro reiciendis nam numquam nihil temporibus laboriosam minima iure
          illum quasi ullam.Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Dolor, quam. At mollitia eveniet repellendus esse amet eaque
          rerum, porro reiciendis nam numquam nihil temporibus laboriosam minima
          iure illum quasi ullam.
        </Typography>
      </React.Fragment>
    ),
    component: <div style={itemStyle}>Help Item-1</div>
  },
  {
    label: "Item Description-2",
    content: (
      <React.Fragment>
        <Typography>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, quam.
          At mollitia eveniet repellendus esse amet eaque rerum, porro
          reiciendis nam numquam nihil temporibus laboriosam minima iure illum
          quasi ullam.Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Dolor, quam. At mollitia eveniet repellendus esse amet eaque rerum,
          porro reiciendis nam numquam nihil temporibus laboriosam minima iure
          illum quasi ullam.Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Dolor, quam. At mollitia eveniet repellendus esse amet eaque
          rerum, porro reiciendis nam numquam nihil temporibus laboriosam minima
          iure illum quasi ullam.
        </Typography>
      </React.Fragment>
    ),
    component: <div style={itemStyle}>Help Item-2</div>
  },
  {
    label: "Item Description-3",
    content: (
      <React.Fragment>
        <Typography>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, quam.
          At mollitia eveniet repellendus esse amet eaque rerum, porro
          reiciendis nam numquam nihil temporibus laboriosam minima iure illum
          quasi ullam.Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Dolor, quam. At mollitia eveniet repellendus esse amet eaque rerum,
          porro reiciendis nam numquam nihil temporibus laboriosam minima iure
          illum quasi ullam.Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Dolor, quam. At mollitia eveniet repellendus esse amet eaque
          rerum, porro reiciendis nam numquam nihil temporibus laboriosam minima
          iure illum quasi ullam.
        </Typography>
      </React.Fragment>
    ),
    component: <div style={itemStyle}>Help Item-3</div>
  },
  {
    label: "Item Description-4",
    content: (
      <React.Fragment>
        <Typography>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, quam.
          At mollitia eveniet repellendus esse amet eaque rerum, porro
          reiciendis nam numquam nihil temporibus laboriosam minima iure illum
          quasi ullam.Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Dolor, quam. At mollitia eveniet repellendus esse amet eaque rerum,
          porro reiciendis nam numquam nihil temporibus laboriosam minima iure
          illum quasi ullam.Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Dolor, quam. At mollitia eveniet repellendus esse amet eaque
          rerum, porro reiciendis nam numquam nihil temporibus laboriosam minima
          iure illum quasi ullam.
        </Typography>
      </React.Fragment>
    ),
    component: <div style={itemStyle}>Help Item-4</div>
  },
  {
    label: "Item Description-5",
    content: (
      <React.Fragment>
        <Typography>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, quam.
          At mollitia eveniet repellendus esse amet eaque rerum, porro
          reiciendis nam numquam nihil temporibus laboriosam minima iure illum
          quasi ullam.Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Dolor, quam. At mollitia eveniet repellendus esse amet eaque rerum,
          porro reiciendis nam numquam nihil temporibus laboriosam minima iure
          illum quasi ullam.Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Dolor, quam. At mollitia eveniet repellendus esse amet eaque
          rerum, porro reiciendis nam numquam nihil temporibus laboriosam minima
          iure illum quasi ullam.
        </Typography>
      </React.Fragment>
    ),
    component: <div style={itemStyle}>Help Item-5</div>
  }
];

// ///////////////////////////////////////////////////////////////////

// Component styles.
const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    background: "#fafafa"
  },
  mainHeader: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(5)
  },
  content: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    maxWidth: "45vw"
  },
  leftSection: {
    maxWidth: "70vw",
    marginRight: 10,
    marginLeft: 20
  },
  rightSection: {
    maxHeight: 780,
    overflow: "scroll"
  },
  stepper: {
    width: 300
  }
}));

export default function HelpStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.mainHeader}>
        <Typography variant="h4" gutterBottom>
          Website Overview & Usage
        </Typography>
      </Paper>
      <br />
      <MobileStepper
        className={classes.stepper}
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            color="primary"
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            color="primary"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <br />
      <Grid container direction="row" wrap="nowrap">
        <Grid item className={classes.leftSection}>
          {tutorialSteps[activeStep].component}
        </Grid>
        <Grid item className={classes.rightSection}>
          <Paper square elevation={0} className={classes.header}>
            <Typography variant="h6" component="h6">
              {tutorialSteps[activeStep].label}
            </Typography>
          </Paper>
          <Paper square elevation={0}>
            <Divider />
            <Typography component="div" className={classes.content}>
              {tutorialSteps[activeStep].content}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
