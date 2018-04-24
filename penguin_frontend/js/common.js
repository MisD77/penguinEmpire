
$(document).ready(function(){

    getUserInfo();
    
    $(document).on('click','#btnLogout', function(){
        localStorage.removeItem("userInfo");
        location = "home.html";
        
    });


     $("#loginSubmitForm").submit(function(event) {
        var usr = $("#txtUname").val();
        var pwd = $('#txtPassword').val();
        
        loginUser(usr,pwd);
        event.preventDefault();
    
      });

});

function GetCommonImage(itemName){
    var imgpath = "";
    if (itemName == "Bracelet")
        imgpath = "product/bracelet.jpg"
    else if (itemName == "Chocolate")
        imgpath = "product/chocolates.jpg"
    else if (itemName == "Pen")
        imgpath = "product/pen.jpg"
    else if (itemName == "Necklace")
        imgpath = "product/necklace.jpg"
    else if (itemName == "Flash Drive")
        imgpath = "product/flashdrive.jpg"
    else if (itemName == "Pen Holder")
        imgpath = "product/cupholder.jpg"
    else if (itemName == "Silver Bracelet")
        imgpath = "product/silver.jpg"
    else if (itemName == "Bracelet Charm")
        imgpath = "product/braceletcharm.jpg"
    else if (itemName == "Beaded Bracelet")
        imgpath = "product/beadedbracelet.jpeg"
    else if (itemName == "Cofee Mug")
        imgpath = "product/coffeemug.jpg"
    else if (itemName == "Wall Art")
        imgpath = "product/wallart.jpg"
    else if (itemName == "Wine Opener")
        imgpath = "product/wineopener.jpg"

    return imgpath;
}


function loginUser(usr,pwd){
    //using jQuery performs http request to server 
    //function below gets the data from user database using api below
    $.ajax({
        url: 'http://localhost:3000/api/Users/'+usr+"/"+pwd,
        type: 'GET',
        data: {
            format: 'json'
        },
        success: function(data) 
        {
            if(data != null && data.length != 0)
            {
                var usrHtml = "<div id='usrInfo'><img src='images/user.png'>Hi "+data[0].FirstName+"<span id='btnLogout'>Logout</span></div>";
                $('.navbar-nav li:last-child').html(usrHtml);
                writeToSession("userInfo",usrHtml);
                location = "../home.html"
            }
            else 
            {
                $("#noUser").show();
            }

        },
        error: function() {
            alert("Error in login. Try again.");
        }
    });
}

function writeToSession(sessionname, sessionValue)
{
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem(sessionname, sessionValue);
    } 
}


function getUserInfo()
{
    var usr = localStorage.getItem("userInfo");
    if(usr != null)
        $('.navbar-nav li:last-child').html(usr);
    else
        afterLogout();

}

function afterLogout()
{
    var resetNav = "<a class='btn btn-secondary' href='SignupLogin/login.html'>Login</a>";
    $('.navbar-nav li:last-child').append(resetNav);
}









