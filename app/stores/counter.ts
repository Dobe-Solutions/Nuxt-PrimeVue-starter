import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    legalPageVisits: 0,
  }),
  actions: {
    incrementLegalVisits() {
      this.legalPageVisits++;
    },
  },
});
