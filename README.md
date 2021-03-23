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

Schedule Time params:
```typescript
scheduleTime: {
    seconds?: number
    nanos?: number
    dateExecute?: string // Use moment formats: https://www.npmjs.com/package/moment
    executeAt?: string // Use ms formats: https://www.npmjs.com/package/ms
}
```


Use the `createTask` method:
```typescript
import { TaskConfiguration } from '@roit/roit-queues'

const myTask: TaskConfiguration = {
    url: 'https://endpoint.com',
    httpMethod: 'POST',
    region: 'us-central1',
    queue: 'my-queue',
    scheduleTime: {
        seconds: 3600   
    },
    headers: MyHeadersObject,
    body: MyPayloadObject
}

const taskResponse = await this.cloudTaskProvider.createTask(myTask)
console.log(taskResponse)
```
