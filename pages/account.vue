<template>
  <div class="container">
    My Account
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import Logo from "~/components/Logo.vue";
export default {
  components: {
    Logo
  },
  computed: mapState(["contractConfig"]),
  methods: {
    ...mapMutations(["initContract", "setPage"])
  },
  mounted() {
    this.setPage("account");
    hideWaiting();
  }
};
</script>