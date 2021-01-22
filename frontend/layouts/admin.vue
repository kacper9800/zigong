<template>
  <div class="app">
    <Header/>
    <NavbarAdmin/>
    <div class="main">
      <Nuxt/>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import NavbarAdmin from "~/components/NavbarAdmin";
  import Header from "~/components/Header";
  import Footer from "~/components/Footer";

  export default {
    components: {
      NavbarAdmin,
      Header,
      Footer
    }
  };
</script>
