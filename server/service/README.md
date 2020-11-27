# @dashboard/service
Service for Dashboard

## Service

### Base

```javascript
class MyService extends Service {
  id = "myservice";
  name = "My service";
  description = "Wow! This service is pretty cool!";
  version = "1.0.0";
  actions = [...];
}
```

### OAuth

```javascript
class MyService extends ServiceOAuth {
  ... // Same as Service
  options = {
    requestTokenURL: "...";
    accessTokenURL: "...";
    userAuthorizationURL: "...";
    consumerKey: "...";
    consumerSecret: "...";
  }
}
```

### OAuth2

```javascript
class MyService extends ServiceOAuth2 {
  ... // Same as Service
  options = {
    authorizationURL: "...";
    tokenURL: "...";
    clientID: "...";
    clientSecret: "...";
    scope: ["...", "..."]; // Optional
    scopeSeparator: ","; // Optional
  }
}
```

## Service action

### Base

```javascript
class MyAction extends ServiceAction {
  id = "myaction";
  name = "My action";
  description = "Wow! This action is pretty cool!";

  run(request) {
    ...
  }
}
```

### Settings

```javascript
class MyAction extends ServiceActionSettings {
  ... // Same as Service
  options = {
    id: "number",
    from: "string",
    to: "string",
    ...
  }
  
  run(request) {
    ...
  }

  mapRequestToSettings(request) {
    return {
      id: request.body.id,
      from: request.body.from,
      to: request.body.to,
      ...
    }
  }
}
```
