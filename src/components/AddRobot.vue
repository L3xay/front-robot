<template>
  <div>
    <h1>Add Robot</h1>
    <form @submit.prevent="addNewRobot">
      <div>
        <input v-model="name" placeholder="Name" />
        <p v-if="nameErrors.length" class="error">
          <span v-for="error in nameErrors" :key="error">{{ error }}</span>
        </p>
      </div>
      <div>
        <input v-model="specification" placeholder="Specification" />
        <p v-if="specificationErrors.length" class="error">
          <span v-for="error in specificationErrors" :key="error">{{ error }}</span>
        </p>
      </div>
      <div>
        <input v-model="info" placeholder="Info" />
        <p v-if="infoErrors.length" class="error">
          <span v-for="error in infoErrors" :key="error">{{ error }}</span>
        </p>
      </div>
      <div class="toggle-buttons">
        <label :class="{ active: status === 'Active' }">
          <input type="radio" v-model="status" value="Active" class="toggle-input"/>
          Active
        </label>
        <label  :class="{ active: status === 'Inactive' }">
          <input type="radio" v-model="status" value="Inactive" class="toggle-input"/>
          Inactive
        </label>
        <p v-if="statusErrors.length" class="error">
          <span v-for="error in statusErrors" :key="error">{{ error }}</span>
        </p>
      </div>
      <button type="submit">Add</button>
      <button type="button" class="cancel" @click="actionHandleIsAdding(false)">Cancel</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
      status: '',
      specification: '',
      info: '',
      nameErrors: [],
      statusErrors: [],
      specificationErrors: [],
      infoErrors: []
    };
  },
  methods: {
    ...mapActions({
      "actionAddRobot": 'addRobot',
      "actionHandleIsAdding": "handleIsAdding"
    }),
    /**
     * Validates the form fields and sets error messages if validation fails.
     *
     * @returns {boolean} - Returns true if validation passes, otherwise false.
     */
    validateForm() {
      this.nameErrors = [];
      this.statusErrors = [];
      this.specificationErrors = [];
      this.infoErrors = [];

      if (!this.name) this.nameErrors.push("Name is required.");
      if (this.name.length > 50) this.nameErrors.push("Name is too long.");

      if (!this.status || (this.status !== "Active" && this.status !== "Inactive")) {
        this.statusErrors.push("Status is invalid.");
      }

      if (!this.specification) this.specificationErrors.push("Specification is required.");
      if (this.info.length > 100) this.specificationErrors.push("Specification is too long.");

      if (!this.info) this.infoErrors.push("Info is required.");
      if (this.info.length > 100) this.infoErrors.push("Info is too long.");

      return !(this.nameErrors.length || this.infoErrors.length || this.statusErrors.length || this.specificationErrors.length);
    },
    /**
     * Asynchronously adds a new robot using Vuex action if form validation passes.
     * Resets the form data and toggles the adding state off upon successful addition.
     */
    async addNewRobot() {
      if (this.validateForm()) {
        try {
          await this.actionAddRobot({
            name: this.name,
            status: this.status,
            specification: this.specification,
            info: this.info
          });
          this.resetFormData();
          this.actionHandleIsAdding(false)
        } catch (error) {
          console.log(error)
          this.nameErrors.push("Something went wrong while adding the robot.");
          this.actionHandleIsAdding(false)
        }
      }
    },
    /**
     * Resets all form fields to their initial state.
     */
    resetFormData() {
      this.name = '';
      this.status = '';
      this.specification = '';
      this.info = '';
    }
  }
};
</script>

<style scoped>
form {
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
div {
  margin-bottom: 20px;
}
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  background-color: #4CAF50;
  color: white;
  padding: 15px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}
button:hover {
  background-color: #45a049;
}
.cancel {
  background-color: #ED1C24;
  margin-top: 10px;
}
.cancel:hover {
  background-color: #D01117;
}
.error {
  color: red;
  margin-top: 5px;
}

.toggle-buttons {
  display: inline-flex;
  border: 1px solid #ccc;
  border-radius: 20px;
  overflow: hidden;
}

label {
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  background: #f2f2f2;
  color: #333;
}

label.active {
  background: #7A97CD;
  color: white;
}

.toggle-input {
  display: none;
}
</style>