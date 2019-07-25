<template>
  <div id="map" class="map-view-old">
    <!-- <div id="map"></div> -->
    <!-- <iframe width="100px" height></iframe> -->
  </div>
</template>

<script>
import gmapsInit from "@/utils/gmaps.js";

export default {
  name: "MapViewOld",
  // props: {
  //   msg: String
  // }
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el);

      geocoder.geocode({ address: `Chicago, IL` }, (results, status) => {
        if (status !== `OK` || !results[0]) {
          throw new Error(status);
        }
        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });

      // const markerClickHandler = marker => {
      //   map.setZoom(13);
      //   map.setCenter(marker.getPosition());
      // };
      // const markers = locations.map(location => {
      //   const marker = new google.maps.Marker({ ...location, map });
      //   marker.addListener(`click`, () => markerClickHandler(marker));
      //   return marker;
      // });

      // eslint-disable-next-line no-new
      // new MarkerClusterer(map, markers, {
      //   imagePath: `https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m`,
      // });
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map-view-old {
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgb(200, 200, 200);
}
</style>
