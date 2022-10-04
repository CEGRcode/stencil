import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import { CardContent, Typography, Grid, Paper, Tabs, Tab, Radio, RadioGroup} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import IGVBrowser from "../SubComponents/IGVbrowser";
import BasicTable from "../Tables/BasicTable_stencil";
import LinePlot from "../Charts/LinePlot_stencil";
import BarChart from "../Charts/BarChart_stencil";
import ScatterPlot from "../Charts/ScatterPlot_stencil";
import HeatMap from "../Charts/Heatmap_stencil";
import SwarmPlot from "../Charts/SwarmPlot_stencil";
import NetworkPlot from "../Charts/NetworkPlot_stencil";
import StreamPlot from "../Charts/StreamPlot_stencil";
import FunnelPlot from "../Charts/FunnelPlot_stencil";
import Treemap from "../Charts/Treemap_stencil";
import RadarPlot from "../Charts/RadarPlot_stencil";
import ChordPlot from "../Charts/ChordPlot_stencil";

const styles = {
  card: {
    maxWidth: 1100
  },
  sectionTitle: {
    fontSize: 18
  }
};

const Wire = ({ children, ...props }) => children(props);

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
        case "swarmplot":
          //console.log(item);
          //console.log(item.preLoadData);
          //console.log(item.preLoadData.chartOptions);
          return (sizes===undefined)?(
            <Grid item key={stepId}>
            <SwarmPlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={600} height={500} />
            </Grid>):(
            <Grid item key={stepId}>
            <SwarmPlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={sizes[0]} height={sizes[1]} />
            </Grid>
          );
        case "networkplot":
          //console.log(item);
          //console.log(item.preLoadData);
          //console.log(item.preLoadData.chartOptions);
          return (sizes===undefined)?(
            <Grid item key={stepId}>
            <NetworkPlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={600} height={500} />
            </Grid>):(
            <Grid item key={stepId}>
            <NetworkPlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={sizes[0]} height={sizes[1]} />
            </Grid>
          );
        case "streamplot":
          //console.log(item);
          //console.log(item.preLoadData);
          //console.log(item.preLoadData.chartOptions);
          return (sizes===undefined)?(
            <Grid item key={stepId}>
            <StreamPlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={600} height={500} />
            </Grid>):(
            <Grid item key={stepId}>
            <StreamPlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={sizes[0]} height={sizes[1]} />
            </Grid>
          );
        case "funnelplot":
          //console.log(item);
          //console.log(item.preLoadData);
          //console.log(item.preLoadData.chartOptions);
          return (sizes===undefined)?(
            <Grid item key={stepId}>
            <FunnelPlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={600} height={500} />
            </Grid>):(
            <Grid item key={stepId}>
            <FunnelPlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={sizes[0]} height={sizes[1]} />
            </Grid>
          );
        case "treemap":
          //console.log(item);
          //console.log(item.preLoadData);
          //console.log(item.preLoadData.chartOptions);
          return (sizes===undefined)?(
            <Grid item key={stepId}>
            <Treemap chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={600} height={500} />
            </Grid>):(
            <Grid item key={stepId}>
            <Treemap chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={sizes[0]} height={sizes[1]} />
            </Grid>
          );
        case "radarplot":
          //console.log(item);
          //console.log(item.preLoadData);
          //console.log(item.preLoadData.chartOptions);
          return (sizes===undefined)?(
            <Grid item key={stepId}>
            <RadarPlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={600} height={500} />
            </Grid>):(
            <Grid item key={stepId}>
            <RadarPlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={sizes[0]} height={sizes[1]} />
            </Grid>
          );
        case "chordplot":
          //console.log(item);
          //console.log(item.preLoadData);
          //console.log(item.preLoadData.chartOptions);
          return (sizes===undefined)?(
           <Grid item key={stepId}>
           <ChordPlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={600} height={500} />
           </Grid>):(
           <Grid item key={stepId}>
           <ChordPlot chartData={item.preLoadData?item.preLoadData.chartData: {}} chartOptions={item.preLoadData?item.preLoadData.chartOptions: {}} width={sizes[0]} height={sizes[1]} />
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

  RadioButtonGroup = (props) => {
    let plottitle = props.plottitle;
    let stepId = props.stepId;
    let thisTab= props.thisTab;
    let plotsizes = props.plotsizes;

    let rgroup = "radioGroup" + String(thisTab[stepId[0]]["tabId"])

    let selectedStepId = this.state[rgroup];
//    console.log(this.state["selectedTab"]);
//    console.log(thisTab);
//    console.log(stepId);
    if (selectedStepId === undefined){
      selectedStepId = stepId[0];
    }
    //console.log(selectedStepId);

    let handleRadioChange = event => {
      this.setState({ [rgroup]: event.target.value });
      //console.log(rgroup + "\t" + event.target.value);
    };

    return (
      <Grid item>
        <img src={thisTab[selectedStepId].URL} width={plotsizes[selectedStepId][0]} height={plotsizes[selectedStepId][1]} alt=""/>
        <Grid container spacing={3} direction="row" justifyContent="space-evenly">
          <RadioGroup row onChange={handleRadioChange} name={rgroup}>
            {
              stepId.map(stepIndex=>{
                return (
                  <Wire key={Math.random().toString(36).substr(10, 17)} value={stepIndex}>
                    {(props) => (
                        <FormControlLabel
                          checked={selectedStepId === stepIndex}
                          control={<Radio />}
                          name={rgroup}
                          color="default"
                          label={plottitle[stepIndex]}
                          {...props}
                        />
                    )}
                  </Wire>
                )
              } )
            }
          </RadioGroup>
        </Grid>
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
                  <Grid container key={Math.random().toString(36).substr(10, 17)} spacing={spacing} direction="row" wrap="nowrap" justifyContent="flex-start" className={classes.mainContainer}>
                    {
                      row.map(stepId=>{
                        if (Array.isArray(stepId)) {
                          return ( <this.RadioButtonGroup key={Math.random().toString(36).substr(10, 17)} plottitle={plottitle} stepId={stepId} thisTab={thisTab} plotsizes={plotsizes} /> )
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
              <Grid container direction="row" spacing={spacing} justifyContent="center">
             {
              //show the layout by column
              tablayout.map(row=>{
                return (
                  <Grid item key={Math.random().toString(36).substr(10, 17)}>
                  <Grid container spacing={spacing} direction="column" wrap="nowrap" justifyContent="flex-start" className={classes.mainContainer}>
                    {
                      row.map(stepId=>{
                        //console.log(row);
                        if (Array.isArray(stepId)) {
                          return ( <this.RadioButtonGroup key={Math.random().toString(36).substr(10, 17)} plottitle={plottitle} stepId={stepId} thisTab={thisTab} plotsizes={plotsizes} /> )
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
