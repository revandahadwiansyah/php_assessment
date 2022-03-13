$(document).ready(function(){
//    $.ajax({
//        url: "http://localhost:8000/products/list",
//        method: "GET",
//        headers: {
//            "accept": "application/json",
//            "Access-Control-Allow-Origin":"*",
//            "Access-Control-Allow-Origin": "http://localhost:8000"
//        },
//        "async": true,
//        "crossDomain": true,
//        data: []
//     })
//    .done(function(n,m,o) {
//        console.log('n:', n);
//        console.log('m:', m);
//        console.log('o:', o);
//    });
    
    $.get( "http://localhost:8000/products/list", {
        beforeSend: function(){
            $("#shadows").show();
        },
        complete: function(){
            setTimeout(function() {
                $("#shadows").hide();
            }, 2000);
        }
    })
    .done(function(n,m,o) {
        console.log('n:', n);
        console.log('m:', m);
        console.log('o:', o);
        var sampleDatas = '';
        if(m = 'success'){
            var datas = n.data;
            $.each(n.data, function(index, val){
                sampleDatas += '<tr><td>'+val.id+'</td><td>'+val.product_name+'</td><td>'+val.product_description+'</td><td>'+val.product_price+'</td><td>'+val.quantity+'</td></td><td>'+val.created_at+'</td>itle="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td><tr>';
            });
          
            $('#table_bodies').append(sampleDatas);
        } else {
            $('#table_bodies').append('<tr><td colspan="14">No data available in table</td></tr>');
        }
    });
});