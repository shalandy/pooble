app.controller('TrendsController', function($scope, $http) {
	$scope.title = 'trends controller';
	function getRecentGolinks(){
		$http.get(tokenizedURL(ROOT_URL + '/api/recent_golinks')).
    	success(function(data, status, headers, config){
    		$scope.recentGolinks = data;
    	});
	}
	function getTrending(){
      $http.get(tokenizedURL(ROOT_URL + '/api/top_recent')).
      success(function(data, status, headers, config){
        $scope.trendingGolinks = data;
      });
    }
    function getPopularLinks(){
      $http.get(tokenizedURL(ROOT_URL + '/api/popular_golinks')).
      success(function(data, status, headers, config){
        $scope.popularGolinks = data;
      });
    }
	getRecentGolinks();
	getTrending();
	getPopularLinks();
});