//
var key=getUrlParams("key")
if(key!=-1){
    $.ajax({
        type: "get",
        url: "/posts/search/"+key,
        success: function (response) {
          console.log(response)  
          var html=template('nid',{data:response})
          $('#sort-data').html(html)       
        }
      })
}
