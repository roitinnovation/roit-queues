import { PubSub } from '@google-cloud/pubsub'
import { PublisherInterface } from "../interfaces/PublisherInterface"
import { Environment } from 'roit-environment';

type Attributes = {
    [index: string]: string;
}

export class PubSubHandler implements PublisherInterface {

    private instance: PubSub

    constructor() {
        const projectId = Environment.getProperty('firestore.projectId')
        if (projectId) {
            this.instance = new PubSub({
                projectId
            })
        } else {
            console.warn(`ProjectId invalid, declare property firestore.projectId in env.yaml`)
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