import { CloudTasksClient } from "@google-cloud/tasks";
import { google } from "@google-cloud/tasks/build/protos/protos";
import { Environment } from "roit-environment";
import { Task } from "./Task";
import { TaskConfiguration } from "./TaskConfiguration";

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
        const task = new Task(taskOptions, this.serviceAccountEmail) as google.cloud.tasks.v2.ITask
        const parent = this.instance.queuePath(this.projectId, region, queue)
        const [response] = await this.instance.createTask({ parent, task } as google.cloud.tasks.v2.ICreateTaskRequest)
        return response
    }
}