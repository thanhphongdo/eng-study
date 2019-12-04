<template>
  <div class="container">
    <div>
      <logo />
      <h3 class="title">partyfunds</h3>
      <h4 class="subtitle">My spectacular Nuxt.js project</h4>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  },
  computed: mapState([]),
  methods: {
    ...mapMutations([])
  },
  mounted() {
    hideWaiting();
  }
};
</script>
