<template>
  <div id="app">
    <!-- <img width="25%" src="./assets/logo.png"> -->
    <header>
      <h1>BuyAvue</h1>
    </header>

    <el-row>
      <el-col :xs="14" :sm="10" :md="10" :lg="10" :xl="10">
        <el-card class="box-card">
          <MenuPanel/>
        </el-card>
        <PropertyList/>
      </el-col>

      <el-col :xs="10" :sm="14" :md="14" :lg="14" :xl="14">
        <MapView class="map-view"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MenuPanel from "./components/MenuPanel";
import MapView from "./components/MapView";
import PropertyList from "./components/PropertyList";

export default {
  name: "App",
  components: {
    MapView,
    MenuPanel,
    PropertyList
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* margin-top: 60px; */
}

header {
  text-align: center;
}

.container {
  align-items: stretch;
  line-height: 0;
}

.map-view {
  height: 800px;
}
</style>
