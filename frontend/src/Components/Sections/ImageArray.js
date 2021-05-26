import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import { CardContent, Typography, Grid, Paper, Tabs, Tab, Radio} from "@material-ui/core";

import IGVBrowser from "../SubComponents/IGVbrowser";
import BasicTable from "../Tables/BasicTable_stencil";
import LinePlot from "../Charts/LinePlot_stencil";
import BarChart from "../Charts/BarChart_stencil";
import ScatterPlot from "../Charts/ScatterPlot_stencil";
import HeatMap from "../Charts/Heatmap_stencil";

const styles = {
  card: {
    maxWidth: 1100
  },
  sectionTitle: {
    fontSize: 18
  }
};

class ImageArray extends React.Component {

  state = {
    selectedTab: 0
  };

  // handling tab changes
  handleChange = (event, selectedTab) => {
    this.setState({
      selectedTab: selectedTab
    });
  };

   //function for generating plot
   Plot  =  (props) => {
    let item=props.imgObj;
    let sizes = props.sizes;
    let stepId = (item!==undefined)?(item.stepId):("X");

    //console.log(item);
    //console.log(sizes);
    //console.log(stepId);

    if(item===undefined){
      return (
        <Grid item key={stepId}>
              <img
                src={"../na.png"}
                width={sizes[0]}
                height={sizes[1]}
                alt=""
              />
        </Grid>
      )

    }
    else {
      switch (item.dataType.toLowerCase()) {
        case "image":
        case "jpg":
        case "png":
        case "svg":
          return (sizes===undefined)?(
            <Grid item key={stepId}>
              <img src={item.URL} alt={item.dataLabel} title={item.dataLabel}  />
              </Grid>):(
            <Grid item key={stepId}>
              <img src={item.URL} alt={item.dataLabel} title={item.dataLabel} width={sizes[0]} height={sizes[1]} />
              </Grid>)
          ;
        case "igvtrack":
          //console.log(item);
          //console.log(item.preLoadData);
          //console.log(item.preLoadData.trackData);
          return (sizes===undefined)?(
            <Grid item key={stepId}>
              <IGVBrowser trackData={item.preLoadData.trackData} trackOptions={item.preLoadData.trackOptions} width={500} height={800}/>
              </Grid>):(
            <Grid item key={stepId}>
              <IGVBrowser trackData={item.preLoadData.trackData} trackOptions={item.preLoadData.trackOptions} width={sizes[0]} height={sizes[1]} />
              </Grid>)
          ;
        case "basictable":
          //console.log(item);
          //console.log(item.preLoadData);
          //console.log(item.preLoadData.tableData);
          return (sizes===undefined)?(
            <Grid item key={stepId}>
              <BasicTable tableData={item.preLoadData.tableData} width={500} height={800}/>
              </Grid>):(
            <Grid item key={stepId}>
              <BasicTable tableData={item.preLoadData.tableData} width={sizes[0]} height={sizes[1]} />
              </Grid>)
          ;
        case "lineplot":
          //console.log(item);
          //console.log(item.preLoadData);
          return (sizes===undefined)?(<Grid item key={stepId}>
            <LinePlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={600} height={500} />
            </Grid>):(
            <Grid item key={stepId}>
            <LinePlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={sizes[0]} height={sizes[1]} />
            </Grid>
          );
        case "barchart":
          //console.log(item);
          //console.log(item.preLoadData);
          //console.log(item.preLoadData.chartOptions);
          return (sizes===undefined)?(<Grid item key={stepId}>
            <BarChart chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={600} height={500} />
            </Grid>):(
            <Grid item key={stepId}>
            <BarChart chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={sizes[0]} height={sizes[1]} />
            </Grid>
          );
        case "scatterplot":
          //console.log(item);
          //console.log(item.preLoadData);
          //console.log(item.preLoadData.chartOptions);
          return (sizes===undefined)?(
            <Grid item key={stepId}>
            <ScatterPlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={600} height={500} />
            </Grid>):(
            <Grid item key={stepId}>
            <ScatterPlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={sizes[0]} height={sizes[1]} />
            </Grid>
          );
        case "heatmap":
          //console.log(item);
          //console.log(item.preLoadData);
          //console.log(item.preLoadData.chartOptions);
          return (sizes===undefined)?(
            <Grid item key={stepId}>
            <HeatMap chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={600} height={500} />
            </Grid>):(
            <Grid item key={stepId}>
            <HeatMap chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={sizes[0]} height={sizes[1]} />
            </Grid>
          );
        default:
        return(
          <Grid item>
            dataType not known: {item.dataType}
          </Grid>
        )
      };
    }
  }
  // end of show plot function

