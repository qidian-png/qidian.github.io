<script src="/js/bubble.js"></script>
<div class="blank" style="padding-top: 75px;">
</div>
<div id="content" class="site-content">
    <div id="main">
        <header class="page-header">
            <h1 class="cat-title">
                标签云</h1>
            <span class="cat-des">
              <p>
                <%- "Tags " + site.tags.length %></p>
            </span>
        </header>
        <div id="main-part">

            <div class="tag-cloud">
                <div class="tag-cloud-tags" hidden>
                    <%- tagcloud({
                    min_font: 15,
                    max_font: 30,
                    amount: 200,
                    color: true,
                    start_color: '#ff6666',
                    end_color: '#0099cc'
                    }) %>
                </div>
            </div>
            <div class="tagwrapper">
                <div class="tagbubble"></div>
            </div>
            <script type="text/javascript">
                var alltags = document.getElementsByClassName('tag-cloud-tags');
                var tags = alltags[0].getElementsByTagName('a');

                var bo = new Array();
                var co = new Array();
                for (var i = 0; i < 4; i++) {
                    bo.push("b" + i);
                }
                for (var i = 0; i < 7; i++) {
                    co.push("c" + i);
                }

                var divDom = document.querySelector('.tagbubble')
                    //var divDom = document.getElementsByClassName('tagbubble')[0];
                for (var i = 0; i < tags.length; i++) {
                    var atag = document.createElement('a');
                    var boStyle = bo[Math.floor(Math.random() * 4)];
                    var coStyle = co[Math.floor(Math.random() * 7)];
                    if (tags[i].innerText.length > 10) {
                        boStyle = "b0";
                    } else if (tags[i].innerText.length > 5 && tags[i].innerText.length < 10) {
                        boStyle = "b1";
                    }
                    atag.setAttribute("class", boStyle + " " + coStyle);
                    atag.setAttribute("href", tags[i].href);
                    atag.innerText = tags[i].innerText;
                    divDom.appendChild(atag);
                }

                function browserRedirect() {
                    var sUserAgent = navigator.userAgent.toLowerCase();
                    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
                    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
                    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
                    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
                    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
                    var bIsAndroid = sUserAgent.match(/android/i) == "android";
                    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
                    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
                    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                        //移动端页面
                        return 80;
                    } else {
                        //pc端页面
                        return 150;
                    }
                }

                var tagRadius = browserRedirect();

                /*3D标签云*/
                tagcloud({
                    selector: ".tagbubble", //元素选择器
                    fontsize: 14, //基本字体大小, 单位px
                    radius: tagRadius, //滚动半径, 单位px 页面宽度和高度的五分之一
                    mspeed: "slow", //滚动最大速度, 取值: slow, normal(默认), fast
                    ispeed: "slow", //滚动初速度, 取值: slow, normal(默认), fast
                    direction: 135, //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
                    keep: false //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
                });
            </script>
            <!-- hexo-tag-cloud -->
        </div>

    </div>
</div>
