//根据分类获取文章列表
var categoryId=getUrlParams('categoryId')
if(categoryId != -1){
    $.ajax({
        type: "get",
        url: "/posts/category/"+categoryId,
        success: function (response) {
            console.log(response);
            var html=template('lid',{data:response})
            $('#sort-data').html(html)
        }
    });
}
//根据id获取分类信息
$.ajax({
    type: "get",
    url: "/categories/"+categoryId,
    success: function (response) {
        
       $('#sort-title').html(response.title)
        
    }
});