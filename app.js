ROOT_URL = 'http://testing.berkeley-pbl.com';
// ROOT_URL = 'http://localhost:3000'

var token = getParameterByName('token');
var email = 'davidbliu@gmail.com';
console.log(token);
var app = angular.module('goApp', ['ngRoute']);
app.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'views/search.html',
            controller  : 'SearchController'
        })
        .when('/users', {
            templateUrl : 'views/users.html',
            controller  : 'UsersController'
        })
        .when('/about', {
            templateUrl : 'views/about.html'
        })
        .when('/add', {
            templateUrl : 'views/add.html',
            controller  : 'AddController'
        })
        .when('/pages', {
            templateUrl : 'views/pages.html',
            controller  : 'PagesController'
        })
        .when('/share', {
            templateUrl : 'views/share.html',
            controller  : 'ShareController'
        })
        .when('/insights', {
            templateUrl : 'views/insights.html',
            controller  : 'InsightsController'
        })
        .when('/settings', {
            templateUrl : 'views/settings.html',
            controller  : 'SettingsController'
        })
        .when('/tags', {
            templateUrl : 'views/tags.html',
            controller  : 'TagsController'
        })
        .when('/page/:tag', {
            templateUrl : 'views/page.html',
            controller : 'PageController'
        })
        .when('/search', {
            templateUrl : 'views/search.html',
            controller : 'SearchController'
        })
        .otherwise({
          'redirect_to': '/'
        });
});

function tokenizedURL(url){
    if(url.indexOf('?') != -1){
        tokenized = url + '&token='+token;
    }
    else{
        tokenized =  url + '?token='+token;
    }
    return tokenized;
}
app.run(function($rootScope) {
    $rootScope.image_hash = {};
    $rootScope.image_hash['document'] = 'docs-icon.png'
    $rootScope.image_hash['spreadsheets'] = 'sheets-icon.png'
    $rootScope.image_hash['facebook'] = 'facebook-icon.png'
    $rootScope.image_hash['trello'] = 'trello-logo.png'
    $rootScope.image_hash['youtube'] = 'youtube-icon.png'
    $rootScope.image_hash['box'] = 'box-icon.png'
    $rootScope.image_hash['piazza'] = 'piazza-icon.png'
    $rootScope.image_hash['flickr'] = 'flickr-logo.png'
    $rootScope.image_hash['git'] = 'git-icon.png'
    $rootScope.image_hash['other'] = 'pbl-logo.png'
    $rootScope.image_hash['drive'] = 'drive-icon.png'
    $rootScope.image_hash['instagram'] = 'instagram-logo.png'
    $rootScope.image_hash['presentation'] = 'sheets-icon.png'
    $rootScope.image_hash['form'] = 'forms-icon.png'
    $rootScope.getPageURL = function(tag){
        tag = tag.substring(1, tag.length);
        return '#/page/'+tag;
    }
})
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getTagCloud(){
  tagCloud = [];
  tagCloud.push({'name': 'WD'})
  return tagCloud;
}

function getIconImage(type){
    return image_hash[type];
}

function toHex(str) {
    var result = '';
    for (var i=0; i<str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
    return result;
  }
function getToken(){
  email = 'davidbliu@gmail.com';
  return toHex(email);
}