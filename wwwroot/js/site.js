﻿// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initMap() {
    const bounds = new google.maps.LatLngBounds();
    const geocoder = new google.maps.Geocoder();
    const matrix_service = new google.maps.DistanceMatrixService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -15.82041353758197, lng: -48.06981374086924 },
      zoom: 13,
      mapTypeControl: false,
    });
    directionsRenderer.setMap(map);
    const card = document.getElementById("pac-card");
    const input = document.getElementById("pac-input");
    const dest = document.getElementById("pac-input-dest")
    const biasInputElement = document.getElementById("use-location-bias");
    const strictBoundsInputElement = document.getElementById("use-strict-bounds");
    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
      types: ["establishment"],
    };
  
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
  
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    const autocomplete_dest = new google.maps.places.Autocomplete(dest, options);
  
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo("bounds", map);
    autocomplete_dest.bindTo("bounds", map);
  
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");
  
    infowindow.setContent(infowindowContent);
  
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });
    const marker_dest = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });
  
    autocomplete.addListener("place_changed", () => {
      infowindow.close();
      marker.setVisible(false);
  
      const place = autocomplete.getPlace();
  
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
  
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
  
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      infowindowContent.children["place-name"].textContent = place.name;
      infowindowContent.children["place-address"].textContent =
        place.formatted_address;
      infowindow.open(map, marker);
      //calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
  
    autocomplete_dest.addListener("place_changed", () => {
      infowindow.close();
      marker_dest.setVisible(false);
  
      const place = autocomplete_dest.getPlace();
  
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
  
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
  
      marker_dest.setPosition(place.geometry.location);
      marker_dest.setVisible(true);
      infowindowContent.children["place-name"].textContent = place.name;
      infowindowContent.children["place-address"].textContent =
        place.formatted_address;
      infowindow.open(map, marker_dest);
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
  
    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
      const radioButton = document.getElementById(id);
  
      radioButton.addEventListener("click", () => {
        autocomplete.setTypes(types);
        autocomplete_dest.setTypes(types);
        input.value = "";
      });
    }
  
    setupClickListener("changetype-all", []);
    setupClickListener("changetype-address", ["address"]);
    setupClickListener("changetype-establishment", ["establishment"]);
    setupClickListener("changetype-geocode", ["geocode"]);
    setupClickListener("changetype-cities", ["(cities)"]);
    setupClickListener("changetype-regions", ["(regions)"]);
    biasInputElement.addEventListener("change", () => {
      if (biasInputElement.checked) {
        autocomplete.bindTo("bounds", map);
        autocomplete_dest.bindTo("bounds", map);
      } else {
        // User wants to turn off location bias, so three things need to happen:
        // 1. Unbind from map
        // 2. Reset the bounds to whole world
        // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
        autocomplete.unbind("bounds");
        autocomplete_dest.unbind("bounds");
        autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
        autocomplete_dest.setBounds({ east: 180, west: -180, north: 90, south: -90 });
        strictBoundsInputElement.checked = biasInputElement.checked;
      }
  
      input.value = "";
    });
    strictBoundsInputElement.addEventListener("change", () => {
      autocomplete.setOptions({
        strictBounds: strictBoundsInputElement.checked,
      });
      autocomplete_dest.setOptions({
        strictBounds: strictBoundsInputElement.checked,
      });
      if (strictBoundsInputElement.checked) {
        biasInputElement.checked = strictBoundsInputElement.checked;
        autocomplete.bindTo("bounds", map);
        autocomplete_dest.bindTo("bounds", map);
      }
  
      input.value = "";
    });
  
    function calculateAndDisplayRoute(directionsService, directionsRenderer) {
      const start = document.getElementById("pac-input").value;
      const end = document.getElementById("pac-input-dest").value;
      const request = {
        origins: [start],
        destinations: [end],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      };
      directionsService
        .route({
          origin: start,
          destination: end,
          travelMode: "DRIVING",
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
        })
        .catch((e) =>
          window.alert("Directions request failed due to " + status)
        );
      matrix_service
        .getDistanceMatrix(request)
        .then((response) =>{
          document.getElementById("distancia").innerText = response.rows[0].elements[0].distance.text;
        })
        .catch((e) =>
          window.alert("Directions matrix request failed due to " + status)
        );
    }
  }
  
  
  window.initMap = initMap;
