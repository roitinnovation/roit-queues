
export type HttpMethod = 'POST' | 'PUT' | 'GET' | 'PATCH' | 'DELETE'
export class TaskConfiguration {
    url: string
    httpMethod: HttpMethod = 'POST'
    region: string | 'us-central1'
    queue: string
    scheduleTime?: {
        seconds?: number
        nanos?: number
        dateExecute?: string
        executeAt?: string
    }
    headers?: unknown
    body?: unknown
    auth?: {
        oidcToken?: {
            serviceAccountEmail?: string
        }
    }
}