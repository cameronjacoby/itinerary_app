$(function() {

  var itineraryItems = [
    {
      name: "British Museum",
      address: "Great Russell St, London WC1B 3DG, United Kingdom",
      lat: 51.5194133,
      lng: -0.1291453,
      image: "images/british_museum.png",
      category: "museum",
      website: "http://www.britishmuseum.org"
    },
    {
      name: "Buckingham Palace",
      address: "London SW1A 1AA, United Kingdom",
      lat: 51.501364,
      lng: -0.1440787,
      image: "images/buckingham_palace.png",
      category: "palace",
      website: "https://www.royalcollection.org.uk/visit/the-state-rooms-buckingham-palace"
    },
    {
      name: "National Gallery",
      address: "Trafalgar Square, London WC2N 5DN, United Kingdom",
      lat: 51.508929,
      lng: -0.1304877,
      image: "images/national_gallery.png",
      category: "museum",
      website: "http://www.nationalgallery.org.uk/"
    },
    {
      name: "Harrod's",
      address: "87-135 Brompton Rd, London SW1X 7XL, United Kingdom",
      lat: 51.4994055,
      lng: -0.1654231,
      image: "images/harrods.png",
      category: "shopping",
      website: "http://www.harrods.com"
    },
    {
      name: "Borough Market",
      address: "8 Southwark St, London SE1 1TL, United Kingdom",
      lat: 51.5054462,
      lng: -0.0932684,
      image: "images/borough_market.png",
      category: "dining",
      website: "http://boroughmarket.org.uk/"
    },
    {
      name: "Tate Modern",
      address: "Bankside, London SE1 9TG, United Kingdom",
      lat: 51.5075953,
      lng: -0.101545,
      image: "images/tate_modern.png",
      category: "museum",
      website: "http://www.tate.org.uk"
    }
  ];

  var source = $('#item-template').html();
  var template = Handlebars.compile(source);
  var itemsHtml = template({ items: itineraryItems });
  $('.itinerary-list').append(itemsHtml);

  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 51.505, lng: -0.13 },
    zoom: 12
  });

  var infoWindow = new google.maps.InfoWindow();

  itineraryItems.forEach(function (item) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(item.lat, item.lng),
      map: map
    });

    var contentString = '<img src="' + item.image + '" width="100"><div class="item-info"><p><strong>' + item.name + '</strong></p><p>' + item.address + '</p><p class="external-link"><a href="' + item.website + '"><i class="fa fa-external-link"></i></a></p></div>';

    marker.addListener('click', function() {
      infoWindow.close();
      infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
    });
  });

  $('.toggle').on('click', function() {
    console.log('clicked');
    var toggleId = $(this).attr('data-toggle');
    console.log(toggleId);
    var $toggleElement = $('.toggle-items#' + toggleId);
    $('.toggle-items').css('display', 'none');
    $toggleElement.css('display', 'block');
    google.maps.event.trigger(map, 'resize');
    map.setCenter({ lat: 51.505, lng: -0.13 });
  });

});