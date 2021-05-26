// App Configuration

const settings = {
  apiURL: "http://localhost:8081",
  SSOURL: "http://localhost",
  librariesEndPoint: "/libraries",
  libraryPageEndPoint: "/libraries/dbid",
  trackHubPrefix: "http://genome.ucsc.edu/cgi-bin/hgTracks?db=sacCer3&hubUrl="
};

const layoutFormat = {
  SingleChart: {
    layOut: [[0]],
    direction: "column",
    plotSizes: {
      0:[800,600],
    }
  },

  SingleChart_2: {
    layOut: [[0]],
    direction: "column",
    plotSizes: {
      0:[800,600],
    }
  },

  SingleChart_3: {
    layOut: [[0]],
    direction: "column",
    plotSizes: {
      0:[800,600],
    }
  },

  SingleChart_4: {
    layOut: [[0]],
    direction: "column",
    plotSizes: {
      0:[800,600],
    }
  },

  DoubleChart: {
    layOut: [[0], [1]],
    direction: "column",
    plotSizes: {
      0:[800,600],
      1:[800,600]
    }
  },

  ENCODE_Feature: {
    layOut: [ [0],[1],[2],[3] ],
    direction: "column",
    plotSizes: {
      0:[400,400],
      1:[200,500],
      2:[200,500],
      3:[200,500],
    },
  },

  ENCODE_Motif: {
    layOut: [ [[0,1]],[2],[3],[4],[5],[6] ],
    direction: "column",
    plotSizes: {
      0:[325,150],
      1:[325,150],
      2:[600,400],
      3:[200,500],
      4:[225,500],
      5:[225,500],
      6:[225,500]
    },
    plotTitles: {0:"Forward", 1:"Reverse"}
  },

  Transcribed_Features: {
    layOut: [ [0],[1],[2],[3],[4],[5],[6],[7] ],
    direction: "column",
    spacing: 2,
    plotSizes: {
      0:[300,300],
      1:[300,300],
      2:[300,300],
      3:[190,410],
      4:[190,410],
      5:[190,410],
      6:[190,410],
      7:[190,410]
    }
  },

  Transcribed_Noncoding: {
    layOut: [ [0],[1],[2] ],
    direction: "column",
    plotSizes: {
      0:[200,400],
      1:[200,400],
      2:[200,400]
    },
  },

  NonTranscribed: {
    layOut: [ [0],[1],[2] ],
    direction: "column",
    plotSizes: {
      0:[200,300],
      1:[200,300],
      2:[200,300]
    },
  },

  Motif_Analysis: {
    layOut: [ [[0,1]],[2],[3],[4] ],
    direction: "column",
    spacing: 8,
    plotSizes: {
      0:[300,150],
      1:[300,150],
      2:[400,300],
      3:[250,500],
      4:[300,500]
    },
    plotTitles: {0:"Forward", 1:"Reverse"}
  },

  Chexmix_Subtype: {
    layOut: [ [[0,1]],[2],[3],[4],[5],[6] ],
    direction: "column",
    spacing: 2,
    plotSizes: {
      0:[350,150],
      1:[350,150],
      2:[500,300],
      3:[200,500],
      4:[200,500],
      5:[200,500],
      6:[400,400]
    },
    plotTitles: {0:"Forward", 1:"Reverse"}
  },

  Mammalian_Feature: {
    layOut: [ [0],[1],[2] ],
    direction: "column",
    plotSizes: {
      0:[500,500],
      1:[250,500],
      2:[250,500]
    },
  }

};

module.exports = {
  settings: settings,
  layoutFormat: layoutFormat
};
