<template>
  <div class="container"></div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import { ACTION, MUTATION } from "~/store/enums.js";
import CourseItem from "~/components/CourseItem.vue";

export default {
  components: {
    CourseItem
  },
  data() {
    return {
      courseId: this.$route.query.id
    };
  },
  computed: {
    ...mapState("course", ["listCourse"]),
    ...mapGetters("wordStudy", ["lessonForWordCourse", "wordByLessonForWordCourse"])
  },
  // computed: mapState(['course.listCourse']),
  methods: {
    ...mapMutations(["setPage"]),
    ...mapMutations("wordStudy", [
      "setCourseForWordCourse",
      "fetchLessonForWordCourse",
      "fetchWordForWordCourse",
    ])
  },
  mounted() {
    this.setPage("course");
    window.xxx = this;
    console.log(this.listCourse);
    this.setCourseForWordCourse(this.courseId);
    let fetchLessonPromise = new Promise((resolve, reject) => {
      this.fetchLessonForWordCourse({
        callback: data => {
          resolve(data);
        },
        error: err => {
          reject(err);
        }
      });
    });
    let fetchWordPromise = new Promise((resolve, reject) => {
      this.fetchWordForWordCourse({
        callback: data => {
          resolve(data);
        },
        error: err => {
          reject(err);
        }
      });
    });
    showWaiting();
    Promise.all([fetchLessonPromise, fetchWordPromise]).then(data => {
      console.log(data);
      hideWaiting();
    }).catch(err => {
      console.log(err);
      hideWaiting();
    });
  }
};
</script>
