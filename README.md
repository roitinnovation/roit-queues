# ROIT Queues

### Usage for Pub/Sub

In the `env.yaml` file add the `pubSubCredential{}` and `projectId` attributes, with the number of folders inside the {}:

```yaml
dev:
    pubSubCredential{5}: my-credential.json
    projectId: my-project-id
```

Inject in your desired class:
```typescript
import { PubSubHandler } from '@roit/roit-queues'

constructor( 
    private readonly pubSubHandler: PubSubHandler
) {}
```

Use the `publish` method:
```typescript
const myObject = {
    // properties
}

const messageId = await this.pubSubHandler.publish(myObject, 'myTopic')
console.log(messageId) // outputs 234786275
```

### Usage for Cloud Tasks

In the `env.yaml` file add the `cloudTaskCredencial{}` and `projectId` attributes, with the number of folders inside the {}:

```yaml
dev:
    cloudTaskCredential{5}: my-credential.json
    projectId: my-project-id
```

Inject in your desired class:
```typescript
import { CloudTaskProvider } from '@roit/roit-queues'

constructor( 
    private readonly cloudTaskProvider: CloudTaskProvider
) {}
```

Use the `createTask` method:
```typescript
import { TaskConfiguration } from '@roit/roit-queues'

const myTask: TaskConfiguration = {
    url: 'https://endpoint.com',
    httpMethod: 'POST',
    region: 'us-central1',
    queue: 'my-queue',
    scheduleTime: '1000',
    headers: MyHeadersObject,
    body: MyPayloadObject
}

const taskResponse = await this.cloudTaskProvider.createTask(myTask)
console.log(taskResponse)
```
