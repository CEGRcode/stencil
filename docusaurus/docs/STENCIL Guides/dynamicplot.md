---
sidebar_position: 2
id: dynamic
title: Dynamic plot JSON format
sidebar_label: Dynamic plot JSON format
---

---

- chartOptions allow for dynamic visualization of the data
- Extended details on chartOptions are available at https://nivo.rocks/

## Scatterplot JSON

**Example payload:**
```
{
	"chartOptions": {
		"margin": {
			"top": 40,
			"right": 60,
			"bottom": 70,
			"left": 60
		},
		"axisTop": {
			"legend": "PCA Plot for Treatment: K562 vs HepG2",
			"tickValues": []
		},
		"axisBottom": {
			"orient": "bottom",
			"tickSize": 5,
			"tickPadding": 5,
			"tickRotation": 0,
			"legend": "PC1: 98% variance",
			"legendPosition": "middle",
			"legendOffset": 46
		},
		"axisLeft": {
			"orient": "bottom",
			"tickSize": 5,
			"tickPadding": 5,
			"tickRotation": 0,
			"legend": "PC2: 1% variance",
			"legendPosition": "middle",
			"legendOffset": -40
		},
		"xScale": { "type": "linear", "min": -151, "max": 151	},
		"yScale": {	"type": "linear",	"min": -21,	"max": 21	},
		"blendMode": "multiply",
		"nodeSize": 10
	},
	"chartData": [
		{
			"id": "HepG2 Sample1-Wold",
			"data": [{
				"color": "#ff0000",
				"x": -97.631,
				"y": 3.5564
			}]
		},  
		{
			"id": "K562 Sample1-Wold",
			"data": [{
				"color": "#0000ff",
				"x": 99.9177,
				"y": 15.3354
			}]
		}
	]
}
```

## Barchart JSON

**Example payload:**
```
{
  "chartOptions": {
    "keys": ["freq"],
    "indexBy": "p_values",
    "margin": { "top": 40, "right": 10, "bottom": 50, "left": 60 },
    "axisBottom": {
      "orient": "bottom",
      "tickSize": 5,
      "tickPadding": 5,
      "tickRotation": 0,
      "legend": "p-values",
      "legendPosition": "middle",
      "legendOffset": 35
    },
    "axisLeft": {
      "orient": "bottom",
      "tickSize": 5,
      "tickPadding": 5,
      "tickRotation": 0,
      "legend": "Frequency",
      "legendPosition": "middle",
      "legendOffset": -50
    },
    "axisTop": {
      "legend": "Histogram of p−values for: K562 vs HepG2",
      "tickValues": []
    },
    "colors": "#00ffff",
    "borderColor": "#000000",
		"borderWidth": 1,
		"padding": 0,
		"innerPadding": 1
  },
	"chartData": [
  {
		"p_values": "0.01",
		"freq": 10790
	}, {
		"p_values": "0.15",
		"freq": 259
	}, {
		"p_values": "0.31",
		"freq": 233
	}, {
		"p_values": "0.45",
		"freq": 207
	}, {
		"p_values": "0.59",
		"freq": 178
	}, {
		"p_values": "0.75",
		"freq": 158
	}, {
		"p_values": "0.99",
		"freq": 123
	}]
}
```

## Heatmap JSON

**Example payload:**
```
{
	"chartOptions": {
		"keys": [ "HepG2 Sample1-Wold",	"K562 Sample1-Wold" ],
		"indexBy": "samples",
		"colors": "RdBu",
		"enableLabels": false,
		"margin": {	"top": 30,	"right": 40, "bottom": 85, "left": 20	},
		"axisBottom": {
			"orient": "bottom",
			"tickSize": 5,
			"tickPadding": 5,
			"tickRotation": -25,
			"legendOffset": 36
		},
		"axisRight": {
			"orient": "right",
			"tickSize": 5,
			"tickPadding": 5,
			"tickRotation": 0,
			"legend": "",
			"legendPosition": "middle",
			"legendOffset": -120
		},
		"axisTop": {
			"legend": "Sample-to-sample distance",
			"tickValues": []
		},
		"hoverTarget": "cell",
		"cellHoverOthersOpacity": 0.25,
		"cellOpacity": 1
	},
	"chartData": [{
		"samples": "HepG2 Sample1-Wold",
		"HepG2 Sample1-Wold": 0.0,
		"K562 Sample1-Wold": 611.135
	},{
		"samples": "K562 Sample1-Wold",
		"HepG2 Sample1-Wold": 611.135,
		"K562 Sample1-Wold": 0.0
	}]
}
```

## Lineplot JSON

**Example payload:**
```
{
    "chartOptions": {
			"colors": ["#0000FF", "#FF0000"],
			"enableArea": true,
			"areaOpacity": 0.75,

			"xScale": { "type": "linear", "stacked": false, "min": -100, "max": "auto" },
			"yScale": { "type": "linear", "stacked": false, "min": "auto", "max": "auto" },
			"axisBottom": { "orient": "bottom", "tickSize": 5, "tickPadding": 5, "tickRotation": 0,	"legend": "Distance from midpoint (bp)", "legendOffset": 46, "legendPosition": "middle" },
			"axisLeft": { "orient": "left", "tickSize": 5, "tickPadding": 5, "tickRotation": 0, "legend": "Occupancy", "legendOffset": -50, "legendPosition": "middle" }
    },
    "chartData": [{
        "id": "Forward",
        "data": [
        {
            "x": -5.0,
            "y": -4.052
        },
        {
            "x": -4.0,
            "y": -6.469
        },
        {
            "x": -3.0,
            "y": -8.321
        },
        {
            "x": -2.0,
            "y": -8.081
        },
        {
            "x": -1.0,
            "y": -10.390
        },
        {
            "x": 0.0,
            "y": -5.369
        },
        {
            "x": 1.0,
            "y": -4.792
        },
        {
            "x": 2.0,
            "y": -3.714
        },
        {
            "x": 3.0,
            "y": -3.158
        },
        {
            "x": 4.0,
            "y": -4.367
        },
        {
            "x": 5.0,
            "y": -6.066
        }]
    }]
}
```
