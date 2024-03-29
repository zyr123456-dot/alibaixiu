// - 根据接口文档，页面一加载利用ajax进行网络请求
// - 利用模板引擎进行页面渲染
// - 这个随机推荐在几个页面都有展示，所以我们把请求随机推荐数据的代码写在公共的js文件中
// - 由于多个页面都需要展示，所以我们利用模板字符串，在js里面编写模板引擎
//随机推荐数据展示
$.ajax({
    type: "get",
    url: "/posts/random",
    success: function (response) {
      console.log(response);
      var randomHtml=`
      {{each data}}
      <li>
      <a href="detail.html?id={{$value._id}}">
        <p class="title">{{$value.title}}</p>
        <p class="reading">阅读({{$value.meta.views}})</p>
        <div class="pic">
          <img src="{{$value.thumbnail}}" alt="">
        </div>
      </a>
    </li>
    {{/each}}
    `
      var html=template.render(randomHtml,{data:response})
      $('#randomBox').html(html)
    }
  });
//   - 根据接口文档，页面一加载利用ajax进行网络请求
// - 利用模板引擎进行页面渲染
// - 这个最新评论在几个页面都有展示，所以我们把请求随机推荐数据的代码写在公共的js文件中
// - 由于多个页面都需要展示，所以我们利用模板字符串，在js里面编写模板引擎
//最新评论展示
$.ajax({
    type: "get",
    url: "/comments/lasted",
    success: function (response) {
        console.log(response);
        var commentsHtml=`
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
              <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
              </div>
              <div class="txt">
                <p>
                  <span>{{$value.author.nickName}}</span>{{$value.createAt.split("T")[0]}}说:
                </p>
                <p>{{$value.content}}</p>
              </div>
            </a>
          </li>
        {{/each}}
        `
        var html=template.render(commentsHtml,{data:response})
        $('#discuzBox').html(html)
    }
});
//查询分类列表
$.ajax({
  type: "get",
  url: "/categories",
  success: function (response) {
    var sortHtml=`
    {{each data}}
    <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
    {{/each}}
    `
    var html=template.render(sortHtml,{data:response})
    $('.nav').html(html)
  }
});
//获取id
function getUrlParams(name) {
  var paramArr = location.search.substr(1).split('&')
  for (var i = 0; i < paramArr.length; i++) {
      if (paramArr[i].split('=')[0] == name) {
          return paramArr[i].split('=')[1]
      }
  }
  return -1
}
//根据搜素框内容获取文章
$('.search form').on('submit',function () { 
    var key=$(this).find('.keys').val()
    location.href="search.html?key="+key
    return false
 })