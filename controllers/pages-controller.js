app.controller('PagesController', function($scope, $http){
	$scope.savePost = function(){
		alert('how are this happening');
	};
	function aggregatePosts(posts){
		pages = {};
		pageKeys = [];
		for(var i=0;i<posts.length;i++){
			post = posts[i];
			if(pageKeys.indexOf(post.tag) == -1){
				pages[post.tag] = [];
				pageKeys.push(post.tag);
			}
			pages[post.tag].push(post);
		}
		pg = [];
		for(var i=0;i<pageKeys.length;i++){
			console.log(pages[pageKeys[i]]);
			console.log(pageKeys[i]);
			pg.push({'page': pageKeys[i], 'posts': pages[pageKeys[i]]});
		}
		return pg;
	}
	function getPosts(){
		 $http.get( tokenizedURL(ROOT_URL + '/api/pages')).
		  success(function(data, status, headers, config){
		  	console.log('retrieved blog posts');
		    $scope.posts = data;
			$scope.pages = aggregatePosts(data);
		  }).
		  error(function(data, status, headers, config){
		    console.log('blog posts error');
		  });
	}
	$('#save-post-btn').click(function(){
		title = $('#post-title-input').val();
		content = tinyMCE.activeEditor.getContent();
		// save title and content in new blogpostO
	});
	getPosts();
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
	    templates: [
	        {title: 'Test template 1', content: 'Test 1'},
	        {title: 'Test template 2', content: 'Test 2'}
	    ]
	});
});




