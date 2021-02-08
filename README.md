# ROIT Queues

### Nest Usage

In the `env.yaml` file add the `pubSubCredential{}` and `projectId` attributes, with the number of folders inside the {}:

```yaml
dev:
    pubSubCredential{5}: my-credential.json
    projectId: my-project-id
```

Inject in your desired class:
```typescript
import { PubSubHandler } from '@roit/roit-queues'

@Inject()
private readonly pubSubHandler: PubSubHandler
```

Use publish method:
```typescript
const myObject = {
    // properties
}

const messageId = await this.pubSubHandler.publish(myObject, 'myTopic')
console.log(messageId) // outputs 234786275
```