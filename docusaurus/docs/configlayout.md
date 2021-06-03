---
sidebar_position: 5
id: layout
title: Configure layouts
sidebar_label: Configure layouts
---

---

## STENCIL layouts
- STENCIL layouts are defined in */frontend/src/Config.js*
- The constant value 'layoutFormat' defines all available layouts in STENCIL
- The overall structure is in JSON
- There are 5 variables that can determine the organization of the layout.
  + layOut
  + direction
  + plotSizes
  + spacing
  + plotTitles

### layout (Required)
 - Bracket delimited format with the stepID's bracketed. These stepID's correspond to the JSON payloads and place the data relative to the other stepID's
 - Placing two stepID's within an extra set of brackets activates a radio button system by which either stepID is visually toggled

**Simple layout:**
```
layOut: [[0], [1]],
```
**Complicated layout:**
```
layOut: [ [[0,1]],[2],[3],[4] ],
```

### plotTitles (Optional)
 - Used when stepID's are in radio button mode
 - Provides the titles for the radio buttons
 - Uses the stepID to place the correct titles

**Example:**
```
plotTitles: {0:"Forward", 1:"Reverse"}
```

### direction (Optional)
 - This variable determines whether the stepID's are oriented along the X (column) or Y (row) axis
 - Column aligned is the default when not specified

**Example:**
```
direction: "column",
```
**Alternative:**
```
direction: "row",
```

### plotSizes (Optional)
 - This variable allows a user to set the individual sizes for each stepID within a layOut
 - This is useful when plots should be visualized at different sizes.
 - By default, a plot is set to 600 x 500 pixels when not explicitly undefined

**Example:**
```
plotSizes: {
  0:[800,600],
}
```

### spacing (Optional)
 - This variable sets the spacing between stepIDs

**Example:**
```
spacing: 8,
```

## Example layoutFormat

```
const layoutFormat = {
  SingleChart: {
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
};
```
