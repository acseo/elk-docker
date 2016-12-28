define(function (require) {
  
  // we need to load the css ourselves
  require('plugins/test_picto/test_picto.less');

  // we also need to load the controller and used by the template
  require('plugins/test_picto/test_picto_controller');

  // register the provider with the visTypes registry
  require('ui/registry/vis_types').register(MetricVisProvider);

  function MetricVisProvider(Private) {
    var TemplateVisType = Private(require('ui/template_vis_type/template_vis_type'));
    var Schemas = Private(require('ui/vis/schemas'));

    // return the visType object, which kibana will use to display and configure new
    // Vis object of this type.
    return new TemplateVisType({
      name: 'test_picto',
      title: 'Test Picto',
      description: 'Test picto',
      icon: 'fa fa-picture-o',
      template: require('plugins/test_picto/test_picto.html'),
      params: {
        defaults: {
          titleGauge: null,
          labelGauge: null,
          heightGauge: 180,
	  minGauge: 0,
	  maxGauge: 100,
	  level1Gauge: 30,
	  colorlevel1Gauge: '#FF0000',
	  level2Gauge: 60,
	  colorlevel2Gauge: '#F97600',
	  level3Gauge: 90,
	  colorlevel3Gauge: '#F6C600',
	  level4Gauge: 100,
	  colorlevel4Gauge: '#60B044'
        },
        editor: require('plugins/test_picto/test_picto_params.html')
      },
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          min: 1,
          max: 1,
          defaults: [
            { type: 'count', schema: 'metric' }
          ]
        },
        {
          group: 'buckets',
          name: 'segment',
          title: 'X-Axis',
          min: 0,
          max: 2,
          aggFilter: ['date_histogram', 'terms']
        }

      ])
    });
  }

  // export the provider so that the visType can be required with Private()
  return MetricVisProvider;
});
