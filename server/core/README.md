# @dashboard/core
Core of Dashboard

## About

### Built with
- [Express](https://www.npmjs.com/package/express)
- [Passport](https://www.npmjs.com/package/passport)
- [mustache.js](https://www.npmjs.com/package/mustache)

## Routes

### about.json

- `/about.json`: See about.json

### Authentication

#### Local
- `/v1/authentication/signin`: Sign in
- `/v1/authentication/signup`: Sign up
- `/v1/authentication/verify`: Verify

#### Party
- `/v1/authentication/parties/:party`: Sign in with a party
- `/v1/authentication/parties/:party/callback`: Sign in with a party (callback)

### Service

- `/v1/services`: Get service list
- `/v1/services/:service`: Get a service information
- `/v1/services/:service/:action`: Execute an action
- `/v1/services/:service/:action/settings`: Get, set or delete the action settings
- `/v1/services/:service/authentication`: Sign in to a service
- `/v1/services/:service/authentication/callback`: Sign in to a service (callback)
- `/v1/services/:service/authentication/state`: Get a service authentication state

### User

- `/v1/user`: Get user
- `/v1/user/settings`: Get, set or delete a/the user setting(s)
