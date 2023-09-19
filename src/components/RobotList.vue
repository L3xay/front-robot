<template>
  <div>
    <div class="header">
      <h1>Robot List</h1>
      <button class="add-button" @click="actionHandleIsAdding(true)">Add Robot</button>
    </div>
    <section>
      <div v-if="gettersIsEdit">
        <EditRobot
          v-if="showModal"
          :robot="selectedRobot"
          @close="showModal = false"
        />
      </div>
      <div v-else>
        <AddRobot
          v-if="!gettersIsDetail && !gettersIsEdit && gettersIsAdding"
        />
      </div>
    </section>
    <section class="robot-list">
      <RobotCard
          v-for="robot in this.gettersRobots"
          :key="robot.id"
          :robot="robot"
          @edit="showEditModal"
          @confirmDeletion="showDeleteModal(robot)"
      />
    </section>
    <ConfirmationModal
      :show="showCancellationModal"
      @confirm="deleteRobot(robotToDelete.id)"
      @cancel="cancelDelete"
    />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EditRobot from '@/components/EditRobot'
import AddRobot from '@/components/AddRobot'
import ConfirmationModal from '@/components/ConfirmationModal'
import RobotCard from '@/components/RobotCard';

export default {
  components: {
    EditRobot,
    AddRobot,
    ConfirmationModal,
    RobotCard
  },
  data() {
    return {
      error: null,
      showModal: false,
      selectedRobot: null,
      showCancellationModal: false,
      robotToDelete: ""
    };
  },
  async mounted() {
    // Fetch the list of robots when the page is loaded
    await this.actionFetchRobots();
  },

  computed: {
    // Calling getters from the store
    ...mapGetters({
      "gettersRobots": "getRobots",
      "gettersIsEdit": "getIsEdit",
      "gettersIsDetail": "getIsDetail",
      "gettersIsAdding": "getIsAdding"
    })
  },

  methods: {
    ...mapActions({
      // Calling actions from the store
      "actionFetchRobots": "fetchRobots",
      "actionHandleIsEdit": "handleIsEdit",
      "actionDeleteRobot": "deleteRobot",
      "actionHandleIsAdding": "handleIsAdding",
      "actionHandleTargetRobot": "handleTargetRobot"
    }),
    /**
     * Shows delete confirmation modal.
     *
     * @param {Object} robot - The robot object to be deleted.
     */
    showDeleteModal(robot) {
      this.robotToDelete = robot;
      this.showCancellationModal = true;
    },
    /**
     * Hides delete confirmation modal.
     */
    cancelDelete() {
      this.showCancellationModal = false;
    },
    /**
     * Shows the edit modal for a specific robot.
     *
     * @param {Object} robot - The robot object to be edited.
     */
    showEditModal(robot) {
      this.selectedRobot = robot;
      this.actionHandleIsEdit(true);
      this.showModal = true;
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    /**
     * Deletes a robot by its ID and refreshes the robot list.
     *
     * @param {number} id - The ID of the robot to be deleted.
     */
    async deleteRobot(id) {
      try {
        await this.actionDeleteRobot(id);
        await this.actionFetchRobots();
        this.showCancellationModal = false;
      } catch (error) {
        console.error("An error occurred while deleting the robot:");
        console.log(error);
        this.showCancellationModal = false;
      }
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: white;
  height: 160px;
}

.robot-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.add-button {
  background-color: gray;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  display: block;
  font-size: 16px;
}

.error {
  color: red;
  font-size: 16px;
}
</style>