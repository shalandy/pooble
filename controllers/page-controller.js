app.controller('PageController', function($scope, $http, $routeParams) {
    
    function searchGoPost(searchTerm){
        if(searchTerm.indexOf('#')!=-1){
          console.log('searching for the post');
            $http.get(tokenizedURL(ROOT_URL + '/api/get_link_post?search_term='+encodeURIComponent(searchTerm))).
              success(function(data, status, headers, config){
//                if(data.content != null && data.content != ''){
//                  $('#search-post-div').html(data.content);
//                  $scope.searchPost = true;
//                }
                $scope.post = data;
                $scope.searchPost = true;
              }).
              error(function(data, status, headers, config){
                console.log('there was an error getting link post');
              });
        }
    }
    
    function searchGoLinks(searchTerm, page){
        $scope.title = searchTerm;
        $scope.searchPost = false;
        $('#search-post-div').html('');
            $http.get(tokenizedURL(ROOT_URL + '/api/search_golinks?search_term='+encodeURIComponent(searchTerm))).
            success(function(data, status, headers, config){
                $scope.golinks = data;
                $scope.searching = true;
                $scope.searchTerm = searchTerm;
            }).
            error(function(data, status, headers, config){
                console.log('there was an error');
                console.log(data);
            });
        searchGoPost(searchTerm);
    }
    
    searchGoLinks("#" + $routeParams.tag, 1);
    searchGoPost("#" + $routeParams.tag);
});