app.controller('SearchController', function($scope, $http) {
	function getRecentGolinks(){
		 $http.get(tokenizedURL(ROOT_URL + '/api/recent_golinks')).
    	success(function(data, status, headers, config){
    		$scope.golinks = data;
    	}).
    	error(function(data, status, headers, config){
    		console.log('there was an error');
    		console.log(data);
    	});
	}
  function searchGoPost(searchTerm){
    if(searchTerm.indexOf('#')!=-1){
      console.log('searching for the post');
        $http.get(tokenizedURL(ROOT_URL + '/api/get_link_post?search_term='+encodeURIComponent(searchTerm))).
          success(function(data, status, headers, config){
            if(data.content != null && data.content != ''){
              $('#search-post-div').html(data.content);
              $scope.searchPost = true;
            }
          }).
          error(function(data, status, headers, config){
            console.log('there was an error getting link post');
          });
    }
  }
	function searchGoLinks(searchTerm){
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
    // getRecentGolinks();

    $scope.tagCloud = getTagCloud();
    $scope.permissionsOptions = ['Anyone', 'Only Me', 'Only PBL', 'Only Officers', 'Only Execs'];//[{'id': 'Only Me','label': 'Only Me'},{'id':' Only PBL', 'label':'Only PBL'}];//, 'Only Officers', 'Only Execs', 'Anyone'];

    $scope.searchGoLinks = function(){
    	console.log('this was called');
    	searchGoLinks($('#search-input').val());
    };
    $scope.searchTag = function(tag){
      searchGoLinks('#'+tag);
      $('#search-input').val('#'+tag);
    }
    $scope.getPopular = function(){
      getPopularLink();
    };
    $scope.getImageSrc = function(type){
        return './images/box-icon.png';
    };
    $scope.saveGoLink = function(golink){
      id = golink.id;
      console.log('id was '+id);
      key = $('#'+id+'-key-input').val();
      description = $('#'+id+'-description-input').val();
      permissions = $("#" + id + "-permissions-input option:selected").text();
      url = $('#'+id+'-url-input').val();
      tags = $('#'+id+'-tags-input').val().split(',');
      golink.key = key;
      golink.url = url;
      golink.description = description;
      golink.permissions = permissions;
      golink.tags = tags;
      // save the link server side
      $.ajax({
        url: tokenizedURL(ROOT_URL+'/api/save_golink'),
        type: 'POST',
        data: {'id': id, 'key':key, 
              'description': description, 
              'tags': tags.join(','), 
              'url': url,
              'permissions': permissions
        },
        success:function(data){
          console.log(data);
        },
        error:function (xhr, textStatus, thrownError){
          console.log('failed');
        }
      });
    };
    $scope.deleteGoLink = function(golink){
      var r = confirm("Are you sure you want to delete: "+golink.key);
      if (r == true) {
        id = golink.id;
        $('#'+id+'-div').remove();
        $.ajax({
        url: tokenizedURL(ROOT_URL+'/api/delete_golink'),
        type: 'POST',
        data: {'id': id},
        success:function(data){
          console.log(data);
        },
        error:function (xhr, textStatus, thrownError){
          console.log('failed');
        }
      });
      } else {
        console.log('aborted');
      }
      
    };
});