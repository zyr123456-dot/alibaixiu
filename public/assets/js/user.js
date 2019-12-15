$("#userForm").on('submit', function () {
    
    var formDate=$(this).serialize()
    $.ajax({
        type: "post",
        url: "/users",
        data: formDate,
        success: function (response) {   
            location.reload() 
        },
        error:function (response) { 
           var res=JSON.parse(response.responseText)
            alert(res.message)
        }
    });
    return false
});
//图片上传，由于修改的数据也要添加/更改图片，所以需要事件委托
 $('#modifyBox').on('change','#avatar', function () {
    
        var formData=new FormData()
        formData.append('avatar', this.files[0])
       $.ajax({
           type: "post",
           url: "/upload",
           data: formData,
           contentType: false,
            processData:false,
           success: function (response) {
               $('#hiddenAvatar').val(response[0].avatar)
               $('#preLook').attr('src',response[0].avatar)
           }
       });
 });
 //数据展示
 $.ajax({
     type: "get",
     url: "/users",
     success: function (response) {
         console.log(response);
         
         var html=template('pid',{data:response})
         $('#userBox').html(html)
     }
 });
 //修改数据
 $('#userBox').on('click','.edit',function () { 
     var id=$(this).attr('data-id')
        $.ajax({
            type: "get",
            url: "/users/"+id,
            success: function (response) {
                var html=template('eid',{data:response})
                $("#modifyBox").html(html)
            }
        });
  })
 //修改后提交
  $("#modifyBox").on('submit','#modifyForm',function () {  
      var formdata=$(this).serialize()
      var id=$(this).attr('data-id') 
      console.log(formdata);
      $.ajax({
          type: "put",
          url: "/users/"+id,
          data: formdata,
          success: function (response) {
              location.reload()
              
          }
      });
      return false
      
  })
//删除功能
$('#userBox').on('click','.delete',function () { 
    if(confirm('您真的要删除他吗')){
        var id=$(this).attr('data-id')
   $.ajax({
       type: "delete",
       url: "/users/"+id,
       success: function (response) {
           location.reload()
       }
   });
    
 }
})
    
 //批量删除
 //
 $('#selectAll').on('change',function () { 
     var status=$(this).prop('checked')
     $('#userBox').find('.checkBox').prop('checked',status)
     if(status==true){
         $('#deletes').css('display','block')       
     }else{
        $('#deletes').css('display','none')    
     }

  })
  //
  $('#userBox').on('change','.checkBox',function(){
     var input= $('#userBox').find('.checkBox')
    
      if(input.length==input.filter(':checked').length){
        $('#selectAll').prop('checked',true)
      }else{
        $('#selectAll').prop('checked',false)
      }
     if(input.filter(':checked').length>1){
        $('#deletes').css('display','block') 
     }else{
        $('#deletes').css('display','none')
     }
  })
  //点击批量删除
  $('#deletes').on('click',function(){
      var inputArry=[];
    var input= $('#userBox').find('.checkBox').filter(':checked')
    console.log(input);
    
     $.each(input,function (index,item) {

            var id=$(item).attr('delete-id')
            inputArry.push(id)
       })
       if(confirm('您真的要批量删除吗?')){
        $.ajax({
            type: "delete",
            url: "/users/"+inputArry.join('-'),
            success: function (response) {
                location.reload()
            }
        });
         
       }
  })
 