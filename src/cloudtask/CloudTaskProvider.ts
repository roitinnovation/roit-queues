import { CloudTasksClient } from "@google-cloud/tasks";
import { google } from "@google-cloud/tasks/build/protos/protos";
import { Environment } from "roit-environment";
import { Task } from "./Task";
import { TaskConfiguration } from "./TaskConfiguration";
const moment = require('moment')
const ms = require('ms')
import { newDate } from "@roit/roit-date"
import { parseISO } from 'date-fns'

export class CloudTaskProvider {
    private instance: CloudTasksClient
    private projectId: string

    constructor() {
        this.projectId = Environment.getProperty('firestore.projectId') ||
            Environment.getProperty('projectId') ||
            Environment.systemProperty('PROJECT_ID')
        if (this.projectId) {
            this.instance = new CloudTasksClient({
                projectId: this.projectId
            })
        } else {
            console.warn(`ProjectId invalid, declare property firestore.projectId in env.yaml`)
            this.instance = new CloudTasksClient()
        }
    }

    async createTask(taskOptions: TaskConfiguration): Promise<google.cloud.tasks.v2.ITask> {
        const { region, queue } = taskOptions
        const seconds = this.buildScheduleTime(taskOptions)
        const task = new Task(taskOptions, seconds) as google.cloud.tasks.v2.ITask
        const parent = this.instance.queuePath(this.projectId, region, queue)
        const [response] = await this.instance.createTask({ parent, task } as google.cloud.tasks.v2.ICreateTaskRequest)
        return response
    }

    async deleteTask(name: string): Promise<void> {
        await this.instance.deleteTask({ name })
    }

    buildScheduleTime(taskOptions: TaskConfiguration): number {
        let seconds = 0
        if (taskOptions?.scheduleTime?.executeAt) {
            const milliseconds = Number(ms(taskOptions.scheduleTime.executeAt))
            seconds = milliseconds / 1000
        }
        if (taskOptions?.scheduleTime?.dateExecute) {
            const now = moment(new Date())
            const dateExecute = moment(taskOptions.scheduleTime.dateExecute)
            const duration = moment.duration(dateExecute.diff(now))
            seconds = duration.asSeconds()
        }
        if (taskOptions?.scheduleTime?.nanos) {
            seconds = Number(taskOptions.scheduleTime.nanos / 1000000000)
        }
        if (taskOptions?.scheduleTime?.seconds) {
            seconds = taskOptions.scheduleTime.seconds
        }

        const timestamp = taskOptions?.scheduleTime?.withTimeZone ? parseISO(newDate()).getTime() : Date.now()

        return seconds + timestamp / 1000
    }
}