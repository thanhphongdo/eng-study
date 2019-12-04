<template>
  <div class="container tw-flex tw-flex-wrap">
    <div
      v-for="(item, index) in listCourse"
      :key="index"
      class="tw-w-1/2"
    >
      <div :class="{'tw-pr-2': index % 2 == 0,'tw-pl-2': index % 2 == 1}">
        <CourseItem :data="item"></CourseItem>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { ACTION, MUTATION } from "~/store/enums.js";
import CourseItem from "~/components/CourseItem.vue";

export default {
  components: {
    CourseItem
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("course", ["listCourse"])
  },
  // computed: mapState(['course.listCourse']),
  methods: {
    ...mapMutations(["setPage"])
  },
  mounted() {
    this.setPage("course");
    // window.xxx = this;
    console.log(this.listCourse);
    hideWaiting();
  }
};
</script>
