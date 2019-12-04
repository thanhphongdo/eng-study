<template>
  <div class="container">Game</div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { ACTION, MUTATION } from "~/store/enums.js";

export default {
  components: {},
  data() {
    return {};
  },
  computed: mapState([]),
  methods: {
    ...mapMutations(["setPage"])
  },
  mounted() {
    this.setPage("game");
    hideWaiting();
  }
};
</script>
