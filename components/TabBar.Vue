<template>
  <div class="tw-h-12 tw-bg-blue-light tw-text-white tw-flex">
    <nuxt-link to="/course" class="tw-w-10 tw-h-full tw-flex-1">
      <span :class="page.transaction?'tw-text-yellow':'tw-text-white'" class="tw-flex tw-flex-col tw-justify-center tw-items-center">
        <span>
        <i class="book icon"></i>
      </span>
      <span>Course</span>
      </span>
    </nuxt-link>
    <nuxt-link to="/game" class="tw-w-10 tw-h-full tw-flex-1">
      <span :class="page.history?'tw-text-yellow':'tw-text-white'" class="tw-flex tw-flex-col tw-justify-center tw-items-center">
        <span>
          <i class="gamepad icon"></i>
        </span>
        <span>Game</span>
      </span>
    </nuxt-link>
    <nuxt-link to="/account" class="tw-w-10 tw-h-full tw-flex-1">
      <span :class="page.account?'tw-text-yellow':'tw-text-white'" class="tw-flex tw-flex-col tw-justify-center tw-items-center">
        <span>
          <i class="history icon"></i>
        </span>
        <span>Account</span>
      </span>
    </nuxt-link>
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