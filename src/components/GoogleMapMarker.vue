<script>
import { POINT_MARKER_ICON_CONFIG } from "@/constants/mapSettings";

export default {
  name: "GoogleMapMarker",

  props: {
    google: {
      type: Object,
      required: true
    },

    map: {
      type: Object,
      required: true
    },

    googleMarkers: {
      type: Array,
      required: true
    },

    marker: {
      type: Object,
      required: true
    }
  },

  mounted() {
    const { Marker } = this.google.maps;

    const newIcon = { ...POINT_MARKER_ICON_CONFIG, fillColor: "red" };

    // console.log(POINT_MARKER_ICON_CONFIG);
    let marker = new Marker({
      position: this.marker.position,
      marker: this.marker,
      animation: this.google.maps.Animation.DROP,
      map: this.map,
      icon: newIcon
    });

    this.googleMarkers.push(marker);

    // console.log(this.googleMarkers);
    // marker.addListener("mouseover", () => {
    //   if (marker.getAnimation() !== null) {
    //     marker.setAnimation(null);
    //   } else {
    //     marker.setAnimation(this.google.maps.Animation.BOUNCE);
    //   }
    // });
  },

  // methods

  render() {}
};
</script>
