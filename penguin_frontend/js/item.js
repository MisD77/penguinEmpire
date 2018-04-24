$(document).ready(function(){

    var itemKoId = getParameterByName("itemid");
    var cartFlag = getParameterByName("showCart");

    setCartUI();

    if(itemKoId=="0"&cartFlag=="1")
    {
        $('#itemInfoPage').hide();
        $('#checkoutPage').show();
    }
    else
    {
        displayItemDetail(itemKoId);
    }

    $('.btn-minuse').on('click', function(){                    
        var currVal = parseInt($(this).parent().siblings('input').val())-1;
        var test = $('#addToCartBtn h3').attr("unitprice");
        $('#addToCartBtn h3').text("$"+parseInt(test)*parseInt(currVal));
        $(this).parent().siblings('input').val(parseInt($(this).parent().siblings('input').val()) - 1);
    })

    $('.btn-pluss').on('click', function(){            
        var currVal = parseInt($(this).parent().siblings('input').val())+1;
        var test = $('#addToCartBtn h3').attr("unitprice");
        $('#addToCartBtn h3').text("$"+parseInt(test)*parseInt(currVal));
        $(this).parent().siblings('input').val(parseInt($(this).parent().siblings('input').val()) + 1);
    })


    //cartVlaueHidden
    $(document).on('click', '.addToCart', function(){ 
        $(".emptyCartMsg").text("");
        $("#btnCheckout").show();
        
        var defaultVal = parseInt($("#cartVlaueHidden").val());
        $("#cartVlaueHidden").val(defaultVal+1);
        $(".cartItemsCount").text($("#cartVlaueHidden").val());
        
        // below building cart
        var selectedItemsCount = $("#itmQuantity").val();
        var totalPrice = $('#addToCartBtn h3').attr("unitprice")* selectedItemsCount;
        var itmImg = $('#itmImageDiv img').attr("itmImg");
        var itmName =  $('#itmDetailsDiv h3').attr("itmName");
        
        $("<span id='cartMessage'>Item successfully added to cart!</span>").insertAfter('.addToCart').delay(400).fadeOut();
        buildCart(itmImg, itmName, selectedItemsCount, totalPrice);
        writeToSession("cartsCount",$("#cartVlaueHidden").val());

   });

   //#itemInfoPage #checkoutPge
   $(document).on('click', '#cart', function(){
        $('#itemInfoPage').hide();
        $('#checkoutPage').show();
   });

   //removing item from cart and update notificaion badge
   $(document).on('click','.deleteItem',function(){
        $(this).parent('td').parent('tr').remove();
        var defaultVal = parseInt($("#cartVlaueHidden").val());
        $("#cartVlaueHidden").val(defaultVal-1);
        if($("#cartVlaueHidden").val()>0)
        {
            $(".cartItemsCount").text($("#cartVlaueHidden").val());
        }
        else
        {
            $(".cartItemsCount").text("");
            $(".emptyCartMsg").text("Your cart is empty!");
            $("#btnCheckout").hide();
        }
        writeToSession("cartsCount",$("#cartVlaueHidden").val());
        writeToSession("cartsHtml",$('#cartTable').html());
    
   });
/*
    $(document).on('click','#btnCheckout',function(){
        //$('#modalLoginDiv').addClass("hideHtml");
        var itmsNo = localStorage.getItem("cartsCount");
        if(itmsNo = 0)
        {

        }
        var usr = localStorage.getItem("userInfo");
        if(usr != null)
        {
            $('#modalLoginDiv').hide();
            $('modalCheckedOut').show();
        }
        else
        {
            $('#modalLoginDiv').show();
            $('modalCheckedOut').hide();
        }
    });
    */
    
    $(document).on('click','#confirmCheckout',function(){
        writeToSession("cartsCount",0);
        writeToSession("cartsHtml","");
        location="shop.html";        
    });
});

//on click on each item
function displayItemDetail(itemId)
{
     //using jQuery performs http request to server 
    //function below gets the data from products database
    //using api below that
    $.ajax({
        url: 'http://localhost:3000/api/Item/'+itemId,
        type: 'GET',
        data: {
            format: 'json'
        },
        success: function(data) {
            if(data != null)
            {
                var imgsrc= GetCommonImage(data.Name);
                var imgHtml = "<figure><img itmImg="+imgsrc+" src="+imgsrc+"></figure>";
                var detailsHtml = "<h3 itmName="+data.Name+">"+data.Name + " <br/> <h4>"+data.Description+"</h4><br/><br/>";
                var buttonDetails = "<h3 unitprice="+data.Price+">$"+data.Price+"</h3><span class='addToCart'>Add to Cart</span>";
                $('#itmImageDiv').html(imgHtml);
                $('#itmDetailsDiv').html(detailsHtml);
                $('#addToCartBtn').html(buttonDetails);
            }
            else
            $('#itmImageDiv').html("<h3>Sorrry we are having problem loading product from the database. Please try again later.</h3>");
        },
        error: function() {
        }
    });

}


//adding items and creating a cart table
function buildCart(img, name, count, amount){
    var shoppingCart = "<tr><td><img class='cartImg' src='"+ img +
        "'</td><td><span class='cartItmLabel'>"
        + name +"</span></td><td><span class='cartItmLabel'>"+ count +
        "</span></td><td><span class='cartItmLabel'>"+ amount +"</span></td><td><span class='deleteItem'>X</span></td></tr>";
    $("#cartTable").append(shoppingCart);
    var cart =  $('#cartTable').html();
    //localStorage.setItem("cartsHtml", shoppingCart);
    writeToSession("cartsHtml",cart);
}

//session tracking for items in cart
function setCartUI()
{
    var itmsNo = localStorage.getItem("cartsCount");
    $("#cartVlaueHidden").val(itmsNo);
    if(parseInt(itmsNo)!=0)
        $(".cartItemsCount").text(itmsNo);
    else
        {
            $(".cartItemsCount").text();
            $(".emptyCartMsg").text("Your cart is empty!");
            $("#btnCheckout").hide();
        }
    var currentCart = localStorage.getItem("cartsHtml")
    $("#cartTable").append(currentCart);
}

//gets parameterValue from url
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}