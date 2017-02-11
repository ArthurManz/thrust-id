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
    
    formlyConfig.setWrapper({
      name: 'mdLabel',
      types: ['input'],
      template: '<label>{{to.label}}</label><formly-transclude></formly-transclude>'
    });
    
    formlyConfig.setWrapper({
      name: 'mdInputContainer',
      types: ['input'],
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
  
	/** @ngInject */
	function RegisterController($state, $cookies, logger, formlyVersion) {
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
        key: 'text',
        type: 'input',
        templateOptions: {
          label: 'Input'
        }
      },
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
        key: 'knowsMuffinMan',
        type: 'checkbox',
        templateOptions: {
          label: 'Do you know the muffin man?'
        }
      }
    ];
    
    vm.originalFields = angular.copy(vm.fields);
    
    // function definition
    function submitRefugee() {
      //vm.options.updateInitialValue();
      alert(JSON.stringify(vm.model), null, 2);
    }
  };

})();
