(function () {
	'use strict';

	angular
		.module('thrust-app')
		.controller('RegisterController', RegisterController)
		.run(function(formlyConfig) {
	
    formlyConfig.setType({
      name: 'input',
      template: '<input ng-model="model[options.key]">'
    });
    
    formlyConfig.setType({
      name: 'checkbox',
      template: '<md-checkbox ng-model="model[options.key]">{{to.label}}</md-checkbox>'
    });
    
	formlyConfig.setType({
		name: 'datepicker',
		template: '<md-datepicker ng-model="model[options.key]" md-theme="{{to.theme}}"></md-datepicker>'
	});
    
    formlyConfig.setType({
 		name: 'select',
//		template: '<md-select ng-model="model[options.key]" md-theme="{{to.theme}}"><md-option ng-repeat="option in to.options" ng-value="option[to.valueProp || \'value\']">        {{ option[to.labelProp || \'name\'] }}    </md-option></md-select>'
		template: '<md-select ng-model="model[options.key]" md-theme="{{to.theme}}"><md-option ng-repeat="option in to.options" ng-value="option">        {{ option }}    </md-option></md-select>'
	});	
    
    formlyConfig.setWrapper({
      name: 'mdLabel',
      types: ['input', 'datepicker', 'select'],
      template: '<label>{{to.label}}</label><formly-transclude></formly-transclude>'
    });
    
    formlyConfig.setWrapper({
      name: 'mdInputContainer',
      types: ['input', 'datepicker', 'select' ],
      template: '<md-input-container><formly-transclude></formly-transclude></md-input-container>'
    });
    
    // having trouble getting icons to work.
    // Feel free to clone this jsbin, fix it, and make a PR to the website repo: https://github.com/formly-js/angular-formly-website
    formlyConfig.templateManipulators.preWrapper.push(function(template, options) {
      if (!options.data.icon) {
        return template;
      }
      return '<md-icon class="step" md-font-icon="icon-' + options.data.icon + '"></md-icon>' + template;
    });
  });

  function getCountries() {
	  
	  }
  
  function getBloodTypes() {
	  return [
                    {
                        "name": "Alberta",
                        "value":"alberta"
                    },
                    {
                        "name":"British Columbia",
                        "value":"british_columbia"
                    },
                    {
                        "name":"Manitoba",
                        "value":"manitoba"
                    },
                    {
                        "name":"New Brunswick",
                        "value":"new_brunswick"
                    },
                    {
                        "name":"Newfoundland and Labrador",
                        "value":"newfoundland_and_labrador"
                    },
                    {
                        "name":"Northwest Territories",
                        "value":"northwest_territories"
                    },
                    {
                        "name":"Nova Scotia",
                        "value":"nova_scotia"
                    },
                    {
                        "name":"Nunavut",
                        "value":"nunavut"
                    },              
                    {
                        "name":"Ontario",
                        "value":"ontario"
                    },
                    {
                        "name":"Prince Edward Island",
                        "value":"prince_edward_island"
                    },
                    {
                        "name":"Quebec",
                        "value":"quebec"
                    },
                    {
                        "name":"Saskatchewan",
                        "value":"saskatchewan"
                    },
                    {
                        "name":"Yukon",
                        "value":"Yukon"
                    },
                ]
  }
  
	/** @ngInject */
	function RegisterController($state, $cookies, $http, logger, formlyVersion) {
    var vm = this;
    // function assignment
    vm.submitRefugee = submitRefugee;

    // variable assignment
    vm.author = { // optionally fill in your info below :-)
      name: 'Kent C. Dodds',
      url: 'https://twitter.com/kentcdodds'
    };
    vm.exampleTitle = 'angular-material'; // add this
    vm.env = {
      angularVersion: angular.version.full,
      formlyVersion: formlyVersion
    };

    vm.model = {};
    vm.options = {};
    
    vm.fields = [
      {
        elementAttributes: {
          layout: 'row',
          'layout-sm': 'column'
        },
        
        fieldGroup: [
          {
            key: 'firstName',
            className: 'flex',
            type: 'input',
            templateOptions: {
              label: 'First Name'
            }
          },
          {
            key: 'lastName',
            className: 'flex',
            type: 'input',
            templateOptions: {
              label: 'Last Name'
            }
          }
        ]
      },
      {
        elementAttributes: {
          layout: 'row',
          'layout-sm': 'column'
        },
        
        fieldGroup: [
          {
            key: 'documentId',
            className: 'flex',
            type: 'input',
            templateOptions: {
              label: 'Document ID'
            }
          },
          {
            key: 'documentType',
            className: 'flex',
            type: 'select',
            templateOptions: {
              label: 'Document Type',
              options: ["None", "Passport", "ID card"] 
            }
          }
        ]
      },
      {
        key: 'birthDate',
        type: 'datepicker',
        templateOptions: {
          label: 'Date of birth'
        }
      },
      {
        key: 'gender',
        type: 'input',
        templateOptions: {
          label: 'Gender'
        }
      },
	  {
        elementAttributes: {
          layout: 'row',
          'layout-sm': 'column'
        },
        
        fieldGroup: [
          {
            key: 'originCountry',
            className: 'flex',
            type: 'select',
            templateOptions: {
              label: 'Country of origin',
              options: ["Syria", "Afghanistan", "Somalia", "Sudan", "Congo"]
            }
          },
          {
            key: 'registrationCountry',
            className: 'flex',
            type: 'select',
            templateOptions: {
              label: 'Country of registration',
              options: ["Belgium", "France", "Germany","Greece", "Italy", "Netherlands", "Spain"]
            }
          }
        ]
      },
      {
        elementAttributes: {
          layout: 'row',
          'layout-sm': 'column'
        },
        
        fieldGroup: [
          {
            key: 'fingerprintHash',
            className: 'flex',
            type: 'input',
            templateOptions: {
              label: 'Fingerprint'
            }
          },
          {
            key: 'photoHash',
            className: 'flex',
            type: 'input',
            templateOptions: {
              label: 'Photo'
            }
          }
        ]
      },
      {
        key: 'bloodGroup',
        type: 'select',
        templateOptions: {
          label: 'Blood group',
          options: ['A','B','AB','0']
        }
      }
    ];

    
    vm.originalFields = angular.copy(vm.fields);
    
    // function definition
    function submitRefugee() {
      //vm.options.updateInitialValue();
      var req = {
		 method: 'POST',
		 url: '/refugee',
		 data: JSON.parse(JSON.stringify(vm.model))
		};

      $http(req).then(success,error);
    
      function success(resp) {
		  console.log(resp.data);
	  }
	  function error(resp) {
		  console.error(resp.data);
	  }
    }
  };

})();
