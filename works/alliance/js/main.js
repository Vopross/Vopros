window.onload = function onLoad() {

  var endPoint = 0.8;
  var endPointBlue = 0.5;
  var duration = endPoint * 1500;
  var durationBlue = endPointBlue * 1500;
  var pointMarker = endPoint * 100;
  var pointMarkerBlue = endPointBlue * 100;
  var bar = new ProgressBar.Path('#graph-path', {
    duration: duration
  });
  var barBlue = new ProgressBar.Path('#graph-path-blue', {
    duration: durationBlue
  });

  bar.set(0);
  bar.animate(endPoint);  // Number from 0.0 to 1.0
  barBlue.set(0);
  barBlue.animate(endPointBlue);  // Number from 0.0 to 1.0

  var path = document.getElementById('graph-path')
  var pathBlye = document.getElementById('graph-path-blue')
  var obj = document.getElementById('obj');
  var objBlue = document.getElementById('obj-blue');
  // Length of path
  var pathLength = Math.floor( path.getTotalLength() );
  console.log(objBlue);
  function moveObj(prcnt, object)
  {
    prcnt = (prcnt*pathLength) / 100;

    // Get x and y values at a certain point in the line
    pt = path.getPointAtLength(prcnt);
    pt.x = Math.round(pt.x/2.53);
    pt.y = Math.round(pt.y/2.53);

    object.style.webkitTransform = 'translate3d('+pt.x+'px,'+pt.y+'px, 0)';
  }


  // Initialize
  moveObj(0, obj);
  moveObj(0, objBlue);

  function animationHandler(prcnt, pointMarker, object) {
    moveObj(prcnt, object);
    if(prcnt < pointMarker)
    {
      animationTimer = setTimeout(function() {
        animationHandler(prcnt+1, pointMarker, object);
      },8)
    }
  }

  animationHandler(0, pointMarker, obj);
  animationHandler(0, pointMarkerBlue, objBlue);


  /*---------- charts ------------*/

  var salesConfig = {
    "type": "bar",
    "plot": {
      "bar-space": 20,
      "border-radius-top-left": 10,
      "border-radius-top-right": 10,
    },
    "scale-x": {
      "zooming": "true",
      "values":["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
      "line-color":"#D9D7D5",
      "line-width":"0px",
      "zoom-to":[7,11],
      "tick":{
          "visible":false
      },
      "item":{
          "margin-top":"100px",
         "color":"#c0c0c0",
         "font-size":"14px",
       }
    },
    "scale-y": {
      "values":"0:300:50",
      "zooming": "false",
      "line-width":"0px",
      "guide":{
         "visible":false,
       },
       "tick":{
          "visible":false
       },
       "item":{
          "color":"#c0c0c0",
          "font-size":"13px",
        }
    },
    "preview": {
      "visible": "true",
      "border-width":0,
      "preserve-zoom":true,
      "mask":{
          "backgroundColor":"white",
          "alpha":0.5
      },
      "y":"85%",
    },
    "plotarea":{
      "margin":"50px 45px 140px 45px"
    },
    "series":[
      {
          "type":"bar",
          "text":"1",
          "values":[150,100,40,130,60,234,56,243,76,43,123,32],
          "background-color":"#abb1ca #d9dce7",
          "bar-width":"22px",
          "hover-state":{
              "visible":false
          }
      },
      {
          "type":"bar",
          "text":"2",
          "values":[300,200,40,50,40,45,32,123,211,43,54,122],
          "background-color":"#d8d8d8",
          "bar-width":"22px",
          "hover-state":{
              "visible":false
          }
      },
      {
          "type":"bar",
          "text":"3",
          "values":[40,200,50,60,300,232,122,123,54,32,122,43],
          "background-color":"#76d99f",
          "bar-width":"22px",
          "hover-state":{
              "visible":false
          }
      },
    ]
  };
  zingchart.render({
    id: "salesChart",
    data: salesConfig,
    height: 450,
    width: 1070
  });

  /* Chart 2 */

  var pieChartConfig = {
  "graphset":[

    {
      "type":"pie",
      "backgroundColor": "#fff",
      "plotarea":{
        "margin":"40"
      },
      "scale":{
        "sizeFactor":1
      },
      "plot":{
        "valueBox":{
          "visible":false
        },
        "refAngle":270,
        "angleStart":270,
        "detach":false,
        "slice":"100%",
        "totals":[100],
        "animation":{
          "speed":1000,
          "effect":2,
          "method":0
        },
        "hoverState":{
          "visible":false
        }
      },
      "series":[
        {
          "size":"97%",
          "values":[67],
          "backgroundColor":"#a2aac7",
          "borderWidth":24,
          "borderColor":"#a2aac7",
          "text":"Move",
        },
        {
          "size":"68%",
          "values":[75],
          "backgroundColor":"#89d5b2",
          "borderWidth":24,
          "borderColor":"#89d5b2",
          "text":"Exercise",
        },
        {
          "size":"40%",
          "values":[70],
          "backgroundColor":"#ead8bc",
          "borderWidth":24,
          "borderColor":"#ead8bc",
          "text":"Stand",
        },

      ],
      "shapes":[
        {
          "type":"line",
          "lineWidth":10,
          "lineCap":"round",
          "lineColor":"#fff",
          "points":[
            [0,0],
            [0,100]
          ],
          "offsetX":118,
          "offsetY":10
        },
      ]
    }
  ]
};

zingchart.render({
	id : 'pieChart',
	data : pieChartConfig,
	height: 250,
	width: 250
});

var salesStateConfig ={
 	type: "area",
 	stacked: true,
 	plot:{
 	  aspect: "spline",
 	  alphaArea: 0.6
 	},
 	plotarea:{
 	  margin: "20px 0 100px 10px"
 	},
  preview: {
    "visible": "true",
    "border-width":0,
    "preserve-zoom":true,
    "mask":{
      "backgroundColor":"white",
      "alpha":0.8
    },
    "y":"85%",
  },
 	tooltip:{visible:false},
 	scaleY:{
    lineWidth:false,
 	  short:true,
 	  shortUnit:'k',
    step: 3000,
    firstItem: false,
 	  tick:{
 	    visible: false
 	  },
 	  item:{
 	    fontColor: "#616161",
 	    paddingRight: -25,
      fontSize: 14,
      color: "#868686",
 	  },
 	  guide:{
 	    lineStyle: "solid",
 	    lineColor: "#979797",
      alpha: 0.18
 	  },
 	},
 	scaleX:{
    zooming: true,
    zoomTo:[1,10],
 	  lineColor: "#AAA5A5",
 	  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
 	  tick:{
 	    visible: false
 	  },
    step : 1,
    guide:{
      visible: true,
 	    lineStyle: "solid",
 	    lineColor: "#979797",
      alpha: 0.18
 	  },
 	  item:{
 	    fontColor: "#fff",
 	    paddingTop: -25,
      fontSize: 14,
      firstItemDisplay: false
 	  },
 	},
 	crosshairX:{
 	  lineColor: "#AAA5A5",
 	  plotLabel:{
 	    backgroundColor:"#fff",
 	    borderColor: "#AAA5A5",
 	    borderWidth: 2,
 	    borderRadius: 2,
 	    thousandsSeparator:',',
 	    fontColor:'#616161'
 	  },
 	  scaleLabel:{
 	    backgroundColor: "#EBEBEC",
 	    borderColor: "#AAA5A5",
 	    fontColor: "#424242"
 	  }
 	},
	series : [
		{
			values : [1435,2212,1627,1189,2325,1334,1567,2685,1435,2212,1627,1189,2325,1334,1567,2685],
			text: "Средний показатель",
			backgroundColor: "#eeeff6 #d0d1e5",
			lineColor: "#eeeff6",
      alphaArea: 0.6,
			marker:{
        visible: false,
			  backgroundColor: "#eeeff6",
			  borderColor: "#eeeff6"
			}
		},
		{
			values : [1221,1535,4340,2232,4212,1259,3611,4230,1221,1535,4340,2232,4212,1259,3611,4230],
			text: "Петренко",
			backgroundColor: "#419bf9",
			lineColor: "#419bf9",
      alphaArea: 0.01,
			marker:{
			  backgroundColor: "#fff",
			  borderColor: "#419bf9",
        borderWidth: 2
			}
		},
		{
			values : [1145,2368,1210,1229,1336,1551,1647,1660,1145,2368,1210,1229,1336,1551,1647,1660],
			text: "Прихвостовский",
			backgroundColor: "#8060bc",
			lineColor: "#8060bc",
      alphaArea: 0.01,
			marker:{
			  backgroundColor: "#fff",
			  borderColor: "#8060bc",
        borderWidth: 2
			}
		}
	]
};

zingchart.render({
	id : 'salesStateChart',
	data : salesStateConfig,
	height: '400',
	width: '1068'
});
};
