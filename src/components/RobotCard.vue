<template>
  <div class="robot-card">
    <h3>{{ robot.name }}</h3>
    <p>Status: {{ robot.status }}</p>
    <p>Specification: {{ robot.specification }}</p>
    <p>Info: {{ robot.info }}</p>
    <section class="button-group">
      <button @click="editRobot(robot)" class="edit-button">Edit</button>
      <router-link :to="{ name: 'RobotDetails', params: { id: robot.id }}" class="detail-button">
        <span @click="setTargetRobot(robot)">
          Detail
        </span>
      </router-link>
      <button class="delete-button" @click="confirmDeletion">Delete</button>
    </section>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: ["robot"],
  methods: {
    ...mapActions({
      // Calling actions from the store
      "actionHandleTargetRobot": "handleTargetRobot"
    }),
    /**
     * Sets the target robot and triggers the corresponding action.
     *
     * @param {Object} robot - The robot object to set as the target.
     */
    setTargetRobot(robot) {
      this.actionHandleTargetRobot(robot)
    },
    /**
     * Emits an 'edit' event to the parent component, passing along the robot object to be edited.
     *
     * @param {Object} robot - The robot object to be edited.
     */
    editRobot(robot) {
      this.$emit("edit", robot);
    },
    /**
     * Emits a 'confirmDeletion' event to the parent component to confirm the deletion of a robot.
     */
    confirmDeletion() {
      this.$emit("confirmDeletion");
    }
  }
}
</script>

<style>
.robot-card {
  border: 1px solid #ccc;
  background-color: #333333;
  color: white;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.robot-card:hover {
  background-color: #666666;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 55px;
}

.edit-button {
  background-color: orange;
  color: white;
  border: none;
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
}

.detail-button {
  background-color: blue;
  color: white;
  padding: 10px;
  text-decoration: none;
}
.edit-button {
  background-color: #C3E8BD;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.edit-button:hover {
  background-color: darkorange;
}

.detail-button {
  background-color: #8EB897;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.detail-button:hover {
  background-color: #709377;
}

.delete-button {
  background-color: #ED1C24;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.delete-button:hover {
  background-color: #D01117;
}
</style>