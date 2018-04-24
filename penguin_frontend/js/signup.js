
$("#btnRedirect").click(function(){
    location = "login.html";
});

$("#signupform").submit(function(event ) {

    jsonObj = [];

    item = {}
    item ["FirstName"] = $("#txtFName").val();
    item ["LastName"] = $("#txtLName").val();;
    item ["Email"] = $("#txtEmail").val();;
    item ["Password"] = $("#txtPass").val();;

    jsonObj.push(item);

    signUpUser(jsonObj);

    event.preventDefault();

  });


function signUpUser(userJsonObj){

    $.ajax({
        url: 'http://localhost:3000/api/users',
        type: 'post',
        data: JSON.stringify(userJsonObj),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#signupform").fadeOut(0);
            $("#successSign").fadeIn(300);
            $("#signupClose").hide();

        },
        error: function() {
            alert("Unable to register new user!")
        }

    });

}




