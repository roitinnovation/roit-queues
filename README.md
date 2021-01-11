# ROIT Queues

Nest Usage

Inject in your desired class:
```
import { PubSubHandler } from '@roit/roit-queues'

@Inject()
private readonly pubSubHandler: PubSubHandler
```

Use publish method:
```
const myObject = {
    // properties
}

const messageId = await this.pubSubHandler.publish(myObject, 'myTopic')
console.log(messageId) // outputs 234786275
```