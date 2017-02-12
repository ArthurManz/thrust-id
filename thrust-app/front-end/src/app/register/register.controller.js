(function () {
	'use strict';

	angular
		.module('thrust-app')
		.controller('RegisterController', RegisterController);
		
	/** @ngInject */
	function RegisterController($state, $cookies, $http, $stateParams, logger, formlyVersion, refugeeService) {
    var vm = this;
    
    vm.submitRefugee = submitRefugee;
    vm.model = {};
    vm.options = {};
    vm.title = "Refugee Details";

	  init();

		function init() {
      // Redirect to login in case cookie experied or does not exists
			if ($cookies.get('thrust_connected') === undefined) {
				$state.go('login');
			}
		}
    
    function submitRefugee() {
      refugeeService.create(vm.model).then(function(response) {
          console.log(response);
      });
    }

    vm.fields = [
      {
        elementAttributes: {
          layout: 'row',
          'layout-sm': 'column'
        },
        
        fieldGroup: [
          {
            key: 'firstName',
            className: 'flex-30',
            type: 'input',
            templateOptions: {
              label: 'First Name'
            }
          },
          {
            key: 'lastName',
            className: 'flex-30',
            type: 'input',
            templateOptions: {
              label: 'Last Name'
            }
          },
          {
            key: 'birthDate',
            type: 'datepicker',
            className: 'flex-30',
            templateOptions: {
              label: 'Date of birth'
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
            className: 'flex-30',
            type: 'input',
            templateOptions: {
              label: 'Document ID'
            }
          },
          {
            key: 'documentType',
            className: 'flex-30',
            type: 'select',
            templateOptions: {
              label: 'Document Type',
              options: ["None", "Passport", "ID card"] 
            }
          },
          {
            key: 'gender',
            type: 'select',
            className: 'flex-30',
            templateOptions: {
              label: 'Gender',
              options: ['Female', 'Male']
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
            key: 'bloodGroup',
            type: 'select',
            className: 'flex-30',
            templateOptions: {
              label: 'Blood group',
              options: ['A','B','AB','0']
            }
          },
          {
            key: 'originCountry',
            className: 'flex-30',
            type: 'select',
            templateOptions: {
              label: 'Country of origin',
              options: ["Afghanistan", "Congo", "Somalia", "Sudan", "Syria"]
            }
          },
          {
            key: 'registrationCountry',
            className: 'flex-30',
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
            className: 'flex-50',
            type: 'input',
            templateOptions: {
              label: 'Fingerprint'
            }
          },
          {
            key: 'photoHash',
            className: 'flex-50',
            type: 'input',
            templateOptions: {
              label: 'Photo'
            }
          }
        ]
      }
    ];
  }
})();
