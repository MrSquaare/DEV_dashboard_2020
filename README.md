# DEV_dashboard_2020
All your information in the blink of an eye

## About

The project is divided into two main parts:
- [Server](server)
- [Web](web)

### Repository

The project is in the form of a mono-repository, i.e. all the code is stored in the same repository but subdivided into several separate projects.

The advantages are as follows:
- Better collaboration
- Better visibility of all the code
- Better reusability of each project
- Better management of dependencies for each project

To enhance the mono-repository experience, we use two tools:
- [Yarn workspace (v1)](https://classic.yarnpkg.com/en/docs/workspaces/)
- [Lerna](https://lerna.js.org/)

These tools allow a centralised management of external dependencies (via the npm registry) as well as the parallel construction of our projects while respecting inter-dependencies.

## Getting started

### Yarn

#### Prerequisites

1. Install yarn

#### Installation

1. Install dependencies
```shell script
yarn install
```

2. Build each projects
```shell script
yarn build
```

### Docker (and docker-compose)

#### Prerequisites

1. Install Docker
2. Install docker-compose

## Using

### Docker

1. Start the docker-compose
```shell script
docker-compose up
```

### Yarn

1. Start the server
```shell script
yarn start:server
```

2. Start the web application
```shell script
yarn start:web
```
