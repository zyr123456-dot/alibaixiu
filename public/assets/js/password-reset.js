// - 为修改密码表单中的每一个表单添加name属性，name属性的值要和接口中的参数名一致
// - 为修改密码表单添加表单提交事件，在事件处理函数中，阻止表单的默认提交行为
// - 获取到用户在表单中输入的内容
// - 调用修改密码接口，实现密码修改功能，如果密码修改成功，跳转到登录页面，让用户重新登录
$('#passForm').on('submit',function () {
    var formData=$(this).serialize()
  console.log(formData);
  
   $.ajax({
       type: "put",
       url:"/users/password",
       data:formData,
       success: function (response) {
          location.href='/admin/login.html'          
       }
   });
    return false
  })