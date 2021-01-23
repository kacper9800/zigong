<template>
  <div class="nav-bar">
    <a-menu v-model="current" mode="horizontal" theme="dark">
      <a-menu-item key="home">
        <nuxt-link to="/administration-panel/home">
          <a-icon type="home"/>
          Home
        </nuxt-link>
      </a-menu-item>
      <a-menu-item key="products">
        <nuxt-link to="/administration-panel/products">
          <a-icon type="appstore"/>
          Products
        </nuxt-link>
      </a-menu-item>
      <a-menu-item key="resources">
        <nuxt-link to="/administration-panel/resources">
          <a-icon type="file"/>
          Resources
        </nuxt-link>
      </a-menu-item>
      <a-menu-item key="articles">
        <nuxt-link to="/administration-panel/articles">
          <a-icon type="file-text"/>
          Articles
        </nuxt-link>
      </a-menu-item>
      <a-menu-item key="users">
        <nuxt-link to="/administration-panel/users">
          <a-icon type="team"/>
          Users
        </nuxt-link>
      </a-menu-item>
      <a-menu-item key="mode">
        <a-icon type="bulb"/>
        Mode
      </a-menu-item>
      <a-menu-item key="language">
        <a-icon type="flag"/>
        Language
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
  export default {
    layout: "admin"
  };
</script>

<style scoped>

</style>
