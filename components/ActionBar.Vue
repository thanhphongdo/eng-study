<template>
  <div class="tw-h-10 tw-bg-blue-light tw-text-white tw-flex">
    <div class="tw-w-10 tw-h-full tw-flex tw-justify-center tw-items-center">
      <span>
        <i class="arrow left icon"></i>
      </span>
    </div>
    <div class="tw-flex tw-justify-center tw-items-center tw-flex-1">
        HOME
    </div>
    <div class="tw-w-10 tw-h-full tw-flex tw-justify-center tw-items-center"></div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  components: {
  },
  computed: mapState(["contractConfig", "page"]),
  methods: {
    ...mapMutations(["initContract", "setPage"])
  },
  mounted() {
  }
};
</script>