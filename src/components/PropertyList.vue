<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" v-for="property in propertyList" :key="property.id">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <el-container>
            <div style="padding:5px 0 0 5px">
              <!-- <el-avatar shape="square" :size="avatarSize" :src="avatarUrl"></el-avatar> -->
              <img
                src="./../assets/logo.png"
                class="image"
              >
            </div>
            <div class="el-notification__group" style="padding-top:5px">
              <span class="el-notification__title">${{property.price}}</span>
              <div class="el-notification__content">{{property.address}}</div>
              <div class="el-notification__content">{{property.desc}}</div>
            </div>
          </el-container>
          <!-- <img src="./../assets/logo.png" class="image"> -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EventBus from "@/events/EventBus";

export default {
  name: "PropertyList",

  data() {
    return {
      avatarSize: 80,
      avatarUrl: "assets/logo.png",
      propertyList: []
    };
  },

  created() {
    EventBus.$on("UPDATE_LIST", payload => {
      // this.markers = [];
      // this.$children[0].deleteMarkers();
      this.updateList(payload);
    });
  },

  methods: {
    updateList(payload) {
      // const vm = this;

      this.propertyList = payload.map((item, index) => {
        const property = {
          id: index,
          price: item.ESTIMATED_MARKET_VALUE,
          address: item["Full Address"],
          desc: item.CLASS_DESCRIPTION
        };

        return property;
      });

      // console.log(this.propertyList);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row {
  margin-bottom: 20px;
}

  .image {
    width: 80PX;
    display: block;
}
</style>
