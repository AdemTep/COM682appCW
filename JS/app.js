//The URIs of the REST endpoint
postVideo = "https://prod-03.eastus.logic.azure.com/workflows/0492ef47c83940e2a073c809fc5fbb29/triggers/manual/paths/invoke/rest/v1/videos?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QaaT_oFF9-M9maipmE0Un-TPuoTyw74sX5jkqLUJZ0Y";
retrieveAllVideos = "https://prod-22.centralus.logic.azure.com/workflows/05d9a938f5864107a57440ecec679c3d/triggers/manual/paths/invoke/rest/v1/videos?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=i3BfJwpgaSQW1hE5oSh70wk3HQjGAsdAUf5lokTjJsw"
deleteVideoFirst = "https://prod-93.eastus.logic.azure.com/workflows/6a8786afa29e465db0c9488a4c9c161a/triggers/manual/paths/invoke/rest/v1/video/"
deleteVideoSecond = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=13tk8XR-zAgyDe1A0hZSdx7VtPi8PYHf8XIRNblCX4I"
userLogin = "https://prod-53.eastus.logic.azure.com/workflows/deeba3f2c93c4a6a8cdd87ecc46c7209/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=G94jWiYXg6ITIEYSaFD48TxAwU_hOt5465hnuE59CUo"
getAllUsers = "https://prod-00.centralus.logic.azure.com/workflows/26e5f4347b394dc79f02a391008cf4a9/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=msdtEehX7Oiv9FohqeXtJuKVQRAlf5pK0BWOKKqMi0k"
deleteUserFirst = "https://prod-05.eastus.logic.azure.com/workflows/aa88c0e0969c47fa888074cec092568f/triggers/manual/paths/invoke/rest/v1/user/"
deleteUserSecond = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TKvM3BBJ8WFzhBICRFcuZbA6mei_aztu46yo5qL5cIk"
editRatingFirst = "https://prod-16.eastus.logic.azure.com/workflows/376f6e3f7da24ec496beb0d9c292076c/triggers/manual/paths/invoke/rest/v1/video/"
editRatingSecond = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=rjHeBmoOCEaRTN33T7i9DtzolhlJoduPJAsvoNJW_gE"


