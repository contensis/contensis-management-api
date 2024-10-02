# contensis-management-api [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)]() [![NPM version](https://img.shields.io/npm/v/contensis-management-api.svg?style=flat)](https://www.npmjs.com/package/contensis-management-api)

[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)]()
[![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)]()

[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/) [![Electron](https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9)](https://electronjs.org/) [![Express.js](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/) [![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/) [![Vue.js](https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)

[![Contensis](https://img.shields.io/badge/Contensis-00304d?style=for-the-badge)](https://www.contensis.com)
[![Contensis Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)](https://contensis.slack.com)

Create a Contensis client that allows you to manage various aspects of your Contensis instance, project, content or deployments. It can be used in all your JavaScript / TypeScript projects, whether it runs in a browser, Node.js app, or both.

Read our documentation on [contensis.com](https://www.contensis.com/help-and-docs/apis/delivery-js) and there is a [contensis-management-api-examples](https://github.com/contensis/contensis-management-api-examples) repo containing Express and React examples.

Use with Contensis version 14.0 and above. This library requires Node.js 14 or above.

# Installation

Install the package to your project `dependencies` using npm, or your preferred Node.js package manager.

```shell
npm install --save contensis-management-api
```

> ### Note
>
> Before following the rest of the examples we assume you have an existing Node.js / Express.js application that is already created.
>
> To get started with a new Node.js app, inside a terminal, `cd` to your chosen directory and run `npm init`

# Import the correct client

Depending on how and where your code is used you may need to find the right Client flavour to import to create the Management Client best suited to your use case

## Browser app

The default `Client` import targets primarily a modern browser and assumes the `fetch` API is already available.

```typescript
// Using TypeScript, or ES Module syntax
import { Client } from "contensis-management-api";

// Using Common JS syntax
const Client = require("contensis-management-api").Client;
```

## Universal JS app

Universal JavaScript describes a JavaScript application which runs both on the client and the server.

If your API interactions will be made using a part of your application that runs [Universal or Isomorphic JavaScript](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) you should instead use the `UniversalClient`

```typescript
// Using TypeScript, or ES Module syntax
import { UniversalClient } from "contensis-management-api";

// Using Common JS syntax
const UniversalClient = require("contensis-management-api").UniversalClient;
```

## Node.js app

For applications that run exclusively on a server, or via a terminal script you will likely want to import and use the `NodejsClient`

Some Management API functionality is only available in a Node.js environment for example creating and updating assets. The `NodejsClient` class ensures `fetch` API is made available and allows us to perform file operations with the `fs` API.

```typescript
// Using TypeScript, or ES Module syntax
import { NodejsClient } from "contensis-management-api/lib/client";

// Using Common JS syntax
const NodejsClient =
  require("contensis-management-api/lib/client").NodejsClient;
```

# Configure and create a client

The `config` argument passed to the `Client.create(...)` method represents the shared configuration that will be used by all Management API calls

Use the provided intellisense to guide you where it is available

```typescript
// Import the additional Config type when using TypeScript
import { Client, Config } from "contensis-management-api";

// Remove ": Config" annotation when NOT using TypeScript
const config: Config = {
  rootUrl: "https://cms-example.cloud.contensis.com",
  projectId: "website",
  clientType: "client_credentials",
  clientDetails: {
    clientId: "6f8cf1e8-b2ee-49ad-9b94-2dbb09871903",
    clientSecret:
      "6d80c9a356ce4317bd71d92c5734d67a-4a837b1336344f63b1b24ce2dfa73945-ef09daa8d0f74b1e8e223779c392a67b",
  },
};

// Using the default Client
const client = Client.create(config);

// Using the UniversalClient
const client = UniversalClient.create(config);

// Using the NodejsClient
const client = NodejsClient.create(config);
```

# Using the client

All of the API operations are available under the `client` instance returned by `Client.create({ ...options })`

```typescript
// Using async / await syntax
const listContentTypes = async () => {
  try {
    const result = await client.contentTypes.list();

    console.log("API call result: ", result);
    return result;
  } catch (error) {
    console.log("API call fetch error: ", error);
    throw error;
  }
};

listContentTypes();
```

```typescript
// Using Promises and callbacks
function listContentTypes() {
  client.contentTypes
    .list()
    .then((result) => {
      console.log("API call result: ", result);
      return result;
    })
    .catch((error) => {
      console.log("API call fetch error: ", error);
      throw error;
    });
}

listContentTypes();
```

# Fetch API

This library uses the `fetch` API and relies on it being available at runtime.

## Browser support

In modern browsers `fetch` is available natively, a polyfill is provided for older browsers.

## Node.js support

When using this library in Node.js the `fetch` API is already polyfilled with [`cross-fetch`](https://www.npmjs.com/package/cross-fetch) package (which uses [`node-fetch`](https://www.npmjs.com/package/node-fetch) when used with a Node.js runtime).

Node.js [version 16](https://nodejs.org/docs/latest-v16.x/api/globals.html#fetch) introduced experimental support for a native global `fetch` API and shipped as standard with Node.js versions [18](https://nodejs.org/docs/latest-v18.x/api/globals.html#fetch) and [20](https://nodejs.org/docs/latest-v20.x/api/globals.html#fetch). The global `fetch` support in Node.js [version 21](https://nodejs.org/docs/latest-v21.x/api/globals.html#fetch) and greater is marked as stable.

## Use your own fetch

You can override the built-in fetch API by providing your own `fetchFn` method when creating the Client.

Method calls that require fetch invoked from this client instance will be made using your chosen API.

```typescript
import { Client } from "contensis-management-api";
import enterpriseFetch from "enterprise-fetch";

const client = Client.create({
  ...config
  fetchFn: enterpriseFetch,
});
```
