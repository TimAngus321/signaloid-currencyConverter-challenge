import axios from 'axios'
import { defineStore } from 'pinia'

export interface SourceCodeTaskRequest {
  Type: 'SourceCode'
  SourceCode: {
    Object: 'SourceCode'
    Code: string
    Arguments: string
    Language: 'C' | 'C++'
  }
  Overrides?: {
    Core?: string
  }
}

export const useSignaloidAPI = defineStore('signaloidAPI', {
  state: () => ({
    sigClient: axios.create({
      baseURL: 'https://api.signaloid.io',
      headers: {
        Authorization: import.meta.env.VITE_SIGNALOID_API_KEY,
        'Content-Type': 'application/json' // docs say it's application/json
      }
    }),
    coreID: 'cor_b21e4de9927158c1a5b603c2affb8a09',
    codeToBeRun: `#include <stdio.h>
    int main() {
      printf("Hello World");
      return 0;
    }`
  }),
  getters: {},
  actions: {
    async createTask() {
      const taskRequest = {
        Type: 'SourceCode',
        SourceCode: {
          Object: 'SourceCode',
          Code: this.codeToBeRun,
          Arguments: '',
          Language: 'C'
        },
        Overrides: {
          Core: this.coreID
        }
      }

      console.log('Submitting the task to the API...')
      let taskPostResponse
      try {
        taskPostResponse = await this.sigClient.post('/tasks', taskRequest)
        if (taskPostResponse.data.TaskID) {
          console.log(`...task successfully created with ID: ${taskPostResponse.data.TaskID}`)
          console.log(`all task response data: ${JSON.stringify(taskPostResponse.data, null, 2)}`)
        }

        /*
         * response.data will contain the execution job response object
         */
      } catch (error) {
        console.error(error)
      }
    }
  }
})
