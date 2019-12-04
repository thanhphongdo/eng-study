<template>
  <div
    class="tw-p-4 tw-mb-4 tw-border-blue-light tw-rounded-lg"
    :class="{'tw-border tw-border-solid': showFlag}"
  >
    <nuxt-link :to="'/course/detail?id=' + data.id" class="ui fluid image tw-relative">
      <img
        v-show="showFlag"
        :src="data.thumbnail"
        v-on:load="onThumbnailLoaded"
      />
      <div
        v-show="showFlag"
        ref="thumbnail"
        class="tw-absolute tw-pin-b tw-p-2 tw-w-full tw-flex tw-justify-center tw-items-center tw-text-xl tw-bg-tr-black-3 tw-text-white"
      >{{data.title}}</div>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      showFlag: false
    };
  },
  computed: {
    thumbnailHeight() {
      if (process.browser) {
        return $(this.$el).width() + "px";
      }
      return "0px";
    }
  },
  methods: {
    onThumbnailLoaded() {
      this.showFlag = true;
    }
  },
  mounted() {
    let self = this;
  }
};
</script>