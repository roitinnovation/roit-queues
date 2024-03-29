import { protos } from "@google-cloud/tasks"
import { TaskConfiguration } from "./TaskConfiguration"

export class Task {
    httpRequest: HttpRequest = new HttpRequest()
    scheduleTime: ScheduleTime = new ScheduleTime()
    createTime: ScheduleTime = new ScheduleTime()

    constructor(taskOptions: TaskConfiguration, seconds: number) {
        this.httpRequest.headers = taskOptions.headers || {}
        this.httpRequest.url = taskOptions.url
        this.httpRequest.httpMethod = taskOptions.httpMethod
        this.scheduleTime.seconds = seconds
        this.createTime.seconds = seconds
        if(taskOptions.body) {
            this.httpRequest.body = Buffer.from(JSON.stringify(taskOptions.body)).toString('base64')
        }

        if(!this.httpRequest.headers['Content-Type']) {
            this.httpRequest.headers['Content-Type'] = 'application/json'
        }
        
        if(taskOptions?.auth?.oidcToken?.serviceAccountEmail) {
            this.httpRequest.oidcToken = {
                serviceAccountEmail: taskOptions.auth.oidcToken.serviceAccountEmail
            }
        }
    }
}

export type ITask = protos.google.cloud.tasks.v2.ITask;

class HttpRequest {
    httpMethod: string
    url: string
    body: string
    headers: any
    oidcToken: {
        serviceAccountEmail: string
    }
}

class ScheduleTime {
    seconds: number
}