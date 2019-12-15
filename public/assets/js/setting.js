//图片上传
$('#setBox').on('change','#logo',function () {  
    console.log(23);
    
    var file = this.files[0]
    var formData = new FormData()
    formData.append('logo', file)
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            console.log(response);           
            $('#site_logo').val(response[0].logo)
            $('#logoImg').attr('src',response[0].logo)
        }
    });
})
//提交表单
$('#setForm').on('submit',function () {  
    var formdata=$(this).serialize()
    $.ajax({
        type: "post",
        url: "/settings",
       data:formdata,
        success: function (response) {
           location.reload()
            
        }
    });
    return false
})
$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        console.log(response);
        if(response){
            $('#site_logo').val(response.logo)
            $('#logoImg').attr('src',response.logo)
            $('input[name="title"]').val(response.title)
            $('textarea[name="description"]').html(response.description)
            $('input[name="keywords"]').val(response.keywords)
            $('input[name="comment"]').prop('checked',response.comment)
            $('input[name="review"]').prop('checked',response.review)
        } 
        
    }
});