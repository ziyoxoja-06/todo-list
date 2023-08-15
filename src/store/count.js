 import { defineStore } from "pinia";

 export const countStore = defineStore("count", {
   state: () => ({
     count: 0,
   }),
   getters: {
     doubleCount: (state) => state.count * 2,
   },
   actions: {
     increment() {
       this.count++
     }
   }
 })