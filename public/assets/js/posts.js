$.ajax({
  type: "get",
  url: "/posts",
  success: function (response) {
    console.log(response);
    template.defaults.imports.dateFormat = dateFormat
    var html = template('oid', response)
    function dateFormat(data) {
      var date = data.substr(0, 10)
      return date;
    }
    $('#titleBox').html(html)
    //分页
    var page = template('fid', response)
    $('#page').html(page)

  }
});
function changePage(page) {
  $.ajax({
    type: "get",
    url: "/posts",
    data: {
      page: page
    },
    success: function (response) {
      console.log(response);
      template.defaults.imports.dateFormat = dateFormat
      var html = template('oid', response)
      $('#titleBox').html(html)
      //分页
      var page = template('fid', response)
      $('#page').html(page)

    }
  });
}
function dateFormat(data) {
  var date = data.substr(0, 10)
  return date;
}
//获取分类数据
$.ajax({
  type: "get",
  url: "/categories",
  success: function (response) {
    console.log(response);
    var html = template('Sid', { data: response })
    $('#selectBox').html(html)
  }
});
//筛选
$('#choose').on('submit', function () {
  var formdata = $(this).serialize()
  console.log(formdata);
  
  $.ajax({
    type: "get",
    url: "/posts",
    data: formdata,
    success: function (response) {
      console.log(response);
      template.defaults.imports.dateFormat = dateFormat
      var html = template('oid', response)
      
      $('#titleBox').html(html)
      //分页
      var page = template('fid', response)
      $('#page').html(page)

    }
  });
  return false
})
//删除文章
$('#titleBox').on('click','.delete',function () { 
      var id=$(this).attr('data-id')
      if(confirm('您确定要删除吗?')){
      $.ajax({
        type: "delete",
        url: "/posts/"+id,
        success: function (response) {
            location.reload()
        }
      });
    }
})
