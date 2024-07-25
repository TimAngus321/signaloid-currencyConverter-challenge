import axios from 'axios'
import { defineStore } from 'pinia'

type SourceCodeTaskRequest = {
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

export const useSignaloidAPIStore = defineStore('signaloidAPI', {
  state: () => ({
    sigClient: axios.create({
      baseURL: 'https://api.signaloid.io',
      headers: {
        Authorization: import.meta.env.VITE_SIGNALOID_API_KEY,
        'Content-Type': 'application/json'
      }
    }),
    taskOutputRes: {}
  }),
  getters: {
    getTaskOutputRes: (state) => state.taskOutputRes
  },
  actions: {
    // This unholy monstrosity needs to be split up and cleaned up.
    // Remember to store resuts as state so I can use the getter to pull it wherever
    async createTask(taskRequest: SourceCodeTaskRequest) {
      console.log('Submitting the task to the API...')
      // clear taskOutputRes for each new request
      this.taskOutputRes = {}
      let taskPostResponse: any | undefined
      let taskID
      let taskStatus
      try {
        taskPostResponse = await this.sigClient.post('/tasks', taskRequest)
        if (taskPostResponse.data.TaskID) {
          console.log(`...task successfully created with ID: ${taskPostResponse.data.TaskID}`)
          console.log(`all task response data: ${JSON.stringify(taskPostResponse.data, null, 2)}`)

          taskID = taskPostResponse.data.TaskID
          taskStatus = taskPostResponse.data.Status
        }

        /*
         * response.data will contain the execution job response object
         */
      } catch (error) {
        console.error(`create source code task err `, error)
      }

      const delay = (ms: any) => new Promise((res) => setTimeout(res, ms))
      console.log('Waiting for the task to finish...')
      while (![`Completed`, `Cancelled`, `Stopped`].includes(taskStatus)) {
        await delay(2000)
        try {
          const taskGetResponse = await this.sigClient.get(`/tasks/${taskID}`)
          taskStatus = taskGetResponse.data.Status
          if (taskPostResponse.data.TaskID) {
            console.log(`...task status : ${taskStatus}`)
          }
          /*
           * response.data will contain the task details
           */
        } catch (error) {
          console.log(`task status err `, error)
          // [TODO]: handle errors
        }
      }

      console.log('Fetching task outputs...')
      console.log(`/tasks/${taskID}/outputs`)
      let taskOutputsResponse
      // I think this was intended to be called seperately and needs time for the task to be found. Adding a large delay
      // resolves this for the moment.
      // Remeber to split these all up later
      await delay(5000)
      try {
        // get task data from API
        taskOutputsResponse = await this.sigClient.get(`/tasks/${taskID}/outputs`)
        console.log(`taskOutputsResponse `, taskOutputsResponse)
        console.log(`taskOutputsResponse.data.Stdout `, taskOutputsResponse.data.Stdout)
        this.taskOutputRes = taskOutputsResponse.data.Stdout
        console.log(`taskOutputRes state in pinia store`, this.taskOutputRes)
        /*
         * response.data will contain the task outputs object
         */
        await delay(2000)
        if (taskOutputsResponse.data.Stdout) {
          // sent email to support regarding this failed request. Error is missing key but according to docs don't see a need
          // Ran out of time for finding a solution
          const outputStream = await axios.get(taskOutputsResponse.data.Stdout)
          console.log(`Task Stdout: ${outputStream.data}`)
        }
      } catch (error) {
        console.log(`fetch err `, error)
        // [TODO]: handle errors
      }
    }
  }
})
