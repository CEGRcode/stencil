import React, { Component } from "react";
import PropTypes from "prop-types";

import igv from "igv";

var igvStyle = {
  paddingTop: '10px',
  paddingBottom: '10px',
  margin: '8px',
  border: '1px solid lightgray',
  width: '1000px'
}

class IGVbrowser extends Component {

    componentDidMount() {
      var igvContainer = document.getElementById('igv-div');
      var igvOptions = {
        ...(this.props.trackOptions['genome']?{genome: this.props.trackOptions['genome']}:{ genome: 'hg19' }),
        ...(this.props.trackOptions['locus']?{locus: this.props.trackOptions['locus']}:{ }),
        tracks: this.props.trackData
      };
      return igv.createBrowser(igvContainer, igvOptions);
    }

    render() {
      return (
          <div id='igv-div' style={igvStyle}> </div>
      );
    }
}

IGVbrowser.propTypes = {
  classes: PropTypes.object
};

export default IGVbrowser;
