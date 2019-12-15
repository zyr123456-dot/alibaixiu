// - 实现图片上传功能，并且将上传后的图片地址保存在一个隐藏域中
$('#imgBox').on('change', '#image', function () {
    var file = this.files[0]
    var formData = new FormData()
    formData.append('image', file)
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            $('#hiddenBox').val(response[0].image)

            $('.img').attr('src', response[0].image).show()
        }
    });
})
// - 为图片轮播图表单中的每一个表单项添加name属性，name属性的值要和接口中要求的参数名称保存一致
// - 为图片轮播表单绑定提交事件，在事件处理函数中阻止表单默认提交的行为
// - 获取到管理员在表单中输入的内容
// - 向服务器端发送请求，实现图片轮播数据添加功能，如果数据添加成功，刷新页面
$('#slidesForm').on('submit', function () {
    var formdata = $(this).serialize()

    $.ajax({
        type: "post",
        url: "/slides",
        data: formdata,
        success: function (response) {
            location.reload()
        }
    });
    return false
})
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        console.log(response);
        var html = template('zid', { data: response })
        console.log(html);
        
        $('#slidesBox').html(html)
        console.log($('#slidesBox').html(html));


    }
});
$('#slidesBox').on('click','.delete',function () {
    var id=$(this).attr('data-id')
    console.log(id);
if(confirm('您确定删除此项吗?')){
         $.ajax({
        type: "delete",
        url: "/slides/"+id,
        success: function (response) {
            location.reload()
        }
    });
}
   
})