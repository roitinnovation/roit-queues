import { CloudTasksClient } from "@google-cloud/tasks";
import { Environment } from "roit-environment";
import { TaskConfiguration } from "./TaskConfiguration";

export class CloudTaskProvider {
    private instance: CloudTasksClient

    private serviceAccountEmail: string

    constructor() {
        const credentialPath = Environment.getProperty('cloudTaskCredential')
        const credential = require(credentialPath)
        this.serviceAccountEmail = credential.client_email
        this.instance = new CloudTasksClient({
            credentials: credential
        })
    }

    async createTask(taskOptions: TaskConfiguration)
}