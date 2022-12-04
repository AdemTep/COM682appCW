//The URIs of the REST endpoint
postVideo = "https://prod-03.eastus.logic.azure.com/workflows/0492ef47c83940e2a073c809fc5fbb29/triggers/manual/paths/invoke/rest/v1/videos?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QaaT_oFF9-M9maipmE0Un-TPuoTyw74sX5jkqLUJZ0Y";
retrieveAllVideos = "https://prod-22.centralus.logic.azure.com/workflows/05d9a938f5864107a57440ecec679c3d/triggers/manual/paths/invoke/rest/v1/videos?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=i3BfJwpgaSQW1hE5oSh70wk3HQjGAsdAUf5lokTjJsw"

BLOB_ACCOUNT = "https://blobstoragecom682tep.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function () {


  $("#retImages").click(function () {

    //Run the get asset list function
    getImages();

  });

  $("#EditImages").click(function () {

    editImages();
  });

  //Handler for the new asset submission button
  $("#subNewForm").click(function () {
    console.log("Button clicked");
    //Execute the submit new asset function
    submitNewAsset();

  });
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset() {

  submitData = new FormData();
  //Get form variables and append them to the form data object
  submitData.append('FileName', $('#FileName').val());
  submitData.append('userID', $('#userID').val());
  submitData.append('userName', $('#userName').val());
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

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages() {
  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
  $.getJSON(retrieveAllVideos, function (data) {
    //Create an array to hold all the retrieved assets
    var items = [];

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each(data, function (key, val) {
      items.push("<hr />");
      items.push('<button  id = "EditImages" type="button" onClick = "editImages()"class="btn btn-primary"> Edit Images </button>');
      items.push('<script>function myFunction() {var x = document.getElementById("EditImages");console.log("Test")}</script>');
      items.push("File : " + val["fileName"] + "<br />");
      items.push("Uploaded by: " + val["userName"] + " (user id: " + val["userID"] + ")");
      items.push("<video src='" + BLOB_ACCOUNT + val["filepath"] + "'type=video/mp4 controls='controls autoplay' width='500' />")
      items.push("<hr");
    });
    //Clear the assetlist div
    $('#ImageList').empty();
    //Append the contents of the items array to the ImageList Div
    $("<ul/>", {
      "class": "my-new-list",
      html: items.join("")
    }).appendTo("#ImageList");
    //editImages(items);
  });


}

function editImages(){
  console.log();
}

