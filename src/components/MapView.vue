<template>
  <!-- insert google maps with api -->
  <GoogleMapLoader :markers="markers" :mapConfig="mapConfig" apiKey>
    <!-- <template slot-scope="{ google, map, googleMarkers }">
      <GoogleMapMarker
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :google="google"
        :map="map"
        :googleMarkers="googleMarkers"
      />
    </template>-->
  </GoogleMapLoader>
</template>

<script>
import _ from "lodash";

import EventBus from "@/events/EventBus";

import jsonData from "@/data/properties.json";

import GoogleMapLoader from "./GoogleMapLoader";
// import GoogleMapMarker from "./GoogleMapMarker";

import { mapSettings } from "@/constants/mapSettings";

export default {
  name: "MapView",

  components: {
    GoogleMapLoader
    // GoogleMapMarker
  },

  data() {
    return {
      filteredData: [],
      markers: []
    };
  },

  created() {
    EventBus.$on("UPDATE_MAP", payload => {
      // this.markers = [];
      // this.$children[0].deleteMarkers();
      this.filterMapData(payload);
    });
  },

  mounted() {
    this.populateMarker(this.propertyData);
  },

  computed: {
    propertyData() {
      return jsonData;
    },
    mapConfig() {
      return {
        ...mapSettings,
        center: this.mapCenter
      };
    },
    mapCenter() {
      return this.markers.length > 0
        ? this.markers[0].position
        : { lat: 41.8862, lng: -87.6519 };
    },

    getHighestPrice() {
      const maxValue = Math.max.apply(
        Math,
        this.propertyData.map(data => {
          const { ESTIMATED_MARKET_VALUE: price } = data;

          return Number(price.trim().replace(/,/g, ""));
        })
      );
      // const maxValue = this.propertyData.reduce(function(accumulator, currentValue) {
      //   const { ESTIMATED_MARKET_VALUE: aPrice } = accumulator;
      //   const { ESTIMATED_MARKET_VALUE: cPrice } = currentValue;

      //   const acc = Number(aPrice.replace(/,/g, ""));
      //   const cur = Number(cPrice.replace(/,/g, ""));

      //   return (acc > cur) ? acc : cur;
      // });

      return maxValue;
    }
  },

  methods: {
    populateMarker(data) {
      const vm = this;

      this.markers = [];

      _.forEach(data, function(value, key) {
        vm.markers.push(vm.createMarker(value, key));
      });

      // this.$children[0].addAllmarkers();
    },

    createMarker(data, id) {
      const {
        Latitude,
        Longitude,
        ESTIMATED_MARKET_VALUE,
        "Full Address": fullAddress
      } = data;

      const ePrice = this.getPriceNumber(ESTIMATED_MARKET_VALUE.trim());

      const marker = {
        id: id,
        address: fullAddress.trim(),
        pricePercent: this.getPricePercentage(ePrice),
        price: ePrice,
        priceString: ESTIMATED_MARKET_VALUE.trim(),
        position: {
          lng: parseFloat(Latitude),
          lat: parseFloat(Longitude)
        }
      };

      return marker;
    },

    getPriceNumber(price) {
      return Number(price.replace(/,/g, ""));
    },

    getPricePercentage(price) {
      return Number((price / this.getHighestPrice) * 100);
    },

    filterByBathroom(dataFullBath, bathroom) {
      if (bathroom === 0) return true;

      if (bathroom < 3) {
        return bathroom === Number(dataFullBath);
      } else {
        return Number(dataFullBath) >= 3;
      }
    },

    filterByAC(dataAC, ac) {
      if (!ac) return true;

      return Number(dataAC) > 0 ? true : false;
    },

    filterByfirePlace(dataFirePlace, firePlace) {
      if (!firePlace) return true;

      return Number(dataFirePlace) > 0 ? true : false;
    },

    filterByResType(dataRestType, resType) {
      if (resType.toLowerCase() === "no min") return true;

      return resType.toLowerCase() === dataRestType.trim().toLowerCase();
    },

    filterByPrice(dataPrice, minPrice, maxPrice) {
      if (!minPrice) minPrice = 0;
      if (!minPrice) maxPrice = 9999999;

      const price = this.getPriceNumber(dataPrice.trim());
      return price >= Number(minPrice) && price <= Number(maxPrice);
    },

    filterMapData(filter) {
      const {
        address,
        bathroom,
        resType,
        priceMin,
        priceMax,
        ac,
        firePlace
      } = filter;

      this.filteredData = _.filter(this.propertyData, data => {
        if (address.trim() === "") return true;

        // {"Full Address": fullAddress,}
        const { CITY: city, Zip: zip } = data;
        return (
          city.trim().toLowerCase() === address.toLowerCase() ||
          Number(zip) === Number(address)
          // fullAddress.trim().toLowerCase() === address.toLowerCase()
        );
      })
        // filter
        .filter(data => {
          const {
            FULL_BATH: fullBath,
            RES_TYPE,
            AC,
            FIREPLACE,
            ESTIMATED_MARKET_VALUE
          } = data;

          return (
            this.filterByBathroom(fullBath, bathroom) &&
            this.filterByResType(RES_TYPE, resType) &&
            this.filterByPrice(ESTIMATED_MARKET_VALUE, priceMin, priceMax) &&
            this.filterByAC(AC, ac) &&
            this.filterByfirePlace(FIREPLACE, firePlace)
          );
        });

      // this.populateMarker(this.filteredData);
      // console.log(this.filteredData);
    }
  },

  watch: {
    filteredData(newVal) {
      this.populateMarker(newVal);

      EventBus.$emit("UPDATE_LIST", this.filteredData);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
