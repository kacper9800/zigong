<template>
  <div>
    <a-menu style="width: 256px"
            :open-keys.sync="openKeys" mode="inline" @click="handleClick">
      <a-sub-menu key="sub">
        <span slot="title"><a-icon type="info-circle"/><span>About</span></span>
        <a-menu-item key="1">
          Organization
        </a-menu-item>
        <a-menu-item key="2">
          Who We Are
        </a-menu-item>
        <a-menu-item key="3">
          Our Facilities
        </a-menu-item>
        <a-menu-item key="4">
          Capabilities
        </a-menu-item>
        <a-menu-item key="5">
          Our Credentials
        </a-menu-item>
        <a-menu-item key="6">
          Quality Certification
        </a-menu-item>
        <a-menu-item key="7">
          Conflict-Free Minerals
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        current: ["mail"],
        openKeys: ["sub"]
      };
    },
    watch: {
      openKeys(val) {
        console.log("openKeys", val);
      }
    },
    methods: {
      handleClick(e) {
        console.log("click", e);
      },
      titleClick(e) {
        console.log("titleClick", e);
      }
    }
  };
</script>

<style scoped>

</style>
