(function (window, document, undefined) {

  'use strict'

  window.connectToSocket = function (host, path) {
    window.connection = io(host, {
      path: '/' + path,
      forceNew: false
    });

    window.connection.on('connect', function() {
      console.log('Connected');
    });
  }

  window.addSocketListener = function (context, event, callback) {
    var listener = window.connection.emit('join', context);

    listener.on(event, function(data) {
      callback(data);
    });
  }

  window.pulseNode = function (data) {
    if (window.hosts) {
      var identity = data.value.node.split('.');
      var serial = identity[1];

      var existingLayer = document.getElementById(serial);

      if (existingLayer) {
        window.animateMarker(existingLayer);
      }
    }
  }

  window.addHostsToMap = function (hosts) {
    window.hosts = hosts;

    window.hosts.forEach(function (host) {
      window.addHostToMap(host);
    })
  }

  window.addHostToMap = function (host) {
    /*var existingLayer = window.map.getSource(host.serial);

    if (existingLayer || !host.geo) return;

    window.map.addSource(host.serial, {
      "type": "geojson",
      "data": {
        "type": "Point",
        "coordinates": [
          host.geo.longitude, host.geo.latitude
        ]
      }
    });

    window.map.addLayer({
      "id": host.serial,
      "source": host.serial,
      "type": "circle",
      "paint": {
        "circle-radius": 8,
        "circle-radius-transition": {duration: 100},
        "circle-opacity-transition": {duration: 0},
        "circle-color": "#ef711d"
      }
    });

    function startAnimation (timestamp) {
      requestAnimationFrame(startAnimation);
    };

    startAnimation(0);*/


    if (document.getElementById(host.serial) || !host.geo) return;

    // create a HTML element for each feature
    var el = document.createElement('div');
        el.className = 'dadiNode';
        el.id = host.serial;

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat([host.geo.longitude, host.geo.latitude])
      .addTo(window.map);
  }

  window.animateMarker = function (geo) {
    if (!geo.classList.contains('dadiNode--pulse')) {
      geo.classList.add('dadiNode--pulse');
      setTimeout(function () {
        geo.classList.remove('dadiNode--pulse');
      }, 2000);
    }
  }

})(window, document)