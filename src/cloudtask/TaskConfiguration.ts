export interface TaskConfiguration {
    url: string
    httpMethod: string | any
    region: string
    queue: string
    scheduleTime: number
    headers: unknown
}