import { Environment } from 'roit-environment'
import { BrokerConfigInterface } from '../interfaces/BrokerConfigInterface'

export class PubSubConfig implements BrokerConfigInterface {
    //@ts-ignore
    private readonly projectId: string
    //@ts-ignore
    private readonly credentials: { private_key: string, client_email: string }

    constructor() {
        this.projectId = Environment.getProperty('projectId')
        const credentialFile = Environment.getProperty('pubSubCredential')
        this.credentials = require(credentialFile)
    }

    getConfig(): any {
        return new PubSubConfig()
    }
}