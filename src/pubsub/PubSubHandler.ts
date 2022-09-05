import { PubSub } from '@google-cloud/pubsub'
import { PublisherInterface } from "../interfaces/PublisherInterface"
import { PubSubConfig } from './PubSubConfig'

type Attributes = {
    [index: string]: string;
}

export class PubSubHandler implements PublisherInterface {

    private readonly instance: PubSub
    private readonly pubSubConfig: PubSubConfig = new PubSubConfig()

    constructor() {
        const config = this.pubSubConfig.getConfig()
        if (config) {
            this.instance = new PubSub(config)
        } else {
            this.instance = new PubSub()
        }
    }

    getInstance() {
        return this.instance
    }

    async publish(object: any, topicName: string, attributes?: Attributes): Promise<string> {
        const message = Buffer.from(JSON.stringify(object))
        const messageId = await this.getInstance().topic(topicName).publish(message, attributes).catch(err => {
            console.error(err)
            throw new Error('Error in PubSub publish method.')
        }).then(response => {
            return response
        })

        return messageId
    }
}