//热门推荐展示
$.ajax({
    type: "get",
    url: "/posts/recommend",
    success: function (response) {
        console.log(response);
        var recommendHtml=`
        {{each data}}
        <li>
        <a href="detail.html?id={{$value._id}}">
          <img src="{{$value.thumbnail}}" alt="">
          <span>{{$value.title}}</span>
        </a>
      </li>
      {{/each}}
      `     
      var html=template.render(recommendHtml,{data:response})
      $('#recommendBox').html(html)
    }
})
