export interface PublisherInterface {
    publish: (object: any, topic: string) => Promise<string>
    getInstance: () => any
}