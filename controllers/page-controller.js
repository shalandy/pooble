app.controller('PageController', function($scope, $http, $routeParams) {
    
    function getPosts(tag){
        if(tag.indexOf('#')!=-1){
            $http.get(tokenizedURL(ROOT_URL + '/api/page_posts?tag='+encodeURIComponent(tag))).
              success(function(data, status, headers, config){
                $scope.posts = data;
                $scope.searchPost = true;
              }).
              error(function(data, status, headers, config){
                console.log('there was an error getting link post');
              });
        }
    }
    
    function searchGoLinks(searchTerm, page){
        $scope.searchPost = false;
        $('#search-post-div').html('');
            $http.get(tokenizedURL(ROOT_URL + '/api/search_golinks?search_term='+encodeURIComponent(searchTerm))).
            success(function(data, status, headers, config){
                $scope.golinks = data;
                $scope.searching = true;
                $scope.searchTerm = searchTerm;
            }).
            error(function(data, status, headers, config){
                console.log('there was an error searching golinks');
            });
    }
    
    searchTerm = '#' + $routeParams.tag;
    $scope.title = searchTerm
    searchGoLinks(searchTerm,1);
    getPosts(searchTerm);
    $scope.scrollToLinks = function(){
        linksPos = $('#links').position();
        window.scrollTo(linksPos.left, linksPos.top);
    }
});