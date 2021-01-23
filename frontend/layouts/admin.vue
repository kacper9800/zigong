<template>
  <a-layout id="components-layout-demo-top-side-2">
    <AdminHeader/>
    <a-layout>
      <AdminSider/>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0,
         minHeight: '280px' }">
          <Nuxt/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
  import AdminHeader from "../components/layout/header/AdminHeader";
  import AdminSider from "../components/layout/sider/AdminSider";

  export default {
    data() {
      return {
        collapsed: false
      };
    },
    components: {
      AdminSider,
      AdminHeader
    },
    mainPath: "/admin",
    pages: [
      {
        path: "/products", name: "Products", icon: "appstore",
        subPages: [
          { path: "powders", name: "Powders" },
          { path: "cemented-carbides", name: "Cemented Carbides" }
        ]
      },
      { path: "/articles", name: "Articles", icon: "file-text" },
      { path: "/resources", name: "Resources", icon: "file" },
      { path: "/users", name: "Users", icon: "team" }
    ],
    productsPath: "/products",
    products: []
  };
</script>

<style>
  #components-layout-demo-top-side-2 .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 28px 16px 0;
    float: left;
  }
</style>

<!--<template>-->
<!--  <a-layout id="components-layout-demo-top-side-2">-->
<!--    <a-layout-header class="header">-->
<!--      <AdminHeader/>-->
<!--    </a-layout-header>-->
<!--    <a-layout-sider width="200" style="background: #fff">-->
<!--      <a-menu mode="inline" :default-open-keys="['products']"-->
<!--              :style="{ height: '100%', borderRight: 0 }">-->
<!--        <a-sub-menu v-for="page in pages" :key="page.name">-->
<!--          <nuxt-link :to="page.path">-->
<!--              <span slot="title"><a-icon :type="page.icon"/>-->
<!--              {{ page.name }}-->
<!--              </span>-->
<!--            &lt;!&ndash;            <span v-if="page.subPages.length > 0">&ndash;&gt;-->
<!--            &lt;!&ndash;              <a-menu-item v-for="subPage in page.subPages" :key="subPage.name">&ndash;&gt;-->
<!--            &lt;!&ndash;                  {{ page.name }}&ndash;&gt;-->
<!--            &lt;!&ndash;              </a-menu-item>&ndash;&gt;-->
<!--            &lt;!&ndash;              </span>&ndash;&gt;-->
<!--          </nuxt-link>-->
<!--        </a-sub-menu>-->
<!--      </a-menu>-->
<!--    </a-layout-sider>-->
<!--    <a-layout style="padding: 0 24px 24px">-->
<!--      <a-breadcrumb style="margin: 16px 0">-->
<!--        <a-breadcrumb-item>Home</a-breadcrumb-item>-->
<!--        <a-breadcrumb-item>List</a-breadcrumb-item>-->
<!--        <a-breadcrumb-item>App</a-breadcrumb-item>-->
<!--      </a-breadcrumb>-->
<!--      <a-layout-content-->
<!--        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">-->
<!--        <Nuxt/>-->
<!--      </a-layout-content>-->
<!--    </a-layout>-->
<!--  </a-layout>-->
<!--</template>-->
