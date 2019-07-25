<template>
  <div>
    <div class="google-map-view" ref="googleMapRef"></div>
    <!-- <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot :google="google" :map="map" :googleMarkers="googleMarkers"/>
    </template>-->
  </div>
</template>

<script>
import _ from "lodash";
import GoogleMapsApiLoader from "google-maps-api-loader";

import { POINT_MARKER_ICON_CONFIG } from "@/constants/mapSettings";

export default {
  name: "GoogleMapLoader",

  props: {
    mapConfig: Object,
    apiKey: String,
    markers: Array
  },

  data() {
    return {
      google: null,
      map: null,
      googleMarkers: [],
      contentString: ""
    };
  },

  async mounted() {
    // load google map using api
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    });
    this.google = googleMapApi;
    this.init();
  },

  methods: {
    // initialize google map
    init() {
      const mapContainer = this.$refs.googleMapRef;
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig);

      this.addAllmarkers();
    },

    // create and add all markers to map
    addAllmarkers() {
      this.deleteMarkers();

      _.forEach(this.markers, marker => {
        this.addMarker(marker);
      });
    },

    getGreenToRed(percent) {
      const r = percent < 50 ? 255 : Math.floor((percent * 2) / 255 / 100);
      const g = percent > 50 ? 200 : Math.floor((percent * 2 * 255) / 100);
      return "rgb(" + r + "," + g + ",0)";
    },
    // adds a marker at the center of the map.
    addMarker(marker) {
      const { Marker, Animation, InfoWindow } = this.google.maps;

      const newIcon = {
        ...POINT_MARKER_ICON_CONFIG,
        fillColor: this.getGreenToRed(marker.pricePercent)
      };

      let infoWindow = new InfoWindow({
        content:
          '<div class="el-notification__group">' +
          '<span class="el-notification__title">$' +
          marker.priceString +
          "<span>" +
          '<div class="el-notification__content"><b>' +
          marker.address +
          "</b></div>" +
          "</div>"
      });
      // console.log(POINT_MARKER_ICON_CONFIG);

      let newMarker = new Marker({
        position: marker.position,
        marker: marker,
        animation: Animation.DROP,
        map: this.map,
        icon: newIcon
      });

      newMarker.addListener("mouseover", () => {
        infoWindow.open(this.map, newMarker);
        newMarker.setAnimation(Animation.BOUNCE);
      });

      newMarker.addListener("mouseout", () => {
        infoWindow.close();
        if (newMarker.getAnimation() !== null) {
          newMarker.setAnimation(null);
        }
      });

      this.googleMarkers.push(newMarker);
    },
    // sets the map on all markers in the array.
    setMapOnAll(map) {
      for (var i = 0; i < this.googleMarkers.length; i++) {
        this.googleMarkers[i].setMap(map);
      }
    },

    // shows any markers currently in the array.
    showMarkers() {
      this.setMapOnAll(this.map);
    },

    // removes the markers from the map, but keeps them in the array.
    clearMarkers() {
      this.setMapOnAll(null);
    },

    // deletes all markers in the array by removing references to them.
    deleteMarkers() {
      this.clearMarkers();
      this.googleMarkers = [];
    }
  },

  watch: {
    markers() {
      // if (!this.data.maps) return;
      if (this.map === null) return;

      this.addAllmarkers();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.google-map-view {
  width: 100%;
  min-height: 100%;
  background-color: rgb(200, 200, 200);
}
</style>
