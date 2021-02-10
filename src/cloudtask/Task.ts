import { TaskConfiguration } from "./TaskConfiguration"

export class Task {
    httpRequest: HttpRequest
    scheduleTime: ScheduleTime

    constructor(taskOptions: TaskConfiguration, serviceAccountEmail: string) {
        this.httpRequest.headers = taskOptions.headers
        this.httpRequest.url = taskOptions.url
        this.httpRequest.httpMethod = taskOptions.httpMethod
        this.scheduleTime.seconds = taskOptions.scheduleTime
        this.httpRequest.oidcToken.serviceAccountEmail = serviceAccountEmail
    }
}

class HttpRequest {
    httpMethod: string
    url: string
    body: string
    headers: unknown
    oidcToken: OidcToken
}

class OidcToken {
    serviceAccountEmail: string
}

class ScheduleTime {
    seconds: number
}