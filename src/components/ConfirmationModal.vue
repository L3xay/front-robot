<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this robot?</p>
      <button class="confirm-button" @click="confirm">Yes</button>
      <button class="cancel-button" @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show"],
  methods: {
    /**
     * Emits a 'confirm' event to the parent component.
     * Typically used to confirm an action like deletion.
     */
    confirm() {
      this.$emit("confirm");
    },
    /**
     * Emits a 'cancel' event to the parent component.
     * Typically used to cancel an action or close a modal.
     */
    cancel() {
      this.$emit("cancel");
    }
  }
}
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

h2 {
  font-size: 24px;
  margin-bottom: 15px;
}

.confirm-button,
.cancel-button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.confirm-button {
  background-color: #f44336; /* Red */
  color: white;
}

.cancel-button {
  background-color: #bbb; /* Gray */
  color: white;
}
</style>