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
    //formlyConfig.templateManipulators.preWrapper.push(function(template, options) {
    //  if (!options.data.icon) {
    //    return template;
    //  }
    //  return '<md-icon class="step" md-font-icon="icon-' + options.data.icon + '"></md-icon>' + template;
    //});
  });

	/** @ngInject */
	function RegisterController($state, $cookies, $http, $stateParams, logger, formlyVersion) {
    var vm = this;
    
    vm.submitRefugee = submitRefugee;
    vm.getRefugee = getRefugee;
    vm.init = init;

	  init();

    initLogin();

		function initLogin() {
			vm.showMenu = false;
			console.log($cookies.get('thrust_connected'));

			if ($cookies.get('thrust_connected') === undefined) {
				$state.go('login');
			}
		}

    vm.exampleTitle = 'angular-material'; // add this

    vm.env = {
      angularVersion: angular.version.full,
      formlyVersion: formlyVersion
    };

	console.info($stateParams);

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
        type: 'select',
        templateOptions: {
          label: 'Gender',
          options: ['Female', 'Male']
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
              options: ["Afghanistan", "Congo", "Somalia", "Sudan", "Syria"]
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

    function getRefugee(id) {
		var req = {method: 'GET', url: '/refugee?id=' + id};
		$http(req).then(success, error);
		
		function success(response) {
			alert("SUCCESS")
			vm.model = JSON.parse(response.data);
		}
		
		function error(response) {
			alert("FAILED TO LOAD REFUGEE");
		}
	}
    
    vm.originalFields = angular.copy(vm.fields);
    
    function init() {
		console.info($stateParams);
		if ($stateParams.refId != undefined) {
			vm.title = "Refugee Details";
			getRefugee($stateParams.refId);
		} else {
			vm.title = "Refugee Registration";
		}
	}
    
    function submitRefugee() {
      
      var req = {
		 method: 'POST',
		 url: '/refugee',
		 data: JSON.parse(JSON.stringify(vm.model))
		};

      $http(req).then(success,error);
    
      function success(resp) {
		  vm.status = resp.status;
		  $state.go("details", {refId: 101});
	  }
	  
	  function error(resp) {
		  vm.status = resp.status;
		  $state.go("details", {refId: 404});
	  }
    }
  };

})();
