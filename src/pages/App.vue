<template>
  <div id="app">
    <router-view>
      <RobotList />
    </router-view>
  </div>
</template>

<script>
import RobotList from '../components/RobotList.vue';

export default {
  components: {
    RobotList,
  },
};
</script>

<style scoped>
#app {
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  #app {
    padding: 10px;
  }
}
</style>