angular.module("MyApp", [
        'MyApp.controllers',
        'MyApp.directives'
    ])
    .controller('MyCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {}]);

angular.module('MyApp.controllers', [])
    .controller('groupOneCtrl', function($scope) {
        $scope.settingsPanelButtons = [{
            id: "First Button", // this for button and tooltip
            classnames: "btn withText", // add classes
            btntext: true, // set button text true/false
            ttip: false, // set tooltip true/false
            cb: function() {
                // add custom callback
                console.log('button clicked!');
            }
        }, {
            id: "Second Button",
            classnames: "btn withText",
            btntext: true,
            ttip: false,
            cb: function() {
                // add custom callback
                console.log('button clicked!');
            }
        }];
        $scope.myModel = "Second Button"; // set default active button
        $scope.idProperty = "id";
        $scope.classNamesProperty = "classnames";
        $scope.bootstrapSuffix = "default";
        $scope.callback = "cb";
        $scope.showInnerText = "btntext";
        $scope.showTTip = "ttip";
    })

.controller('groupTwoCtrl', function($scope) {
    $scope.settingsPanelNav = [{
        id: 'My Button 1',
        classnames: "btn",
        btntext: false,
        ttip: true,
        cb: function() {
            // add custom callback
            console.log('button clicked!');
        }
    }, {
        id: 'My Button 2',
        classnames: "btn",
        btntext: false,
        ttip: true,
        cb: function() {
            // add custom callback
            console.log('button clicked!');
        }
    }];
    $scope.myModel = null; // set default active option
    $scope.idProperty = "id";
    $scope.classNamesProperty = "classnames";
    $scope.bootstrapSuffix = "default";
    $scope.callback = "cb";
    $scope.showInnerText = "btntext";
    $scope.showTTip = "ttip";
});


angular.module('MyApp.directives', [])
    .directive('radioButtonGroup', function() {
        return {
            restrict: 'E',
            scope: {
                model: '=',
                options: '=',
                id: '=',
                classnames: '=',
                suffix: '=',
                cb: '=',
                btntext: '=',
                ttip: '='
            },
            controller: function($scope) {
                $scope.activate = function(option, $event) {
                    if ($scope.model == option[$scope.id]) {
                        $scope.model = null;
                    } else {
                        $scope.model = option[$scope.id];
                    }
                    $scope.getCB = option[$scope.cb];

                    if ($event.stopPropagation) {
                        $event.stopPropagation();
                    }
                    if ($event.preventDefault) {
                        $event.preventDefault();
                    }
                    $event.cancelBubble = true;
                    $event.returnValue = false;

                };

                $scope.isActive = function(option) {
                    return option[$scope.id] == $scope.model;
                };
                $scope.getClassNames = function(option) {
                    return option[$scope.classnames];
                };
                $scope.getID = function(option) {
                    return option[$scope.id];
                };
                $scope.getShowIT = function(option) {
                    return option[$scope.btntext];
                };
                $scope.getShowTTip = function(option) {
                    return option[$scope.ttip];
                };
            },
            template: "<div class='{{getClassNames(option)}}' " +
                "ng-class='{active: isActive(option)}'" +
                "ng-repeat='option in options' " +
                "ng-click='activate(option, $event); getCB(option);'>" +
                "<span class='innerText' ng-if='getShowIT(option)'>{{getID(option)}}</span>" +
                "<div class='ttip' ng-if='getShowTTip(option)'>{{getID(option)}}</div>" +
                "</div>"
        };
    });
