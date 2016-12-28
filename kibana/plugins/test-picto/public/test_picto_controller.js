define(function (require) {

  //var c3 = require('./bower_components/c3');

  var module = require('ui/modules').get('kibana/test_picto', ['kibana']);

  module.controller('KbnGaugeVisController', function ($scope, $element, Private) {
    var tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));
    var metrics = $scope.metrics = [];
    var hold ="";
    var wold= "";
    var label = "";
    var title = "";
    var idchart = "";

    $scope.chart = null;
    $scope.showGraph = function() {

        color = $scope.vis.params.colorGauge;

	value = $scope.metrics[0].value;
	globalStyle = ".wrapper-"+$scope.$id+" .stack-background {display:block;} ";
	style = "";
	if (value > 0) { style = style + ".wrapper-"+$scope.$id+" .level1 .stack-background"; }
	if (value > 10) { style = style + ", .wrapper-"+$scope.$id+" .level2 .stack-background"; }
	if (value > 20) { style = style + ", .wrapper-"+$scope.$id+" .level3 .stack-background"; }
	if (value > 30) { style = style + ", .wrapper-"+$scope.$id+" .level4 .stack-background"; }
	if (value > 40) { style = style + ", .wrapper-"+$scope.$id+" .level5 .stack-background"; }
	if (value > 50) { style = style + ", .wrapper-"+$scope.$id+" .level6 .stack-background"; }
	if (value > 60) { style = style + ", .wrapper-"+$scope.$id+" .level7 .stack-background"; }
	if (value > 70) { style = style + ", .wrapper-"+$scope.$id+" .level8 .stack-background"; }
	if (value > 80) { style = style + ", .wrapper-"+$scope.$id+" .level9 .stack-background"; }
	if (value > 90) { style = style + ", .wrapper-"+$scope.$id+" .level10 .stack-background"; }
	if (style != "") {
		style = style + "{ display:block; color: " + color + "}";
	}
	globalStyle = globalStyle + style;


	$scope.style = globalStyle;
	$scope.value = parseFloat(Math.round(value * 100) / 100).toFixed(2);

        label = ( !$scope.vis.params.labelGauge ) ? $scope.metrics[0].label : $scope.vis.params.labelGauge;
        icon = $scope.vis.params.iconGauge;
	$scope.title = label;
	$scope.icon= icon;

	//idchart = $element.children().find(".chartc3");
        //var config = {};
        //config.bindto = idchart[0];
        //config.data = {};
        //config.data.json = {};
        //config.data.json.data1 = [$scope.metrics[0].value];
        //config.data.names = {'data1': label};
        //config.gauge = {'min': $scope.vis.params.minGauge, max: $scope.vis.params.maxGauge};
	//config.color = {pattern: [$scope.vis.params.colorlevel1Gauge, $scope.vis.params.colorlevel2Gauge, $scope.vis.params.colorlevel3Gauge, $scope.vis.params.colorlevel4Gauge], threshold: { max: $scope.vis.params.maxGauge,values: [$scope.vis.params.level1Gauge, $scope.vis.params.level2Gauge, $scope.vis.params.level3Gauge, $scope.vis.params.level4Gauge] }};
        //config.data.types={"data1":"gauge"};
    	//config.gauge = {};
        //config.gauge.label= {
        //    format: function(value, ratio) {
	//	var format = d3.format(".2f");
        //        return format(value) + "%";
        //    }
	//};
	//config.tooltip = {};
	//config.tooltip.format = {
        //    value: function (value, ratio, id) {
        //        var format = d3.format(".2f");
        //        return format(value) + "%";
        //    }
	//};
        //$scope.chart = c3.generate(config);
        //var elem = $(idchart[0]).closest('div.visualize-chart');
        //var h = elem.height();
        //var w = elem.width();
        //$scope.chart.resize({height: h - 50, width: w - 50});
    }


    $scope.processTableGroups = function (tableGroups) {
      tableGroups.tables.forEach(function (table) {
	var nbr_r = (Object.keys(table.rows).length);
	var nbr_c = (Object.keys(table.columns).length);
        var sum = 0;
        table.rows.forEach(function (row, i) {
          sum += row[nbr_c - 1];
        });
      	metrics[0] = {label: table.columns[nbr_c - 1].title, value: (sum / nbr_r)};
      });
    };


    $scope.$watch('esResponse', function (resp) {
      if (resp) {
        metrics.length = 0;
        $scope.processTableGroups(tabifyAggResponse($scope.vis, resp));
	    $scope.showGraph();
      }
    });

    /*
    $scope.$watch(
         function () {
           var elem = $(idchart[0]).closest('div.visualize-chart');
           var h = elem.height();
           var w = elem.width();
           if (idchart.length > 0 && h > 0 && w > 0) {
                   if (hold != h || wold != w) {
                         $scope.chart.resize({height: h - 50, width: w - 50});
                         hold = elem.height();
                         wold = elem.width();
                   }
           }
         },
         true
    );
    */
  });

});
