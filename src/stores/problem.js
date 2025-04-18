import { defineStore } from 'pinia'

export const useProblemStore = defineStore('problem', {
  state: () => ({
    problemData: null,
    submissions: []
  }),
  actions: {
    setProblemData(data) {
      this.problemData = data
    },
    setSubmissions(data) {
      this.submissions = data
    }
  }
})