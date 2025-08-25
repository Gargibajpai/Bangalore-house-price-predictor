function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        return parseInt(i)+1;
    }
  } 
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations").value;
    var url = "http://127.0.0.1:5000/predict_home_price"; 

    $.ajax({
        url: url,
        type: "POST",
        data: {
            total_sqft: parseFloat(sqft),
            bhk: bhk,
            bath: bathrooms,
            location: location
        },
        success: function(data) {
            console.log("Response:", data);
            document.getElementById("uiEstimatedPrice").innerHTML =
                "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        },
        error: function(xhr, status, error) {
            console.error("Error:", xhr.responseText);
            document.getElementById("uiEstimatedPrice").innerHTML =
                "<h2>Error: " + xhr.responseText + "</h2>";
        }
    });
}


function onPageLoad() {
    console.log("document loaded");
    var url = "/get_location_names"; // Flask endpoint
    $.get(url, function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}
