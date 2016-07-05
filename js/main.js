/**
 * Created by JavieChan on 2015/5/29.
 */

$(document).ready(function(){
    window.cmsUrl = 'http://cms.cniotroot.cn';
    //返回
    $('#backUrl').click(function(){
        return history.back();
    });

    //标签分类
    if($('.innw').length>0){$('.innw').html('国内资讯');}
    if($('.outnw').length>0){$('.outnw').html('国外资讯');}
    if($('.tecnw').length>0){$('.tecnw').html('科技资讯');}

    //banner
    var int = setInterval("$.hotImg()", 6000);
    $('.bannerImg div:eq(0)').css("opacity", 1);
    var maxDot=32, minDot=18;
    $('.banner li').click(function(){
        var t = $(this).text();
        if($(this).hasClass('on')){
            return  false;
        }else{
            $(this).addClass('on').animate({"width": maxDot+"px"}, 100).siblings().removeClass('on').animate({"width": minDot+"px"}, 100);
            $('.bannerImg div').eq(t-1).animate({opacity: 1}, 800).siblings().animate({opacity: 0}, 800);
        }
    });

    $.extend({
        hotImg: function () {
            var i = $('.banner li.on').index(), max=32, min=16;

            if(i==1){
                $('.bannerImg div').eq(0).animate({opacity: 1}, 800).siblings().animate({opacity: 0}, 800);
                $('.banner li').eq(0).addClass('on').animate({"width": max+"px"}, 100);
                $('.banner li').eq(i).removeClass('on').animate({"width": min+"px"}, 100);
            }else{
                $('.bannerImg div').eq(i+1).animate({opacity: 1}, 800).siblings().animate({opacity: 0}, 800);
                $('.banner li').eq(i+1).addClass('on').animate({"width": max+"px"}, 100);
                $('.banner li').eq(i).removeClass('on').animate({"width": min+"px"}, 100);
            }
        }
    });

    //分享
    $('.share').click(function(){
        $('.shareWays').toggle(function(){
            if(!$(this).is(':hidden')){
                $('.share').addClass('on');
            }else{
                $('.share').removeClass('on');
            }
        });
    });

    //搜索
    $('.bdSearch').hover(function(){
        $(this).css('background', '#f7f7f7').animate({'width': 328+'px'}, 200);
        $('.bdSearch input').animate({'opacity': 1}, 200).focus();
    });
    $('body').click(function(){
        if($('.bdSearch input').val()==''){
            $('.bdSearch').animate({'width': 48+'px'}, 200, function(){
                $(this).css('background', '#fff');
            });
            $('.bdSearch input').animate({'opacity': 0}, 200);
        }
    });
    $('.bdSearch button').click(function(event){
        event.stopPropagation();
    });
    $('.bdSearch input').click(function(event){
        event.stopPropagation();
    });

    //主页-技术咨询
    //$('.fallbox li').hover(function(){
    //    $(this).find('a').fadeIn();
    //},function(){
    //    $(this).find('a').fadeOut();
    //});
    //$(document).on('mouseover mouseout', '.fallbox li', function(event){
    //    if(event.type == "mouseover"){
    //        $(this).find('a').animate({"opacity":'0.8'}, 300);
    //    }
    //    else if(event.type == "mouseout"){
    //        $(this).find('a').animate({"opacity":'0'}, 300);
    //    }
    //});

    //智能城市
    $('.U03 li').hover(function(){
        $(this).find('span').fadeIn('fast');
    },function(){
        $(this).find('span').fadeOut('fast');
    });

    //友情链接
    $(".moselect").click(function(e){
        //var theEvent = window.event || arguments.callee.caller.arguments[0];
        var $i = $(this).parent().index();
        $('.flinkbox ul').fadeOut();
        $(this).next('ul').fadeToggle();

        e.stopPropagation();
    });

    $(document).on('mouseleave', '.flinkbox ul', function(){
        $('.flinkbox ul').fadeOut();
    });

    $('body').click(function(){
        $('.flinkbox ul').fadeOut();
    });

    //提交项目
    $(document).on("click", ".subhelp input, .subPro", function(){
        $(".zckj03").css("background", "#f5f5f5");
        $('.hidzcText').hide();
        $(".subProFrom").show();
    });
    $(document).on("click", ".spClosed, .spSub", function(){
        $(".zckj03").css("background", 'url("images/zckj003.jpg") top center no-repeat');
        $(".subProFrom").hide();
        $(this).parent().siblings("div.zcText").show();
    });

    //导航新闻
    $(".scNewsF").click(function(){
        if($(".scNews").is(":hidden")){
            $(this).addClass("scNewsC");
            $(".scNews").fadeIn();
        }else{
            $(this).removeClass("scNewsC");
            $(".scNews").fadeOut();
        }
    });

    //联系我们
    $('.us_tab:eq(0)').show();
    $('.us_nav li').click(function(){
        $(this).addClass('on').siblings().removeClass('on');
        var index = $(this).index();
        $('.us_tab').eq(index).show().siblings('.us_tab').hide();
    });

    //招聘信息
    var jobs = [
        {
            'name': 'Python开发工程师 （1名）',
            'duty': '1、能够独立完成软件系统代码的实现；<br>2、有处理高并发请求经验；<br>3、根据需求完成代码编写，调试，测试和维护。',
            'requirement': '1、计算机、电子类专业本科以上学历；熟练掌握Python，熟悉Python设计模式，Python项目经验2年以上； <br>2、熟悉django/webpy/scrapy等框架； <br>3、熟悉MySQL等数据库的使用及优化；<br>4、对OOP、MVC开发方式有深入理解；<br>5、拥有良好的代码习惯，要求结构清晰，命名规范，逻辑性强，代码冗余率低；<br>6、有开源项目经验者优先。'
        },
        {
            'name': 'Python后台开发程序员 （1名）',
            'duty': '1、负责无线硬件产品后台服务器程序开发； <br>2、负责无线数据服务后台服务器程序开发。',
            'requirement': '1、计算机、电子类专业本科以上学历； <br>2、1年以上python服务器端程序开发经验；<br>3、熟悉flask、tornado等web框架；<br>4、熟悉http协议，了解RESTFUL风格，最好了解MQTT协议；<br>5、自我驱动，深入研究开源项目，或自己参与开源项目者优先。'
        },
        {
            'name': 'web前端开发工程师 （1名）',
            'duty': '1、负责基于HTML5、CSS、Javascript的Web应用前端开发，能够解决浏览器兼容性问题；<br>2、负责基于HTML5、CSS3、Javascript的前端开发；<br>3、与UI设计师积极合作，完成页面的前端实现；<br>4、与后端开发工程师积极合作，完成前端与后端的整合；<br>5、负责前端技术架构设计与应用，编写可复用的用户界面组建；<br>6、根据产品需求，分析并给出最优的页面前端结构解决方案；<br>7、研究和跟踪最新的前端技术发展，合理应用到项目中。',
            'requirement': '1：二年以上开发经验（项目经验丰富者优先录用）；<br>2：熟悉Internet基本协议（如TCP/TP、HTTP等）内容及相关应用，精通HTML/CSS/JS/H5等相应的页面设计；<br>3：熟悉Python开发相关技术，熟练使用Python Web框架；<br>4：对新技术感兴趣，学习能力强，有专研和开拓精神；<br>5：工作勤奋主动，有责任们具有良好的沟通能力，团队精神。'
        },
        {
            'name': '硬件研发工程师 （1名）',
            'duty': '1.负责设计、调试射频通讯电路板；<br>2.配合其他同事完成整个系统设计与调试；<br>3.负责所设计电路板的测试、认证工作。',
            'requirement': '1.电子、通讯、自动化类专业，本科以上学历；<br>2.一年以上射频（1GHz,ISM频段）电路设计、调试经验；3.具有至少一种射频通讯产品（模块）批量生产经验；<br>4.英语良好，能全面理解芯片手册，并注意细节；<br>5.自我驱动，积极学习新技术，了解行业动态。'
        },
        {
            'name': '物联网技术研究员 （1名）',
            'duty': '1.负责物联网标识技术、物联网应用技术研究，完成技术研究及原型系统开发；<br>2．负责物联网相关标准研究；<br>3. 参与物联网相关项目申请、实施。',
            'requirement': '1.计算机相关专业硕士以上学历，有一定编程能力；<br>2.有物联网相关技术研究背景者优先；<br>3.有大数据分析技术研究背景者优先；<br>4.具有良好的团队合作精神、职业素养。'
        },
        {
            'name': 'UI设计师 （1名）',
            'duty': '1、负责单位PC端产品的整体视觉设计工作以及UI设计工作(包括产品的整体风格和界面、icon设计，单位视觉发展方向、VI规范、视觉管理机制的搭建)；<br>2、根据对用户体验的理解和分析，以用户角度思考，提高PC端的可用性，继而优化设计；<br>3、对产品结构、流程、功能、界面用户体验、交互功能等进行研究并提出改善方案；',
            'requirement': '1、1-3年互联网行业设计经验，1年以上产品界面设计经验优先考虑；<br>2、本科以上学历，平面设计、美术设计以及多媒体设计等相关艺术类专业；<br>3、有扎实的美术功底，对画面的光影、色彩等有较强的理解和把握力，具有丰富的创作灵感，以及永不止步的学习能力；<br>4、具有较强的创意策略能力、丰富的视觉创作经验和独到的审美修养，精通各类平面设计软件（Photoshop、Illustrator、3Dmax、CorelDraw等软件）。'
        }
    ];

    $('.jobs_name').html(jobs[0].name);
    $('.gzjz').html(jobs[0].duty);
    $('.zwyq').html(jobs[0].requirement);

    $('.jobs li').click(function(){
        $(this).addClass('actived').siblings().removeClass('actived');
        var index = $(this).index();
        $('.jobs_name').html(jobs[index].name);
        $('.gzjz').html(jobs[index].duty);
        $('.zwyq').html(jobs[index].requirement);
    });

    //标识查询=======================================暂时待定
    $('.search button').click(function(){
        var h ='';
        var bz = $('.search input').val();

        if(bz == '' || bz==null){
            alert('请输入需要查询的标识');
        }else if(bz == 1){
            h = '<p><span>'+bz+'</span>已在本平台注册</p><p>标识名称：<a href="javascript:;">南沙本地香蕉</a></p>';
            $('.findMark div').append(h);
            $('.findMark').fadeIn();
        }else{
            h = '<p><span>'+bz+'</span>未在本平台注册</p><p>请先注册标识类型域！<a href="javascript:;">立即注册</a></p>';
            $('.findMark div').append(h);
            $('.findMark').fadeIn();
        }
    });
    $('.findMark .closed').click(function(){
        $('.findMark').fadeOut();
        $('.findMark div p').remove();
    });

    //我要投资
    $('#wytz').click(function(){
        $('.invest').fadeIn();
    });
    $('.invest .closed').click(function(){
        $(this).parent().fadeOut();
    });

    //智慧城市
    $('.jsyy00 .huge').css("opacity", 1);
    $('.jsyy01 .small').css("opacity", 1);
    $('.jsyy02 .small').css("opacity", 1);
    $('.jsyy03 .small').css("opacity", 1);

    var lastBlock = $("#a1"), maxWidth = 514, minWidth = 170;

    $('.jsyy li').hover(function(){
        $(lastBlock).animate({width: minWidth+"px"}, { queue:false, duration:400});
        $(this).animate({width: maxWidth+"px"}, { queue:false, duration:400});
        $(lastBlock).find('div.small').animate({opacity: 1}, { queue:false, duration:400});
        $(lastBlock).find('div.huge').animate({opacity: 0}, { queue:false, duration:400});
        $(this).find('div.small').animate({opacity: 0}, { queue:false, duration:400});
        $(this).find('div.huge').animate({opacity: 1}, { queue:false, duration:400});
        var currentBlock = this;
        lastBlock = this;
    });

    //孵化项目
    $('.fs_arrow_blue_right').show();
    var checklen = function (d, f) {
        if(d == (f-1)){
            $('.fs_arrow_blue_right').hide();
        }else if(d == 0){
            $('.fs_arrow_blue_left').hide();
        }else{
            $('.fs_arrow_blue_right').show();
            $('.fs_arrow_blue_left').show();
        }
    };

    var fslen = $('div.hatch').length, dinx = 0, dwd = 1170;
    $(document).on('click', '.fs_arrow_blue_right', function(){
        dinx += 1;
        $('.ndxm').animate({'left': -dinx*dwd+'px'}, 500);
        checklen(dinx, fslen);
    });
    $(document).on('click', '.fs_arrow_blue_left', function(){
        dinx -= 1;
        $('.ndxm').animate({'left': -dinx*dwd+'px'}, 500);
        checklen(dinx, fslen);
    });

    //首页授权注册维修商
    var roll = $('.bz_reRoll'), roll00=$('.bzRoll_0'), roll01 = $('.bzRoll_1'), roll02 = $('.bzRoll_2'), rollLen = $('.bzRoll_1 li').length;
    $direction = 'left';

    if(rollLen > 4){
        roll02.html(roll01.html());roll00.html(roll01.html());
        roll.scrollLeft(roll01.outerWidth());
        var marqueeVar = setInterval('$.marqueeLeft($direction)', 20);
    }

    $.extend({
        marqueeLeft:function(direction){
            var roll = $('.bz_reRoll'), roll00=$('.bzRoll_0'), roll01 = $('.bzRoll_1'), roll02 = $('.bzRoll_2');

            var rollLeft = roll.scrollLeft(), outWidth = roll01.outerWidth();

            if(direction=='left'){
                if(rollLeft >= outWidth*2){
                    roll.scrollLeft(outWidth);
                }else{
                    roll.scrollLeft(rollLeft+1);
                }
            }else{
                if(rollLeft <= outWidth){
                    roll.scrollLeft(outWidth*2);
                }else{
                    roll.scrollLeft(rollLeft-1);
                }
            }
        }
    });

    $('.bz_arrowL').hover(function(){
        if(rollLen > 4){
            $direction = 'left';
            clearInterval(marqueeVar);
            marqueeVar = setInterval('$.marqueeLeft($direction)', 20);
        }
    });
    $('.bz_arrowR').hover(function(){
        if(rollLen > 4){
            $direction = 'right';
            clearInterval(marqueeVar);
            marqueeVar = setInterval('$.marqueeLeft($direction)', 20);
        }
    });

    $('.bz_reRoll li').hover(function(e){
        var idx = $(this).index();
        if(rollLen > 4){
            clearInterval(marqueeVar);
            $('.bzRoll_0 li').eq(idx).addClass('on').siblings().removeClass('on');
            $('.bzRoll_1 li').eq(idx).addClass('on').siblings().removeClass('on');
            $('.bzRoll_2 li').eq(idx).addClass('on').siblings().removeClass('on');
        }else{
            $(this).addClass('on').siblings().removeClass('on');
        }
        var windowWidth = $(window).width(), x = e.pageX, xx=0;   //windowWidth屏幕宽度
        if(windowWidth<=1280){
            xx = x-55-39-13;     //39左边到父层的距离， 13图片宽度的一半
        }else{
            xx = x-(windowWidth-1170)/2-39-13;
        }
        if(xx >= 532){
            xx = 532;
        }else if(xx <= 0){
            xx = 0;
        }
        $('.bz_info i').css('left', xx+'px');
        $('.bz_info').css('z-index', 1001).stop(true,false).animate({'opacity': 1}, { queue:false, duration:400});
        //$('.bz_info').show();
    },function(){
        $('.bz_info').animate({'opacity': 0}, { queue:false, duration:400});
        $('.bz_info').animate({'z-index': 999}, { queue:false, duration:400});
        //$('.bz_info').hide();
        if(rollLen > 4){
            marqueeVar = setInterval('$.marqueeLeft($direction)', 20);
        }
    });

    $('.bz_reRoll li').click(function(){
        var link = $(this).find('a').attr("href");
        $('.bz_btn').attr("href", link);
    });

    //首页-标识查询
    $('.bz_sbox button').click(function(){
        var bz = $('.bz_sbox input').val();
        var bzHref = 'http://reg.cniotroot.cn?code='+Trim(bz);
        if(bz==''||bz==null){
            alert('请输入需要查询的标识');
        }else{
            window.open(bzHref);
        }
    });
});

//去掉所有空格
function Trim(str){
    str = str.replace(/\s/g,"");
    return str;
}

//历史查询和今日查询
function bzAll(){
    $.ajax({
        url: 'http://58.241.41.150:8888/collect',
        //data: {source:'jmars'},
        type: "get",
        dataType: "json",
        success: function(data){
            $('#bz_all').html(data.total);
            $('#bz_today').html(data.today);
        }
    });
}

//键盘响应
function EnterPress(e, t){ //传入 event
    var e = e || window.event;
    if(e.keyCode == 13){
        var id = t.id;
        $('#'+id).next('button').click();
    }
}

function ajaxGet(url, data, callback){
    $.ajax({
        url: cmsUrl+url,
        data: data,
        type: "get",
        dataType: "json",
        success: callback
    });
}
function getList(callback, gmtype){
    $.ajax({
        url: cmsUrl+'/message',
        data: {
            groups: '1003',
            mask: 2,
            gmtype: gmtype
        },
        type: "get",
        dataType: "json",
        success: callback
    });
}

function getParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2].replace(/\+/g, " ")); return null;
}
