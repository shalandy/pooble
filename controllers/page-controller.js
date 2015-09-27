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
    $scope.createPost = function(){
        content = '';
        $scope.editMessage = 'Create a post';
        tinyMCE.activeEditor.setContent(content);
        $scope.editingPost = true;
        $('#editing-buttons').show();
    };
    $scope.cancelEditing = function(){
        console.log('lskfjlskdjfjlj');
        $scope.editingPost = false;
        $('#editing-buttons').hide();
    };
    $scope.editPost = function(post){
        $scope.editMessage = 'Edit this post';
        content = post.content;
        $scope.postTitle = post.title;
        tinyMCE.activeEditor.setContent(content);
        $scope.editingPost = true;
        $('#editing-buttons').show();
    };
    $scope.savePost = function(){
        content = tinyMCE.activeEditor.getContent();
        title = $scope.postTitle;
        console.log(content);
        console.log(title);
        console.log($scope.searchTerm);
        $.ajax({
        url: tokenizedURL(ROOT_URL+'/api/save_page_post'),
        type: 'POST',
        data: {'title': title, 'tag':$scope.searchTerm, 
              'content': content
        },
        success:function(data){
          console.log(data);
          $scope.editingPost = false;
          window.location.reload();
        },
        error:function (xhr, textStatus, thrownError){
          console.log('failed');
        }
      });
    };
    $scope.editingPost = false;
    searchTerm = '#' + $routeParams.tag;
    $scope.title = searchTerm
    $scope.searchTerm = searchTerm;
    searchGoLinks(searchTerm,1);
    getPosts(searchTerm);
    $scope.scrollToLinks = function(){
        linksPos = $('#links').position();
        window.scrollTo(linksPos.left, linksPos.top);
    };

    tinymce.init({
        selector: "textarea",
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor colorpicker textpattern imagetools"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        toolbar2: "print preview media | forecolor backcolor emoticons",
        image_advtab: true,
        height:500,
        templates: [
            {title: 'Test template 1', content: 'Test 1'},
            {title: 'Test template 2', content: 'Test 2'}
        ]
    });
});