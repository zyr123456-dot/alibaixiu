$('#logout').on('click', function () {
    var isConfirm=confirm('您真的要退出吗?')
    if(isConfirm){
     $.ajax({
        type:'post',
        url:'/logout',
        success:function(response){
         
            location.href='login.html'
        },
        error:function(response){
           alert('退出失败')
        }
     })
    }
});
$.ajax({
    type: "get",
    url: "/users/"+userId,    
    success: function (response) {
        console.log(response);
        $('.avatar').attr('src',response.avatar)
        $('.name').html(response.nickName)
    }
});