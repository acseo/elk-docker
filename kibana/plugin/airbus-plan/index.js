'use strict';

module.exports = function (kibana) {

  return new kibana.Plugin({

    uiExports: {
      visTypes: ['plugins/airbus_plan/airbus_plan']
    }

  });
};
