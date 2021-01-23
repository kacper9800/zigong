<template>
  <a-layout-header class="header">
    <div class="logo"/>
    <a-menu mode="horizontal" theme="dark">
      <a-menu-item v-for="page in pagesData" :key="page.name">
        <nuxt-link :to="page.path">
          <a-icon :type="page.icon"/>
          {{ page.name }}
        </nuxt-link>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script>
  export default {
    layout: "admin",
    data() {
      return {
        mainPath: "/admin",
        pagesData: [
          { path: "/home", name: "Home", icon: "home" },
          { path: "/about", name: "About", icon: "info-circle" },
          { path: "/products", name: "Products", icon: "appstore" },
          { path: "/resources", name: "Resources", icon: "file" },
          { path: "/join-us", name: "Join us", icon: "form" },
          { path: "/contact-us", name: "Contact us", icon: "idcard" }
        ],
      };
    }
  };
</script>
