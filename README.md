# ROIT Queues

Nest Usage

In the `env.yaml` file add the `pubSubCredential{}` attribute, with the number of folders inside the {}:

```
dev:
    pubSubCredential{5}: my-credential.json
```

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