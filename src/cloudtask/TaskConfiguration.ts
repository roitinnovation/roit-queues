export interface TaskConfiguration {
    url: string
    httpMethod: string | any
    region: string | 'us-central1'
    queue: string
    scheduleTime: {
        seconds?: number
        nanos?: number
        dateExecute?: string
        executeAt?: string
    }
    headers: unknown
    body: unknown
}