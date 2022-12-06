import { Environment } from 'roit-environment'
import { BrokerConfigInterface } from '../interfaces/BrokerConfigInterface'

export class PubSubConfig implements BrokerConfigInterface {
    //@ts-ignore
    private readonly projectId: string
    //@ts-ignore
    private readonly credentials: { private_key: string, client_email: string }

    constructor() {
        const credentialFile = Environment.getProperty('pubSubCredential')
        if (credentialFile) {
            this.projectId = Environment.getProperty('firestore.projectId')
            this.credentials = require(credentialFile)
        }
    }

    getConfig(): any {
        return new PubSubConfig()
    }
}