import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        robots: [],
        targetRobot: null,
        error: null,
        isEdit: false,
        isDetail: false,
        isAdding: false
    },
    mutations: {
        /**
         * Sets the robots array in the state.
         * @param {Object} state - Vuex state object.
         * @param {Array} robots - New array of robots.
         */
        SET_ROBOTS(state, robots) {
            state.robots = robots;
        },
        /**
         * Sets the error message in the state.
         * @param {Object} state - Vuex state object.
         * @param {String} error - Error message.
         */

        SET_ERROR(state, error) {
            state.error = error;
        },
        /**
         * Sets the target robot in the state.
         * @param {Object} state - Vuex state object.
         * @param {Object} robot - The robot object to set as target.
         */
        SET_TARGET_ROBOT(state, robot) {
            console.log('%c in mutation','background:red;color:black;font-size:20px', robot);
            state.targetRobot = robot;
        },
        /**
         * Sets the isEdit flag in the state.
         * @param {Object} state - Vuex state object.
         * @param {Boolean} payload - New value for isEdit flag.
         */
        SET_EDIT(state, payload) {
            state.isEdit = payload;
        },
        /**
         * Sets the isDetail flag in the state.
         * @param {Object} state - Vuex state object.
         * @param {Boolean} payload - New value for isDetail flag.
         */
        SET_DETAIL(state, payload) {
            state.isDetail = payload;
        },
        /**
         * Sets the isAdding flag in the state.
         * @param {Object} state - Vuex state object.
         * @param {Boolean} payload - New value for isAdding flag.
         */
        SET_ADDITION(state, payload) {
            state.isAdding = payload;
        },
        /**
         * Deletes a robot from the robots array in the state.
         * @param {Object} state - Vuex state object.
         * @param {Number} id - ID of the robot to delete.
         */
        DELETE_ROBOT(state, id) {
            state.robots = state.robots.filter(robot => robot.id !== id);
        },
    },
    actions: {
        /**
         * Fetches robots from the API and updates the state.
         * @param {Object} context - Vuex action context.
         */
        async fetchRobots({ commit }) {
            try {
                const response = await axios.get('http://localhost:3000/robots');
                commit('SET_ROBOTS', response.data);
            } catch (error) {
                commit('SET_ERROR', 'Something went wrong while fetching the robots.');
            }
        },
        /**
         * Adds a new robot to the state and API.
         * @param {Object} context - Vuex action context.
         * @param {Object} newRobot - The new robot to add.
         */
        async addRobot({ commit, state }, newRobot) {
            try {
                const response = await axios.post('http://localhost:3000/robots', newRobot);
                commit('SET_ROBOTS', [...state.robots, response.data]);
            } catch (error) {
                commit('SET_ERROR', 'Something went wrong while adding the robot.');
            }
        },
        /**
         * Edits an existing robot in the state and API.
         * @param {Object} context - Vuex action context.
         * @param {Object} updatedRobot - The updated robot data.
         */
        async editRobot({ commit, state }, updatedRobot) {
            try {
                await axios.put(`http://localhost:3000/robots/${updatedRobot.id}`, updatedRobot);
                const robotIndex = state.robots.findIndex(robot => robot.id === updatedRobot.id);
                if (robotIndex !== -1) {
                    commit('SET_ROBOTS', [
                        ...state.robots.slice(0, robotIndex),
                        updatedRobot,
                        ...state.robots.slice(robotIndex + 1)
                    ]);
                }
            } catch (error) {
                commit('SET_ERROR', 'Something went wrong while editing the robot.');
            } finally {
                commit("SET_EDIT", false);
            }
        },
        /**
         * Sets the target robot in the state.
         * @param {Object} context - Vuex action context.
         * @param {Object} robot - The robot to set as the target.
         */
        handleTargetRobot({ commit }, robot) {
            console.log('%c in action','background:red;color:black;font-size:20px', robot);
            commit('SET_TARGET_ROBOT', robot);
        },
        /**
         * Toggles the edit mode in the state.
         * @param {Object} context - Vuex action context.
         * @param {boolean} payload - The new state for edit mode.
         */
        handleIsEdit({ commit }, payload) {
            commit("SET_EDIT", payload);
        },
        /**
         * Toggles the detail view mode in the state.
         * @param {Object} context - Vuex action context.
         * @param {boolean} payload - The new state for detail view mode.
         */
        handleIsDetail({ commit }, payload) {
            commit("SET_DETAIL", payload);
        },
        /**
         * Toggles the adding mode in the state.
         * @param {Object} context - Vuex action context.
         * @param {boolean} payload - The new state for adding mode.
         */
        handleIsAdding({ commit }, payload) {
            commit("SET_ADDITION", payload);
        },
        /**
         * Deletes a robot from the state and API.
         * @param {Object} context - Vuex action context.
         * @param {number} id - The ID of the robot to delete.
         */
        async deleteRobot({ commit }, id) {
            try {
                await axios.delete(`/robots/${id}`);
                commit('DELETE_ROBOT', id);
            } catch (error) {
                console.error("An error occurred while deleting the robot:", error);
            }
        },
    },
    getters: {
        /**
         * Returns the list of all robots from the state.
         * @param {Object} state - Vuex state object.
         * @return {Array} - Array of robots.
         */
        getRobots: state => {
            return state.robots;
        },
        /**
         * Returns a robot by its ID.
         * @param {Object} state - Vuex state object.
         * @param {number} id - The ID of the robot.
         * @return {Object|null} - The robot object or null if not found.
         */
        getRobotById: state => id => {
            return state.robots.find(robot => robot.id === id);
        },
        /**
         * Returns the state of the edit mode.
         * @param {Object} state - Vuex state object.
         * @return {boolean} - True if edit mode is active, otherwise false.
         */
        getIsEdit: state => {
            return state.isEdit;
        },
        /**
         * Returns the state of the detail view mode.
         * @param {Object} state - Vuex state object.
         * @return {boolean} - True if detail view mode is active, otherwise false.
         */
        getIsDetail: state => {
            return state.isDetail;
        },
        /**
         * Returns the state of the adding mode.
         * @param {Object} state - Vuex state object.
         * @return {boolean} - True if adding mode is active, otherwise false.
         */
        getIsAdding: state => {
            return state.isAdding;
        },
    }
});