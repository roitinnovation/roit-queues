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
const messageId = await this.pubSubHandler.publish(Buffer.from('myMessage'), 'myTopic')
console.log(messageId) // outputs 234786275
```