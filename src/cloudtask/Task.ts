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

class HttpRequest {
    httpMethod: string
    url: string
    body: string
    headers: unknown
}

class ScheduleTime {
    seconds: number
}