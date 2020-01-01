window.onload = function onLoad() {
  var myChart = {
    "type": "bar",
    "scale-x": {
      "zooming": "true"
    },
    "scale-y": {
      "zooming": "false"
    },
    "preview": {
      "visible": "true"
    },
    "series": [
      {
        "styles":["red","orange","yellow","green","blue","purple"],
        "values": [
          1,
          3,
          4,
          6,
          8,
          7
        ]
      },
      {
        "values": [
          2,
          5,
          3,
          7,
          5,
          4
        ]
      }
    ]
  };
  zingchart.render({
    id: "salesChart",
    data: myChart,
    height: 480,
    width: 400
  });
};
