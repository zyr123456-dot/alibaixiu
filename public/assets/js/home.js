//轮播图展示页面
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {

        var html = template('kid', { data: response })
        $('#rotationChart').html(html)
        console.log(html);

        //
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
                // index++;

                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });

        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);

            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })
    }
});
// - 页面一加载，向服务器发送请求，获取最新发布数据
// - 利用模板引擎进行html的拼接，最新发布数据返回的是个数组，在编写模板引擎的时候需要利用each进行遍历
// - 最后渲染在页面
//最新发布数据展示
$.ajax({
    type: "get",
    url: "/posts/lasted",
    success: function (response) {
        console.log(response);
        var html = template('xid', { data: response })
        $('#newPost').html(html)
    }
});