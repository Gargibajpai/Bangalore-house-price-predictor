// client/app.js
function onPageLoad() {
  console.log("document loaded");

  // <-- IMPORTANT: full backend URL (Flask server)
  var url = "http://127.0.0.1:5000/get_location_names";

  $.get(url, function(data, status) {
    console.log("got response for get_location_names request", data);
    if (data && data.locations) {
      $('#uiLocations').empty();
      data.locations.forEach(function(loc) {
        // create <option> with value and text
        var opt = $('<option>').val(loc).text(loc);
        $('#uiLocations').append(opt);
      });
    } else {
      console.warn("No locations found in response", data);
    }
  }).fail(function(xhr, status, err) {
    console.error("GET /get_location_names failed:", status, err, xhr.responseText);
  });
}

$(document).ready(onPageLoad);
