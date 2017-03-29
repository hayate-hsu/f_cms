/**
 * Created by JavieChan on 2015/9/15.
 */

$(function(){
    window.cmsUrl = '';
    window.cmsToken = getParam('token');
    window.cmsManager = getParam('manager');

    for(var i=0; i<$('.menulink').length; i++){
        var v = $('.menulink').eq(i).attr('href');
        $('.menulink').eq(i).attr('href', v+'?manager='+cmsManager+'&token='+cmsToken);
    }
    for(var i=0; i<$('.bz').length; i++){
        var v = $('.bz').eq(i).attr('href');
        $('.bz').eq(i).attr('href', v+'&manager='+cmsManager+'&token='+cmsToken);
    }

    //返回
    $('.returnback').click(function(){
        return history.back();
    });

    //图片上传
    $('#upload').on('click', function(e) {
        e.preventDefault();
        $('#uploadImg').trigger('click');
    });
    $('#uploadImg').change(function(){
        $('#loading').show();
        $.ajaxFileUpload({
            url: cmsUrl+'/upfs', //用于文件上传的服务器端请求地址
            secureuri: false, //一般设置为false
            fileElementId: 'uploadImg', //文件上传空间的id属性  <input type="file" id="file" name="file" />
            //dataType: 'json', //返回值类型 一般设置为json
            success: function (data, status)  //服务器成功响应处理函数
            {
                var str = $(data).find("body").text();//获取返回的字符串
                var json = $.parseJSON(str);//把字符串转化为json对象
                $('#preview').attr('src', cmsUrl+json.url);
                $('#imgVal').val(json.url);
                $('#imgUrl').text(json.url);
                $('#loading').hide();
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                console.log(e);
            }
        });
        return false;
    });
    // 备选封面
    $(document).on('click', '.alterPic img', function(){
        if(confirm("确定要替换封面吗？")){
            var url = $(this).attr('src'),
                src = $(this).data('src');
            $('#imgVal').val(src);
            $('#imgUrl').text(src);
            $('#preview').attr('src', url);
        }
    });

    // 招聘页面
    // 岗位类别
    $(document).on('click', '#btnJobType', function(){
        $('#jobsType').modal(true);
    });
    $(document).on('click', '#conJobsType', function(){
        var param={
            manager: cmsManager,
            token: cmsToken,
            name: $('#jobsType input[name=typeName]').val()
        };
        JobTypeFunc('post', param, function(data){
            alert("添加成功！");
            $('#jobsType').modal('hide');
        }, function(error){
            alert("添加失败！");
        })
    });
    // 工作地点
    $(document).on('click', '#btnAddressType', function(){
        $('#addressType').modal(true);
    });
    $(document).on('click', '#conAddressType', function(){
        var param={
            manager: cmsManager,
            token: cmsToken,
            name: $('#addressType input[name=typeName]').val()
        };
        AddressTypeFunc('post', param, function(data){
            alert("添加成功！");
            $('#addressType').modal('hide');
        }, function(error){
            alert("添加失败！");
        })
    });
    // 投递邮箱
    $(document).on('change', '#maskType', function(){
        $(this).val()==0 ? $('#email').val('fresh@cnicg.cn') : $('#email').val('zhaopin@cnicg.cn');
    });
    $(document).on('change', '#email', function(){
        var n = $(this).val();
        if(!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(n)){
            $(this).parent().append('<span class="ipumsg">*邮箱格式错误！</span>');
        }else{
            $(this).next('.ipumsg').remove();
        }
    });
    // 新增岗位
    $(document).on('click', '#subjob', function(){
        var param={
            manager: cmsManager,
            token: cmsToken,
            name: $('#name').val(),
            type: $('#jobType').val(),
            mask: $('#maskType').val(),
            address_id: $('#addressType').val(),
            demand: $('#demand').val(),
            duty: $('#duty').val(),
            expire: $('#expire').val(),
            groups: $('#group').val(),
            email: $('#email').val()
        };
        if($('#email').val()==''){alert('填写投递邮箱！');$('#email').focus();}
        if(!$('.ipumsg').length>0){
            JobsFunc('post', '', param, function(data){
                window.location.href = '/joblist.html?manager='+cmsManager+'&token='+cmsToken;
                alert('添加成功');
            });
        }
    });
    // 保存岗位
    $(document).on('click', '#savejob', function(){
        var param={
            manager: cmsManager,
            token: cmsToken,
            name: $('#name').val(),
            type: $('#jobType').val(),
            mask: $('#maskType').val(),
            address_id: $('#addressType').val(),
            demand: $('#demand').val(),
            duty: $('#duty').val(),
            expire: $('#expire').val(),
            groups: $('#group').val(),
            email: $('#email').val()
        };
        if($('#email').val()==''){alert('填写投递邮箱！');$('#email').focus();}
        if(!$('.ipumsg').length>0) {
            JobsFunc('put', getParam('id'), param, function (data) {
                window.location.href = '/joblist.html?manager=' + cmsManager + '&token=' + cmsToken;
                alert('编辑成功');
            });
        }
    });
});

function getParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2].replace(/\+/g, " ")); return null;
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

function typeAjax(type, id, param, callback, errFunc){
    $.ajax({
        method: type,
        url: '/gmtype/'+id,
        data: param,
        dataType: "json"
    }).done(function(data){
        callback(data);
    }).fail(function(error){
        console.log(error);
        if(typeof(errFunc)=="function") errFunc();
    });
}

function labelFormat(str){
    str = str.replace(/\s/g, '').replace(/[,，]/g, ' ');
    str = $.trim(str);
    var arr = str.split(' ');
    return {
        str: str,
        len: arr.length
    };
}

function unlabelFormat(str){
    str = str.replace(/\s/g, ',');
    return str;
}

// 岗位名称
function JobTypeFunc(type, param, callback, errFunc){
    $.ajax({
        method: type,
        url: 'job/type/',
        data: param,
        dataType: "json"
    }).done(function(data){
        callback(data);
    }).fail(function(error){
        console.log(error);
        if(typeof(errFunc)=="function") errFunc();
    });
}
// 工作地点
function AddressTypeFunc(type, param, callback, errFunc){
    $.ajax({
        method: type,
        url: 'job/address/',
        data: param,
        dataType: "json"
    }).done(function(data){
        callback(data);
    }).fail(function(error){
        console.log(error);
        if(typeof(errFunc)=="function") errFunc();
    });
}

// 工作列表
function JobsFunc(type, id, param, callback, errFunc){
    $.ajax({
        method: type,
        url: 'job/'+id,
        data: param,
        dataType: "json"
    }).done(function(data){
        callback(data);
    }).fail(function(error){
        console.log(error);
        if(typeof(errFunc)=="function") errFunc();
    });
}

// message
function MessageFunc(type, id, param, callback, errFunc){
    $.ajax({
        method: type,
        url: 'message/'+id,
        data: param,
        dataType: "json"
    }).done(function(data){
        callback(data);
    }).fail(function(error){
        console.log(error);
        if(typeof(errFunc)=="function") errFunc();
    });
}

// 日期格式化
Date.prototype.Format = function(fmt){
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
function addDay(n){
    var date = new Date();
    var time=date.getTime();
    var newTime=time+n*24*60*60*1000;
    var myDate = new Date(newTime).Format("yyyy-MM-dd hh:mm:ss");
    return myDate;
}
