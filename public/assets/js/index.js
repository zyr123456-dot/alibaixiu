//文章数量
$.ajax({
    type: "get",
    url: "/posts/count",
    success: function (response) {
        console.log(response);
        $('#posts').html('<strong>'+response.postCount+'</strong>篇文章（<strong>'+response.draftCount+'</strong>篇草稿）')
    }
});
//分类数量
$.ajax({
    type: "get",
    url: "/categories/count",
    success: function (response) {
      
        $('#categories').html('<strong>'+response.categoryCount+'</strong>个分类')
    }
});
//评论数量
$.ajax({
    type: "get",
    url: "/comments/count",
    success: function (response) {
      
        $('#comments').html('<strong>'+response.commentCount+'</strong>条评论')
    }
});