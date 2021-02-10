export interface TaskConfiguration {
    url: string
    httpMethod: string | any
    region: string | 'us-central1'
    queue: string
    scheduleTime: number
    headers: unknown
    body: unknown
}