<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://lib.sinaapp.com/js/jquery/1.7.2/jquery.min.js"></script>
</head>
<body>

    <div id="content">
        <h1 style="width: 100px; height: 100px">hello world</h1>
    </div>
    <script>
        (function(){
            var bp = document.createElement('script');
            var curProtocol = window.location.protocol.split(':')[0];
            if (curProtocol === 'https') {
                bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
            }
            else {
                bp.src = 'http://push.zhanzhang.baidu.com/push.js';
            }
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(bp, s);
         })();

        /* 鼠标特效 */
        var a_idx = 0;
        jQuery(document).ready(function($) {
           $("body").click(function(e) {
               var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善");
               var $i = $("<span/>").text(a[a_idx]);
               a_idx = (a_idx + 1) % a.length;
               var x = e.pageX,
               y = e.pageY;
               $i.css({
                   "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
                   "top": y - 20,
                   "left": x,
                   "position": "absolute",
                   "font-weight": "bold",
                  "color": "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"

               });
               $("body").append($i);
               $i.animate({
                   "top": y - 180,
                   "opacity": 0
               },
               1500,
               function() {
                   $i.remove();
               });
           });
        });
</script>
</body>
</html>

