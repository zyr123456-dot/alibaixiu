//根据id获取文章
var id=getUrlParams('id')
if(id != -1)
$.ajax({
    type: "get",
    url: "/posts/"+id,
    success: function (response) {
        console.log(response);
        var html=template('jid',response)
        $('.article').html(html)
        
    }
});
$('.article').on('click','#link',function () { 
    $.ajax({
        type: "post",
        url: "/posts/fabulous/"+id,
        success: function (response) {
            alert('点赞成功，感谢您的支持！')
        }
    });
 })