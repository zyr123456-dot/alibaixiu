// - 获取文章分类数据，并将数据显示在所属分类的下拉列表中，供管理员选择
// - 实现文章封面图片上传，并将上传后的图片地址保存在一个隐藏域中
// - 为添加文章表单中的每一个表单项添加name属性，并且name属性值要和接口中要求的参数名称一致
// - 为添加文章列表绑定表单提交事件，在事件处理函数中阻止表单默认提交的行为
// - 获取到管理员在表单中输入的内容
// - 向服务器端发送添加文章的请求，实现文章添加功能，文章添加成功以后要跳转到文章列表页面

$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        console.log(response);

        var html = template('pid', { data: response })
        $('#category').html(html)
    }
});
//图片
$('#changeBox').on('change','#feature', function () {
    var file = this.files[0]
    var formdata = new FormData()
    formdata.append('avatar', file)
    console.log(formdata);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formdata,
        contentType: false,
        processData: false,
        success: function (response) {
            // $('#img').attr('src', response[0].avatar)
            // $('#img').css('display', 'block')
            $('.hidden').val(response[0].avatar)
            $('#img').attr('src', response[0].avatar).show()
        }
    });
})
//
$('#titleForm').on('submit', function () {
    var formdata = $(this).serialize()
    $.ajax({
        type: "post",
        url: "/posts",
        data: formdata,
        success: function (response) {
            location.href = '/admin/posts.html'
        }
    });
    return false
})

// - 为编辑按钮添加链接，并将文章id作为链接的查询参数传递到文章编辑页面
// - 在文章编辑页面获取地址栏中的id参数
// - 根据id获取文章详细信息，并将文章信息显示在文章编辑表单中
// - 为修改文章表单绑定表单提交事件，在事件处理函数中阻止表单默认提交的行为
// - 获取到用户在表单中输入的内容
// - 向服务器端发送请求，实现修改文章信息功能，如果文章信息修改成功，跳转到文章列表页面

//编辑页面获取文章id
function getUrlParams(name) {
    var paramArr = location.search.substr(1).split('&')
    for (var i = 0; i < paramArr.length; i++) {
        if (paramArr[i].split('=')[0] == name) {
            return paramArr[i].split('=')[1]
        }
    }
    return -1
}
//获取数据渲染页面
var id = getUrlParams('id');
if (id != -1) {
    $.ajax({
        type: "get",
        url: "/posts/" + id,
        success: function (response) {
            $.ajax({
                type: "get",
                url: "/categories",
                success: function (categories) {
                    console.log(categories);

                    response.categories = categories
                    console.log(response);

                    template.defaults.imports.dateFormat = dateFormat
                    var html = template('gid', response)
                    $('#changeBox').html(html)
                }
            });


        }
    });

}
function dateFormat(data) {
    var date = new Date(data)
    return date.getFullYear() + '-' + (date.getMonth()+ 1) + '-' + date.getDate()

}
//修改文章
$('#changeBox').on('submit','#modifyForm',function () {
    var id = $(this).attr('data-id');
    console.log(id);
    
    var formdata=$(this).serialize()
    $.ajax({
        type: "put",
        url: "/posts/"+id,
        data:formdata,
        success: function (response) {
            // console.log(response);
            location.href='/admin/posts.html'
            
        }
    });
        return false
})