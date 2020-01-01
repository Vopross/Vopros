/**
 * Created by petr on 05.2017.
 */

/**
 * @ngdoc directive
 * @name playerWebApp.directive:panelRoulette
 * @restrict 'EA'
 * @description Директива панели для рулетки
 */

'use strict';
((function () {
    'use strict';

    angular.module('playerWebApp')
      .directive('panelRoulette', panelRoulette);

    function panelRoulette() {
      return{
        restrict    : 'EA',
        replace     : true,
        transclude  : true,
        controllerAs: 'vm',
        scope       : {
          type      : '@'
        },
        templateUrl: 'directives/panel-roulette/panel-roulette.html',
        controller: function ($rootScope, $scope, $attrs, $location, $ocLazyLoad, $modal, $window, $localStorage, lodash, thing, notification) {
          var vm                = this,
            _                   = lodash,
            gameSizeWidth       = parseInt('gameSizeWidthForRoulette'),
            gameSizeHeight      = parseInt('gameSizeHeightForRoulette'),
            isShowBalance       = false,
            statusGame          = '';

          vm.disableButton          = true;
          vm.inGame                 = false;
          vm.inactive               = false;
          vm.inactiveForDouble      = false;
          vm.moneyInGame            = 0;
          vm.allBets                = 0;
          vm.allBets                = 0;
          vm.minLimit               = 0;
          vm.maxLimit               = 0;
          vm.resizeStyleFooterChips = {};
          vm.removeBets             = removeBets;
          vm.removeLastBet          = removeLastBet;
          vm.showBalance            = showBalance;
          vm.repeat                 = repeatBets;
          vm.double                 = doubleBets;
          vm.chips                  = [
            {
              name: '50',
              amount: 50
            },
            {
              name: '100',
              amount: 100
            },
            {
              name: '500',
              amount: 500
            },
            {
              name: '1k',
              amount: 1000
            },
            {
              name: '2k',
              amount: 2000
            },
            {
              name: '5k',
              amount: 5000
            },
            {
              name: '10k',
              amount: 10000
            }
          ];

          gameSizeWidth = (isNaN(gameSizeWidth)) ? 0 : gameSizeWidth; //для прохождения тестов, т.е. 'gameSizeWidth' заменяется только при сборке

          thing.on($scope, 'changeSizeViewGame', changeSize);

          thing.on($scope, 'closeBalance', showBalance);

          thing.on($scope, 'addSomeBet', function () {
            vm.inactive = true;
          });

          thing.on($scope, 'changeMoney', function (money) {
            vm.moneyInGame  = money.deposit;
            vm.allBets      = money.allBets;
          });

          thing.on($scope, 'dataGame', function (response) {
            vm.minLimit = (response.limits)?response.limits.minimum:0;
            vm.maxLimit = (response.limits)?response.limits.maximum:0;
          });

          thing.on($scope, 'statusGame', function (status) {
            statusGame = status;
            if(status === 'newSession'){
              vm.inactive           = false;
              vm.inactiveForDouble  = false;
            } else if(status === 'spin' ||  status === 'selectNumberRoulette' || status === 'result' || status === 'pause'){
              vm.inactive           = true;
              vm.inactiveForDouble  = true;
            }
          });

          function removeBets() {
            thing.emit('removeBets');
          }

          function removeLastBet() {
            thing.emit('removeLastBet');
          }

          function changeSize(response) {
            var ratioWidth  = response.width/gameSizeWidth,
                ratioHeight = response.height/gameSizeHeight,
                ratio       = Math.min(ratioWidth, ratioHeight),
                w           = angular.element($window);

            //TODO не удалять
            // console.log('width '+response.width);
            // console.log('height '+response.height);
            // console.log(ratio);
            // console.log('window.width '+w.width());


            vm.resizeStyleFooterChips.height = 70*ratio;
            vm.resizeStyleFooterChips.width = 470*ratio;

            $scope.$apply();
          }

          function showBalance(show) {
            isShowBalance = (_.isBoolean(show))?show:!isShowBalance;
            thing.emit('showBalance', isShowBalance);
          }

          function repeatBets() {
            if(vm.inactive) return;
            vm.inactive = true;
            thing.emit('repeatBets');
          }

          function doubleBets() {
            thing.emit('doubleBets');
          }
        }
      }
    }
  }
)());
