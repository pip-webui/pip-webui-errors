(function (angular) {
    'use strict';

    var thisModule = angular.module('pipFormErrorsSample', ['pipTranslate', 'ui.router', 'pipErrors.Pages', 'ngMessages']);

    thisModule.controller('SampleFormErrorsController',
        function ($scope, $rootScope, $state, $timeout, pipFormErrors) {



            setElementVisability();

            $scope.showServerError = true;

            $scope.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;

            $scope.onSignin = onSignin;
            $scope.onEnter = onEnter;

            $scope.data = {
                email: null,
                password: '',
                remember: false,
                adminOnly: false,
                name: null,
                code: null
            };

            return;

            function setElementVisability() {
                $scope.hideObject = angular.isObject($scope.hideElements) ? $scope.hideElements : {};
                $scope.hideObject.hint = false;
                $scope.hideObject.remember = false;
            }

            function onSignin() {
                if ($scope.form.$invalid) {
                    pipFormErrors.resetFormErrors($scope.form, true);
                    return;
                }


                if ($scope.hideObject.remember && !!$scope.rememberDefault) {
                    $scope.data.remember = true;
                }

                var error = {};

                pipFormErrors.resetFormErrors($scope.form, true);
                pipFormErrors.setFormError(
                    $scope.form, error,
                    {
                        1100: 'email', // Missing email
                        1106: 'email', // User was not found
                        1114: 'email', // Invalid email
                        1102: 'password', // Missing password
                        1107: 'password', // Invalid password
                        1000: 'form', // Unknown error
                        1110: 'form', // Account is locked
                        1111: 'form', // Number of attempts exceeded. Account was locked
                        1112: 'form', // Account is not active
                        '-1': 'form' // server not response
                    }
                );


            }

            function onEnter(event) {
                if (event.keyCode === 13) {
                    onSignin();
                }
            }


        }
    );

})(window.angular);
