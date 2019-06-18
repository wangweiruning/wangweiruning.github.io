let isFisrtClick = window.sessionStorage.getItem('isFisrtClick');
        if(!isFisrtClick){
            $("#mengban").show();
            window.sessionStorage.setItem('isFisrtClick',true);
            $("#mengban").on('click',function(){
                $("#mengban").hide();
            })
        }else{
            $("#mengban").hide();
        }