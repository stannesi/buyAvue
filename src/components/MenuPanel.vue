<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-input placeholder="City, ZIP" v-model="address" @change="updateMap" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <span>Baths</span>
      </el-col>
      <el-col :span="12">
        <span>Property Type</span>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-select v-model="bathroom" placeholder="Bathrooms" @change="updateMap">
          <el-option
            v-for="bath in config.bathrooms"
            :key="bath.value"
            :label="bath.text"
            :value="bath.value"
          ></el-option>
        </el-select>
      </el-col>
      <!-- Bathrooms
        <select v-model="bathroom" @change="updateMap">
          <option disabled value>Bathrooms</option>
          <option v-for="bath in config.bathrooms" v-bind:value="bath.value">{{ bath.text }}</option>
      </select>-->
      <el-col :span="12">
        <el-select v-model="resType" placeholder="Property Type" @change="updateMap">
          <el-option
            v-for="type in config.resTypes"
            :key="type.value"
            :label="type.text"
            :value="type.value"
          ></el-option>
        </el-select>
      </el-col>

      <!-- Res Type:
        <select v-model="resType" @change="updateMap">
          <option disabled value>Res Type</option>
          <option v-for="type in config.resTypes" v-bind:value="type.value">{{ type.text }}</option>
      </select>-->
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <span><b>PRICE</b></span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div>Min</div>
      </el-col>
      <el-col :span="12">
        <span>Max</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input placeholder="Min price" v-model="priceMin" @change="updateMap" clearable></el-input>
        <!-- Price Min:
        <input placeholder="Min" v-model="priceMin" @change="updateMap" type="number">-->
      </el-col>

      <el-col :span="12">
        <el-input placeholder="Max price" v-model="priceMax" @change="updateMap" clearable></el-input>
        <!-- to Max
        <input placeholder="Max" v-model="priceMax" @change="updateMap" type="number">-->
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <span><b>AMENITIES</b></span>
      </el-col>
    </el-row>

    <el-row :gutter="0">
      <el-col :span="12">
        <div>AC</div>
      </el-col>
      <el-col :span="12">
        <span>Fire Place</span>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-switch v-model="ac" @change="updateMap"></el-switch>
      </el-col>
      <el-col :span="12">
        <el-switch v-model="firePlace" @change="updateMap"></el-switch>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EventBus from "@/events/EventBus";

export default {
  name: "MenuPanel",

  data() {
    return {
      config: {
        bathrooms: [
          { text: "Any", value: 0 },
          { text: "1 Bath", value: 1 },
          { text: "2 Bath", value: 2 },
          { text: "3+ Bath", value: 3 }
        ],
        resTypes: [
          { text: "Any", value: "no min" },
          { text: "1 Story", value: "one story" },
          { text: "2 Story", value: "two story" },
          { text: "3 Story", value: "three story" }
        ]
      },

      address: "",
      bathroom: null,
      resType: null,
      priceMin: null,
      priceMax: null,
      ac: false,
      firePlace: false
    };
  },

  methods: {
    updateMap() {
      const {
        address,
        bathroom,
        resType,
        priceMin,
        priceMax,
        ac,
        firePlace
      } = this;

      const payload = {
        address,
        bathroom,
        resType,
        priceMin,
        priceMax,
        ac,
        firePlace
      };
      EventBus.$emit("UPDATE_MAP", payload);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
