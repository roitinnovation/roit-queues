import { protos } from "@google-cloud/tasks"
import { TaskConfiguration } from "./TaskConfiguration"

export class Task {
    httpRequest: HttpRequest = new HttpRequest()
    scheduleTime: ScheduleTime = new ScheduleTime()

    constructor(taskOptions: TaskConfiguration, seconds: number) {
        this.httpRequest.headers = taskOptions.headers
        this.httpRequest.url = taskOptions.url
        this.httpRequest.httpMethod = taskOptions.httpMethod
        this.scheduleTime.seconds = seconds
        this.httpRequest.body = Buffer.from(JSON.stringify(taskOptions.body)).toString('base64')
    }
}

export type ITask = protos.google.cloud.tasks.v2.Task;

class HttpRequest {
    httpMethod: string
    url: string
    body: string
    headers: unknown
}

class ScheduleTime {
    seconds: number
}