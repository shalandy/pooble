app.controller('SettingsController', function($scope, $http){
  function getChromeID(){
    $http.get(tokenizedURL(ROOT_URL + '/api/my_chrome_id')).
      success(function(data, status, headers, config){
        console.log(data.id);
        $scope.chromeID = data.id;
      }).
      error(function(data, status, headers, config){
        console.log('there was an error getting chrome id');
      });
  }
  getChromeID();
	$scope.registerPush = function(){
		console.log('registering push');
		console.log($scope.chromeID);
		$.ajax({
        url: tokenizedURL(ROOT_URL+'/api/register_push'),
        type: 'POST',
        data: {'email': email, 'chrome_id':$scope.chromeID},
        success:function(data){
        	alert('successfully registered your chrome id');
          console.log(data);
        },
        error:function (xhr, textStatus, thrownError){
          console.log('failed to register push');
        }
      });
	}
});