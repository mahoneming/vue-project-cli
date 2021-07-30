<template>
  <div id="app">
      <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  computed: {},
  provide() {
    return {
      handleRouterReload: this.handleRouterReload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    handleRouterReload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
  watch: {},
  components: {
  },
  mounted() {
  },
};
</script>
<style lang="scss">
// @import './styles/common';
</style>
