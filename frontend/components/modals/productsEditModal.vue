<template> </template>

<script>
export default {
  layout: 'admin',

  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    languageCode: {
      type: String,
      default: 'En'
    },
    productId: {
      type: Number
    }
  },
};
</script>
