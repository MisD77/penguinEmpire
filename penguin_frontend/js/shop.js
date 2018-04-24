$(document).ready(function(){
    
    setCartUI();

    $.ajax({
        url: 'http://localhost:3000/api/Products',
        type: 'GET',
        data: {
            format: 'json'
        },
        success: function(data) {
            var tmpHtml = "";
            var count = 0;
            $.each( data, function( key, val ) 
            {
                var imgsrc= GetCommonImage(val.Name);
                if (count % 3 == 0)
                {
                    tmpHtml += ("<tr><td><figure><img src="+imgsrc+"><figcaption><h3>"+val.Name + "  $"+ val.Price+ "</h3>"+
                    "<span <span itmid='"+val._id+"' class='buyNow'>Buy Now</span></figcaption></figure></td>");
                    count = count + 1;
                }
                else
                {
                    tmpHtml += ("<td><figure><img src="+imgsrc+"><figcaption><h3>"+val.Name + "  $"+val.Price +"</h3>"+
                    "<span itmid='"+val._id+"' class='buyNow'>Buy Now</span></figcaption></figure></td>");
                    count = count + 1;
                    if (count % 3 == 0){
                        tmpHtml += ("</tr>");
                    }
                }
            });
           $('#shopping-list').html(tmpHtml);            
        },
        error: function() {
        }
    });
    
    $(document).on('click','.buyNow',function(){
        var itemId = $(this).attr("itmid");
        location = "item.html?itemid="+itemId+"&showCart=0";
    });
    
    $("#cart").click(function(){
        location = "item.html?itemid=0&showCart=1";
        
    });

});


function setCartUI()
{
    var itmsNo = localStorage.getItem("cartsCount");
    $("#cartVlaueHidden").val(itmsNo);
    
    if(parseInt(itmsNo)!=0)
        $(".cartItemsCount").text(itmsNo);
    else
        $(".cartItemsCount").text();

}