BLOB_ACCOUNT = "https://blobstoragecom682tep.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function () {


  $("#retImages").click(function () {

    //Run the get asset list function
    getImages();

  });
  $("#DeleteImages").click(function () {
    try{
      getUserInfo().then(result => {
        clientInfo = result
        console.log(clientInfo);
        userRoles = clientInfo['userRoles']
        console.log(userRoles);
        if(userRoles.includes('admin')){
          console.log("You have the authorization to use this.")
          deleteVideo();
        }
        else{
          console.log("You dont have the authorization to use this.");
        }
      })
    }
    catch(TypeError){
      console.log(TypeError)
    }
  
  });


  $("#videoPage").click(function () {
    try{
      getUserInfo().then(result => {
        clientInfo = result
        console.log(clientInfo);
        userRoles = clientInfo['userRoles']
        console.log(userRoles);
        if(userRoles.includes('admin')){
          window.location = 'view_Videos.html';
          console.log("You have the authorization to use this.")
        }
        else{
          console.log("You dont have the authorization to use this.");
        }
      })
    }
    catch(TypeError){
      console.log(TypeError)
    }
    //editImages();
  });

  $("#viewUsers").click(function () {

    getAssetList();
  });

  //Handler for the new asset submission button
  $("#subNewForm").click(function () {
    console.log("Button clicked");
    //Execute the submit new asset function
    submitNewAsset();

  });
  $("#userLogin").click(function () {
    console.log("Button clicked");
    //Execute the submit new asset function
    submitNewUser();

  });
});
function submitNewAsset() {

  submitData = new FormData();
  //Get form variables and append them to the form data object
  submitData.append('FileName', $('#FileName').val());
  submitData.append('userID', $('#userID').val());
  submitData.append('userName', $('#userName').val());
  submitData.append('genre', $('#genre').val());
  submitData.append('producer', $('#producer').val());
  submitData.append('publisher', $('#publisher').val());
  submitData.append('ageRating', $('#ageRating').val());
  submitData.append('File', $("#UpFile")[0].files[0]); 

  //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({
    url: postVideo,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function (data) {

    }
  });
}
//A function to submit a new asset to the REST endpoint 

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages() {
  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
  $.getJSON(retrieveAllVideos, function (data) {
    //Create an array to hold all the retrieved assets
    var items = [];

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each(data, function (key, val) {
      var datatest = 0;
      items.push("<li id = 'Test'> <hr />");
      items.push("<button  id = DeleteImages type=button onClick=deleteVideo('"+ val["id"] +"') class='btn btn-primary'> Delete Video </button> <br />");
      items.push('<script>function myFunction() {var x = document.getElementById("EditImages");console.log("Test")}</script>');
      items.push("File : " + val["fileName"] + "<br />");
      items.push("<button  id = EditImages type=button onClick=editRating('"+ val["id"] +"') class='btn btn-primary'> Edit Video </button>");
      items.push("<label for='ratings'>Rate Video:</label><select name='ratings' id='ratings'><option value='one'>1</option><option value='two'>2</option><option value='three'>3</option><option value='four'>4</option><option value='five'>5</option></select> <br />");
      items.push("Uploaded by: " + val["producer"] + " (user id: " + val["userID"] + ") <br />");
      items.push("<video src='" + BLOB_ACCOUNT + val["filepath"] +  "'type=video/mp4 controls='controls autoplay' width='500' /> </video><br />")
      items.push("<hr /> </li>");
    });
    //Clear the assetlist div
    $('#ImageList').empty();
    //Append the contents of the items array to the ImageList Div
    $("<ul/>", {
      "class": "my-new-list",
      html: items.join("")
    }).appendTo("#ImageList");
    //console.log(items);
    //editImages(items);
  });
}
function getAssetList() {
  console.log("Test Asset List");
  //Replace the current HTML in that div with a loading message
  $('#userList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
  console.log("Test2");
  $.getJSON(getAllUsers, function (data) {
    //Create an array to hold all the retrieved assets
    var items = [];
    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each(data, function (key, val) {
      items.push("<hr />")
      items.push("userID: " + val["userID"] + ", Username: " + val["userName"] + "<br/>");
      items.push("First Name: " + val["fName"] + ", Last Name: " + val["lName"] + "<br/>");
      items.push("Address Line 1: " + val["addressLine1"] + "<br/>");
      items.push("Address Line 2: " + val["addressLine2"] + "<br/>");
      items.push("Phone Number: " + val["phoneNumber"] + "<br/>");
      items.push('<button type="button" id="subNewForm" class="btn btn-primary" onclick="deleteUser(' + val["userID"] + ')">Delete</button> <br/><br/>');
      items.push("<hr />")
    });
    //Clear the assetlist div
    $('#userList').empty();
    //Append the contents of the items array to the AssetList Div
    $("<ul/>", {
      "class": "my-new-list",
      html: items.join("")
    }).appendTo("#userList");
  });
}
function submitNewUser(){
  //Construct JSON Object for new item
  var subObj = {
    fName: $('#FName').val(),
    lName: $('#LName').val(),
    userName: $('#userName').val(),
    addressLine1: $('#address1').val(),
    addressLine2: $('#address2').val(),
    phoneNumber: $('#phoneNum').val(),
  }
  //Convert to a JSON String
  subObj = JSON.stringify(subObj);
  //Post the JSON string to the endpoint, note the need to set the content type header
  $.post({
  url: userLogin,
  data: subObj,
  contentType: 'application/json; charset=utf-8'
  }).done(function (response) {
  getAssetList();
  });
}

function deleteVideo(id){
  console.log(id);
  getUserInfo().then(result => {
    clientInfo = result
    console.log(clientInfo);
    userRoles = clientInfo['userRoles']
    console.log(userRoles);
    if(userRoles.includes('admin')){
      $.ajax({
        type: "DELETE",
        //Note the need to concatenate the
        url: deleteVideoFirst + id + deleteVideoSecond,
        }).done(function( msg ) {
        //On success, update the assetlist.
        getImages();
        });
      //Delete the selected video from the asset list
      $('#Test').remove();
    }
    else{
      console.log("You dont have the authorization to use this.");
    }
  })
}


async function getUserInfo() {
  const response = await fetch('/.auth/me');
  const payload = await response.json();
  const { clientPrincipal } = payload;
  return clientPrincipal;
  console.log(await getUserInfo());
}

function deleteUser(id){
  getUserInfo().then(result => {
    clientInfo = result
    console.log(clientInfo);
    userRoles = clientInfo['userRoles']
    console.log(userRoles);
    if(userRoles.includes('admin')){
      console.log("You have the authorization to use this.")
      $.ajax({
        type: "DELETE",
        //Note the need to concatenate the
        url: deleteUserFirst + id + deleteUserSecond,
        }).done(function( msg ) {
        //On success, update the assetlist.
        getAssetList();
        });
    }
    else{
      console.log("You dont have the authorization to use this.");
    }
  })
  //$.ajax({
    //type: "DELETE",
    //Note the need to concatenate the
    //url: deleteUserFirst + id + deleteUserSecond,
    //}).done(function( msg ) {
    //On success, update the assetlist.
    //getAssetList();
    //});
  //Delete the selected video from the asset list
  //$('#Test').remove();
}
function editRating(id) {

  submitData = new FormData();
  //Get form variables and append them to the form data object
  submitData.append('rating', $('#ratings').val());

  //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({
    url: editRatingFirst + id + editRatingSecond,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'PUT',
    success: function (data) {

    }
  });
}