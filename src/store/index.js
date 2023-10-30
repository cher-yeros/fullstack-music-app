import Vue from 'vue'
import Vuex from 'vuex';
import vuejsStorage from 'vuejs-storage'

Vue.use(Vuex)
Vue.use(vuejsStorage)

const store = new Vuex.Store({
    strict: true,
    state: {
        isSignedIn: false,
        user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            if (user) {
                state.isSignedIn = true
            } else {
                state.isSignedIn = false
            }
        }
    },
    actions: {
        setUser({
            commit
        }, user) {
            commit('setUser', user)
        }
    },
    // plugins: [
    //     vuejsStorage({
    //         keys: ['user', 'isSignedIn'],
    //         //keep state.count in localStorage
    //         namespace: 'test',
    //         driver: vuejsStorage.drivers.sessionStorage
    //         //if you want to use sessionStorage instead of localStorage
    //     })
    // ]
})

export default store;