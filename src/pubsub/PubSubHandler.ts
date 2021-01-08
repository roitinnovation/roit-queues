import { PubSub } from '@google-cloud/pubsub'
import { PublisherInterface } from "../PublisherInterface"
import { PubSubConfig } from './PubSubConfig'

export class PubSubHandler implements PublisherInterface {

    private readonly instance: PubSub
    private readonly config: PubSubConfig = new PubSubConfig()

    constructor() {
        this.instance = new PubSub(this.config.getConfig())
    }

    getInstance() {
        return this.instance
    }

    async publish(message: Buffer, topicName: string): Promise<string> {
        const messageId = await this.getInstance().topic(topicName).publish(message).catch(err => {
            console.error(err)
            throw new Error('Error in PubSub publish method.')
        }).then(response => {
            return response
        })

        return messageId
    }
}