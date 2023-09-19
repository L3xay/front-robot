<template>
  <div class="robot-detail-card">
    <h1>Robot Detail</h1>
    <div class="robot-detail-content">
      <p><strong>ID:</strong> {{ robot.id }}</p>
      <p><strong>Name:</strong> {{ robot.name }}</p>
      <p><strong>Status:</strong> {{ robot.status }}</p>
      <p><strong>Specification:</strong> {{ robot.specification }}</p>
      <p><strong>Info:</strong> {{ robot.info }}</p>
    </div>
    <router-link class="back-button" to="/">Back to List</router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      robot: {}
    };
  },
  beforeMount() {
    // Sets the `isDetail` state to true using Vuex action.
    this.actionHandleIsDetail(true)
  },
  mounted() {
    // Fetches the robot details based on the route parameter and sets it to the component's data.
    const id = parseInt(this.$route.params.id, 10);
    this.robot = this.gettersRobotById(id);
  },
  beforeDestroy() {
    // Sets the `isDetail` state to false using Vuex action.
    this.actionHandleIsDetail(false)
  },

  computed: {
    ...mapGetters({
      "gettersRobotById": "getRobotById",
    })
  },

  methods: {
    ...mapActions({
        "actionHandleIsDetail": "handleIsDetail"
    })
  }
};
</script>

<style scoped>
.robot-detail-card {
  background: #f3f4f6;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1);
  margin: 20px;
  text-align: left;
  color: #333;
  font-family: 'Arial', sans-serif;
}

.robot-detail-content {
  margin-top: 20px;
  font-size: 18px;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

strong {
  color: #555;
}

.back-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ddd;
  color: #333;
  border-radius: 5px;
  text-decoration: none;
}

.back-button:hover {
  background-color: #ccc;
}
</style>