  RadioGroup = (props) => {
    let radioButtonGroupIndex = props.radioButtonGroupIndex;
    let plottitle = props.plottitle;
    let stepId = props.stepId;
    let thisTab= props.thisTab;
    let plotsizes = props.plotsizes;
    let rgroup = "radioGroup" + String(radioButtonGroupIndex)

    let handleRadioChange = event => {
      this.setState({ [rgroup]: event.target.value });
    };

    let seletedStepId = this.state[rgroup];

    if (seletedStepId === undefined){
      seletedStepId =stepId[0];
    }

    return (
      <Grid item>
        <Grid container spacing={3} direction="row" justify="space-evenly">
          {
            stepId.map(stepIndex=>{
              return (
                <Grid item key={Math.random().toString(36).substr(10, 17)}>
                  <Radio checked={seletedStepId === stepIndex} onChange={handleRadioChange} value= {stepIndex} name= {rgroup} color="default"/>
                  {plottitle[stepIndex]}
                </Grid>
              )
            } )
          }
        </Grid>
        { <this.Plot imgObj={thisTab[seletedStepId]} sizes={plotsizes[seletedStepId]} /> }
    </Grid>
    )
  }

  render() {
    const { classes } = this.props;
    const { selectedTab } = this.state;
    const tabExtender = { scrollable: classes.scroller };

    let tabnames = [];
    let showTag = false;
    let count = 0;
    let direction = this.props.direction;
    let spacing = this.props.spacing;

    if (this.props.tabtitles.length > 1)
    {
      showTag = true;
      for (let t in this.props.tabtitles) {
        tabnames.push(<Tab label={this.props.tabtitles[t]} key={count} />);
        count++;
      }
    }
    let tablayout = this.props.layout;
    if (tablayout.length===0) {
      tablayout = [Object.keys(this.props.data[selectedTab]).sort()];
    }

    let plotsizes = this.props.plotsizes;
    let plottitle = this.props.plottitles;
    let thisTab = this.props.data[selectedTab];
    let radioButtonGroupIndex = 0;
    //console.log(tablayout);

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

        {
        //select tab
         showTag && (
            <Tabs
              value={selectedTab}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="on"
              classes={tabExtender}
            >
              {tabnames}
            </Tabs>
        ) }
        {
          (direction.toLowerCase() === "row")? (
            <CardContent className={classes.sectionHolder}>
            {
              //show the layout by rows
              tablayout.map(row=>{
                return (
                  <Grid container key={Math.random().toString(36).substr(10, 17)} spacing={spacing} direction="row" wrap="nowrap" justify="flex-start" className={classes.mainContainer}>
                    {
                      row.map(stepId=>{
                        if (Array.isArray(stepId)) {
                          radioButtonGroupIndex = radioButtonGroupIndex +1;
                          return ( <this.RadioGroup key={Math.random().toString(36).substr(10, 17)} radioButtonGroupIndex={radioButtonGroupIndex}  plottitle={plottitle} stepId={stepId} thisTab={thisTab} plotsizes={plotsizes} /> )
                        }
                        else {
                          return ( <this.Plot key={Math.random().toString(36).substr(10, 17)} imgObj={thisTab[stepId]} sizes={plotsizes[stepId]} /> )
                        }
                      })
                    }
                  </Grid>
                )
              })
            }
          </CardContent>
          ):(
            <CardContent className={classes.sectionHolder}>
              <Grid container direction="row" spacing={spacing} justify="center">
             {
              //show the layout by column
              tablayout.map(row=>{
                return (
                  <Grid item key={Math.random().toString(36).substr(10, 17)}>
                  <Grid container spacing={spacing} direction="column" wrap="nowrap" justify="flex-start" className={classes.mainContainer}>
                    {
                      row.map(stepId=>{
                        if (Array.isArray(stepId)) {
                          radioButtonGroupIndex = radioButtonGroupIndex +1;
                          return ( <this.RadioGroup key={Math.random().toString(36).substr(10, 17)} radioButtonGroupIndex={radioButtonGroupIndex}  plottitle={plottitle} stepId={stepId} thisTab={thisTab} plotsizes={plotsizes} /> )
                        } else {
                          return ( <this.Plot key={Math.random().toString(36).substr(10, 17)} imgObj={thisTab[stepId]} sizes={plotsizes[stepId]} /> )
                        }
                      })
                    }
                  </Grid>
                  </Grid>
                )
              })
            }
              </Grid>
            </CardContent>
          )
        }

        </Paper>
      </div>
    );
  }
}

ImageArray.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageArray);
