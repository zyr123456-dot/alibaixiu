// - 向服务器发送请求，获取评论列表数据
// - 使用模板引擎将评论列表数据和HTML模板进行拼接，拼接完成以后再将内容展示在页面中
// - 根据分页数据实现分页功能

$.ajax({
    type: "get",
    url: "/comments",
    success: function (response) {
        console.log(response);
        var html=template('vid',response)
        $('#commentBox').html(html)
        // var page=template('mid',response)
        // $('#Page').html(page)

        $('#Page').twbsPagination({
            totalPages: response.pages,
            visiblePages: 7,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
                changePage(page)
            }
          });
    }
});
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/comments",
        data:{
            page:page
        },
        success: function (response) {
            console.log(response);
            var html=template('vid',response)
            $('#commentBox').html(html)
            // var page=template('mid',response)
            // $('#Page').html(page)
        }
    });
  }
  
 $('#commentBox').on('click','.audit',function () { 
     var id=$(this).attr('data-id')
     var state=$(this).attr('state')
     $.ajax({
         type: "put",
         url: "/comments/"+id,
         data: {
             state:state == 0 ? 1 : 0
         },
         success: function (response) {
             location.reload()
             
         }
     });
  })
  //删除评论
  $('#commentBox').on('click','.delete',function () {
    var id=$(this).attr('data-id')
    if(confirm('您确定要删除吗?')){
        $.ajax({
            type: "delete",
            url: "/comments/"+id,
            success: function (response) {
                location.reload()
            }
        });
    }
   
  })