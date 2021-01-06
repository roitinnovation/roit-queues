export interface PublisherInterface {
    publish: (message: Buffer, topic: string) => Promise<string>
    getInstance: () => any
}