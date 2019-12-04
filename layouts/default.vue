<template>
  <div class="tw-flex tw-flex-col tw-h-full">
    <div v-show="isWaiting" class="ui segment app-loading">
      <div class="ui active dimmer">
        <div class="ui loader"></div>
      </div>
    </div>
    <div class="tw-flex tw-flex-col tw-h-full tw-bg-white">
      <ActionBar></ActionBar>
      <div class="tw-flex-1 tw-p-4 tw-overflow-auto">
        <nuxt />
      </div>
      <TabBar></TabBar>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import ActionBar from "~/components/ActionBar.vue";
import Logo from "~/components/Logo.vue";
import TabBar from "~/components/TabBar.vue";
import { ACTION, MUTATION } from "~/store/enums.js";

export default {
  components: {
    Logo,
    ActionBar,
    TabBar
  },
  data() {
    if(process.browser) {
      window.showWaiting = this.showWaiting;
      window.hideWaiting = this.hideWaiting;
      this.showWaiting();
    }
    return {
      initLoad: true
    };
  },
  computed: mapState(["isWaiting"]),
  methods: {
    ...mapMutations(["showWaiting", "hideWaiting"]),
    ...mapActions([])
  },
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next();
  },
  mounted() {
  },
  watch: {
    $route () {
      // this.showWaiting();
    }
  }
};
</script>