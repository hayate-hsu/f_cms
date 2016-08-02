/**
 * Created by JavieChan on 2015/9/17.
 */
$(function(){
    $('#loginBtn').click(function(){
        var manager = $('#loginManager').val();
        var password = hex_md5($('#loginPassword').val());

        $.ajax({
            url: '/account',
            data: {manager: manager, password: password},
            type: "post",
            dataType: "json",
            success: function(data){
                window.location.href = '/index.html?manager='+data.User+'&token='+data.token;
            },
            error: function(e){
                var error = JSON.parse(e.responseText);
                alert(error.Msg);
            }
        });
    });

    $(document).keydown(function(e){
        var e = e || e.event;
        if(e.keyCode == 13){
            $("#loginBtn").click();
        }
    })

});
