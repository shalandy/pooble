app.controller('TagsController', function($scope, $http){
	function getTags(){
		 $http.get( tokenizedURL(ROOT_URL + '/api/go_tags')).
		  success(function(data, status, headers, config){
		  	console.log('retrieved tags');
		    $scope.allTags = data;
		  }).
		  error(function(data, status, headers, config){
		    console.log('tags error');
		  });
	}
	getTags();
});