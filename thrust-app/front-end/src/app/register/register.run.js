(function () {
	'use strict';

	angular
		.module('thrust-app')
		.run(formConfig);
    
    function formConfig(formlyConfig) {
	
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
    }
})();
