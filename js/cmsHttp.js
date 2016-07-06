/**
 * Created by JavieChan on 2015/9/15.
 */

$(function(){

    window.cmsUrl = 'http://cms.cniotroot.cn';
    //window.cmsUrl = 'http://183.63.152.237:9991';
    window.cmsToken = getParam('token');
    window.cmsManager = getParam('manager');

    $('.adminMenu').attr('href', $('.adminMenu').attr('href')+'?manager='+cmsManager+'&token='+cmsToken);

    for(var i=0; i<$('.newsMenu').length; i++){
        var v = $('.newsMenu').eq(i).attr('href');
        $('.newsMenu').eq(i).attr('href', v+'&manager='+cmsManager+'&token='+cmsToken);
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
            url: cmsUrl+'/fs', //用于文件上传的服务器端请求地址
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
