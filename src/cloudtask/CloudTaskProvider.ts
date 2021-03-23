import { CloudTasksClient } from "@google-cloud/tasks";
import { google } from "@google-cloud/tasks/build/protos/protos";
import { Environment } from "roit-environment";
import { Task } from "./Task";
import { TaskConfiguration } from "./TaskConfiguration";
import * as moment from "moment"
import ms = require("ms");

export class CloudTaskProvider {
    private instance: CloudTasksClient
    private serviceAccountEmail: string
    private projectId: string

    constructor() {
        const credentialPath = Environment.getProperty('cloudTaskCredential')
        const projectId = Environment.getProperty('projectId')
        const credential = require(credentialPath)
        this.projectId = projectId
        this.serviceAccountEmail = credential.client_email
        this.instance = new CloudTasksClient({
            credentials: credential
        })
    }

    async createTask(taskOptions: TaskConfiguration): Promise<google.cloud.tasks.v2.ITask> {
        const { region, queue } = taskOptions
        const seconds = this.buildScheduleTime(taskOptions)
        const task = new Task(taskOptions, seconds, this.serviceAccountEmail) as google.cloud.tasks.v2.ITask
        const parent = this.instance.queuePath(this.projectId, region, queue)
        const [response] = await this.instance.createTask({ parent, task } as google.cloud.tasks.v2.ICreateTaskRequest)
        return response
    }

    buildScheduleTime(taskOptions: TaskConfiguration): number {
        let seconds = 0
        if(taskOptions.scheduleTime.executeAt) {
            const milliseconds = Number(ms(taskOptions.scheduleTime.executeAt))
            seconds = milliseconds / 1000
        }
        if(taskOptions.scheduleTime.dateExecute) {
            const now = moment(new Date())
            const dateExecute = moment(taskOptions.scheduleTime.dateExecute)
            const duration = moment.duration(dateExecute.diff(now))
            seconds = duration.asSeconds()
        }
        if(taskOptions.scheduleTime.nanos) {
            seconds = Number(taskOptions.scheduleTime.nanos / 1000000000)
        }
        if(taskOptions.scheduleTime.seconds) {
            seconds = taskOptions.scheduleTime.seconds
        }

        return seconds
    }
}