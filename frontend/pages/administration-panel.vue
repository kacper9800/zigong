<template>
  <div>
    <a-menu v-model="current" mode="horizontal" theme="dark">
      <a-menu-item key="products"> <a-icon type="appstore" />Products</a-menu-item>
      <a-menu-item key="resources"> <a-icon type="file" />Resources</a-menu-item>
      <a-menu-item key="users"> <a-icon type="team" />Users</a-menu-item>
      <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper">
          <a-icon type="setting" />Navigation Three - Submenu</span>
        <a-menu-item-group title="Item 1">
          <a-menu-item key="setting:1">
            Option 1
          </a-menu-item>
          <a-menu-item key="setting:2">
            Option 2
          </a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="Item 2">
          <a-menu-item key="setting:3">
            Option 3
          </a-menu-item>
          <a-menu-item key="setting:4">
            Option 4
          </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item key="mode"> <a-icon type="bulb" />Mode</a-menu-item>
      <a-menu-item key="language"> <a-icon type="flag" />Language</a-menu-item>
    </a-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        current: ['mail'],
      };
    },
  };
</script>
