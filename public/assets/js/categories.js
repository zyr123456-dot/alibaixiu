
// - 为表单中每一个表单项添加 name 属性，name 属性的值要和接口文档中要求的参数名称保持一致
// - 为表单添加表单提交事件，在事件处理函数中，阻止表单提交的默认行为
// - 获取到用户在表单中输入的内容
// - 调用分类添加接口，实现添加分类功能
$('#sortForm').on('submit',function () { 
    var formData=$(this).serialize()
   $.ajax({
       type: "post",
       url: "/categories",
       data:formData,
       success: function (response) {
        location.reload()        
       }
   });
    return false
 })
//  - 向服务器端发送Ajax请求，获取分类页面数据
// - 使用模板引擎将服务器端返回的数据和HTML模板进行拼接
// - 将拼接好的内容展示在页面
$.ajax({
    type: "get",
       url: "/categories",
       success: function (response) {       
        var html=template('cid',{data:response})  
        $('#sortBox').html(html)       
       }
})
// - 通过事件委托为编辑按钮添加点击事件，在事件处理函数中获取到要修改的分类数据id
//   - 利用自定义属性，把对应的分类id设置到自定义属性中
// - 根据id调用接口，获取分类数据的详细信息
// - 利用模板引擎讲分类数据和HTML字符进行拼接，拼接完成后将内容渲染到页面中
// - 为修改按钮添加点击事件，在事件处理函数中获取到管理员在表中输入的内容
// - 调用修改分类数据接口，实现分类数据修改功能
$('#sortBox').on('click','.edit',function () {
    var id=$(this).attr('data-id')
    $.ajax({
        type: "get",
        url: "/categories/"+id,
        success: function (response) {

            var html=template('sid',{data:response})
            $('#formBox').html(html)
        }
    });
  })
  $('#formBox').on('submit','#modifyForm',function () {  
    var id=$(this).attr('data-id')
    var dataformat=$(this).serialize()
   $.ajax({
       type: "put",
       url: "/categories/"+id,
       data:dataformat,
       success: function (response) {
          location.reload()        
       }
   }); 
    return false;
})
// - 通过事件委托的方式为删除按钮添加点击事件，在点击事件处理函数弹出删除确认框
// - 在用户点击了确认删除后，获取要删除的分类数据的id
// - 调用删除分类数据接口，实现删除分类数据功能，如果分类删除成功，刷新页面
//删除单个
$('#sortBox').on('click','.delete',function () {
    var id=$(this).attr('data-id')
    if(confirm('您确定要删除吗?')){
        $.ajax({
            type: "delete",
            url: "/categories/"+id,
            success: function (response) {
               location.reload()
            }
        });
    }
    
})
//删除多个
$('#checkBox').on('change',function () {  
    var status=$(this).prop('checked')
    $('.select').prop('checked',status)
    if(status){
        $('#deleteMany').css('display','block')
    }else{
        $('#deleteMany').css('display','none')
    }
})
$('#sortBox').on('change','.select',function () { 
    
    var input=$('#sortBox').find('.select').filter(':checked')
   
    if(input.length==$('#sortBox').find('.select').length){
        $('#checkBox').prop('checked',true)
    }else{
        $('#checkBox').prop('checked',false)
    }
    if(input.length>1){
        $('#deleteMany').css('display','block')
    }else{
        $('#deleteMany').css('display','none')
    }
    
})
$('#deleteMany').on('click',function () { 
    var deleteArry=[]
    var input=$('#sortBox').find('.select').filter(':checked')

    input.each(function(index,item) {
        var id=$(item).attr('data-id')        
        deleteArry.push(id)
    })
    if(confirm('您确定要批量删除吗?')){
        $.ajax({
            type: "delete",
            url: "/categories/"+ deleteArry.join('-'),
            success: function (response) {
                location.reload()
            }
        });
    }
 })