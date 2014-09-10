'use strict';

angular.module('buildingColorApp', [ 'uiSlider'])
    .controller('MainCtrl', function ($scope, $timeout, $http) {
        $scope.type = 'render';
        $scope.colors = [
            { id: 1,  name: 'White',          background:'#ffffff', code: 'hsl(49, 31%, 86%)'},
            { id: 2,  name: 'Off White  (WH89)',          background:'#fcf8ee', code: 'hsl(60, 23%, 89%)'},
            { id: 3,  name: 'Stone (GV60)',               background:'#e3dbdb', code: 'hsl(224, 39%, 71%)'},
            { id: 4,  name: 'Beige (BE60)',           background:'#e1d0a8', code: 'hsl(51, 56%, 81%)'},
            { id: 5,  name: 'Magnolia (LY82)',            background:'#f9f2df', code: 'hsl(0, 0%, 91%)'},
            { id: 6,  name: 'Light Grey (VI71)',          background:'#f4f0ef', code: 'hsl(40, 62%, 64%)'},
            { id: 7,  name: 'Brown/Grey (BG52)',            background:'#e2cab5', code: 'hsl(29, 28%, 66%)'},
            { id: 8,  name: 'Orchre (OC80)',           background:'#f5e9c7', code: 'hsl(24, 44%, 59%)'},
            { id: 9,  name: 'Light Blue (BL57)',            background:'#a4c6d3', code: 'hsl(11, 36%, 54%)'},
            { id: 10, name: 'Light Green (GR52)',            background:'#b0c9b8', code: 'hsl(25, 25%, 69%)'},
            { id: 11, name: 'Buttermilk (LY78)',             background:'#f3e3b4', code: 'hsl(86, 28%, 72%)'},
            { id: 12, name: 'Pale Stone Red (SR55)',             background:'#efc1b4', code: 'hsl(45, 3%, 74%)'},
            { id: 13, name: 'Light Cream (WH78)',          background:'#f4ece7', code: 'hsl(28, 7%, 61%)'}
        ];
        $scope.pebbleDashes = [
            {id: 1, name: 'Yellow', previewImage: 'yellow.png', houseImage: '2-Finished-House.jpg'},
            {id: 2, name: 'Classic Spar', previewImage: 'classic-spar.png', houseImage: 'DSCF1424-all-dash.jpg'},
            {id: 3, name: 'Honey', previewImage: 'honey.png', houseImage: 'Main-Road-After.jpg'},
            {id: 4, name: 'Barley Corn', previewImage: 'barley-corn.png', houseImage: 'Penywaun--BISF.jpg'},
            {id: 1, name: 'Black & White', previewImage: 'black-and-white.png', houseImage: 'Newark-After.jpg'},
            {id: 1, name: 'Snow Drop', previewImage: 'snow-drop.png', houseImage: 'SERS-Malpass-(4).jpg'},
//            {id: 1, name: 'Polar White', previewImage: 'polar-white.png', houseImage: ''},
//            {id: 1, name: 'Red & White', previewImage: 'red-and-white.png', houseImage: ''}
        ];
        $scope.options = {
            from: 9,
            to: 11,
            step: 0.01,
            dimension: "h",
            smooth: true
        };
        $scope.slide = {value: 300};
        $scope.$watch('value', function(val){
//            alert(123);
           if(val >= 10){
               $scope.am = 0;
               $scope.pm = val/10 - 1;
           } else{
               $scope.pm = 0;
               $scope.am = Math.abs(val/10 - 1);
           }
        });
        $scope.value = 10;
        $http.get('data/images.json').success( function(data){
//            alert($scope.currentImage.name)
            $scope.images = data;
            $scope.choseColor( $scope.colors[0]);
            $scope.currentImage = $scope.images[0];
            $scope.currentImage.selected = 'selected';
            $scope.choseDash($scope.pebbleDashes[0]);
            $timeout(function(){
                var car = $( '#carousel' );
                car.elastislide();
                car.add();
            }, 100);
        });


        $scope.choseDash = function (dash) {
            $scope.pebbleDashes.forEach(function(item){
                item.selected = false;
            });
            dash.selected = true;
            $scope.currentDash = dash;
        };
        $scope.choseColor = function (color) {
            for(var i = 0; i < $scope.colors.length; i++){
                $scope.colors[i].selected = false;
            }
            $scope.currentColor = color;
            color.selected = true;
        };

        $scope.choseImage = function (image) {
            for(var i = 0; i < $scope.images.length; i++){
                $scope.images[i].selected = false;
            }
            image.selected = true;
            $scope.currentImage = image;
        }
    })
    .directive('vbox', function() {
    return {
        link: function(scope, element, attrs) {
            attrs.$observe('vbox', function(value) {
                element.get(0).setAttribute("viewBox", value);
            })
        }
    };
});
