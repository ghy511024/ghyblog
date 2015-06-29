(function(w){
    var  App={
        check:null,
        checksyncstatus:function(){
            if(App.check){
                return;
            }
            var check=function(){
                $.ajax({
                    url:"xxx",
                    type:"post",
                    data:({}),
                    dataType:"json",
                    success:function(data){
                        if(data.status==="done"){
                            clearInterval(App.check);
                            App.check=null;
                        //做其他事
                        }
                    }
                })
            }
            App.check=setInterval(check,1000);
        } 
    }
    var  App={
        check:null,
        checksyncstatus:function(){
            var check=App.check;
            if(check){
                return check;
            }
            var dfd=$.Deferred();
            App.check=dfd.promisd();
            var success = function(resp) {
                if (resp.status === 'done') {
                    App.Helpers.reloadUser(function() {
                        dfd.resolve();
                        App.set('syncCheck', null);
                    });
                } else {
                    setTimeout(check, 1000);
                }
            };
            var fail = function() {
                dfd.reject();
                App.set('syncCheck', null);
            };
            var check = function() {
                var req = $.ajax('/sync_status', {
                    dataType: 'json'
                });
                req.then( success, fail );
            };
            setTimeout(check, 1000);
            return dfd.promise();
        } 
    }
    var  App={
        check:null,
        checksyncstatus:function(){
            if(App.check){
                return;
            }
            var check=function(){
                $.ajax({
                    url:"xxx",
                    type:"post",
                    data:({}),
                    dataType:"json",
                    success:function(data){
                        if(data.status==="done"){
                            clearInterval(App.check);
                            App.check=null;
                        }
                        else{
                            setTimeout(check, 1000);
                        }
                    }
                })
            }
            App.check=true;
        } 
    }
    App.checksyncstatus().then(
    function(){console.log("后台已经返回，准备就绪")},
    function(){console.log("请求给弄丢了，咋办？？")}
)
})(window)