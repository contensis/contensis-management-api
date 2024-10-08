# [![Contensis](https://github.com/contensis/cli/raw/refs/heads/main/assets/contensis-logo--white-tiny.svg)](https://www.contensis.com) contensis-management-api [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![NPM version](https://img.shields.io/npm/v/contensis-management-api.svg?style=flat)](https://www.npmjs.com/package/contensis-management-api)

[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en)

[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/) [![Electron](https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9)](https://electronjs.org/) [![Express.js](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/) [![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/) [![Vue.js](https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)

[![Contensis](https://img.shields.io/badge/Contensis-00304d?style=for-the-badge&logoColor=white&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MiA2NCIgaGVpZ2h0PSIxOCIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTQ3Ljc2MiAxOC40OTQtMy42MTItMi4wNmMuMzU4IDEuNjU1LjYzMSAzLjI5Ljc5OSA0Ljg1OS4xNDQgMS4zNTMuMzU4IDQuMzA5LjM1OCA0LjQ1djE5Ljk3NWMwIC40MjctLjUxOCAxLjMxMS0uODkyIDEuNTI2TDI2Ljg5MyA1Ny4yM2MtLjEwOS4wNjEtLjQ0OC4xNi0uODkxLjE2LS40NDUgMC0uNzg0LS4wOTktLjg5Mi0uMTZMNy41ODYgNDcuMjQ0Yy0uMzc2LS4yMTUtLjg5Mi0xLjA5OS0uODkyLTEuNTI2VjI1Ljc0NGMwLS40MjguNTE4LTEuMzEzLjg5Mi0xLjUyNWw5LjczMS01LjU0NmMxLjEzNC0xLjU0NSAyLjQzMy0zLjE4OSAzLjgyNy00Ljk1MSAxLjU0Ni0xLjk1NSAzLjE4OC00LjAzNiA0LjgzMy02LjI1OC0xLjU0Mi4wMDMtMy4wMzcuMzc0LTQuMjE2IDEuMDQ1TDQuMjM4IDE4LjQ5N0MxLjc4MyAxOS44OTUgMCAyMi45NDUgMCAyNS43NDR2MTkuOTc0YzAgMi43OTkgMS43ODMgNS44NDkgNC4yMzggNy4yNDlsMTcuNTIzIDkuOTg4YzEuMTgyLjY3NSAyLjY4OCAxLjA0NSA0LjI0IDEuMDQ1IDEuNTUgMCAzLjA1NC0uMzcgNC4yMzgtMS4wNDZsMTcuNTIzLTkuOTg3YzIuNDU2LTEuNCA0LjIzOC00LjQ1IDQuMjM4LTcuMjQ4VjI1Ljc0NGMwLTIuOC0xLjc4Mi01Ljg0OC00LjIzOC03LjI1WiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yMS41NzEgNTIuNzEzYzUuMDk0LTcuNDM4IDcuODYyLTE4LjcwOSA5LjE4NC0yNS43NzYtMy4zNDggNi4xNi05LjIyOSAxNS42NjYtMTYuNCAyMS42NzgtLjAzOC0uMDYzLS4wNjItLjAzOSA3LjIxNiA0LjA5OFoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMzMuMjAyLjQxMUMyNS43NDUgMTMuMDIgMTUuNzIzIDIxLjcyMiAxNS4wOTEgMjcuNDljLS41OSA1LjM4OCAxLjM2IDkuODM3IDQuNTU0IDEyLjYwNGE4MS4wODYgODEuMDg2IDAgMCAwIDMuNjE0LTQuODhjLS4wNTgtMS4xMTQtLjQ4Mi05LjgxNS40NC0xMi4yNjQuNTI3IDMuNzc4IDEuNjE2IDcuMjY1IDIuMDIgOC40ODNhMTEzLjk0OCAxMTMuOTQ4IDAgMCAwIDIuNzQ2LTQuNjg1Yy0uMDgzLTIuMjEzLS4zMTMtMTAuMDA4LjQ2LTExLjc5NC4yMDUgMi41NzUgMS4xNjMgNS44NTIgMS43MzggNy42MzcuNzY0LTEuNTIzIDEuMTgzLTIuNDUgMS4xOTMtMi40NzJsMi43MDUtNi4wMTYtLjcxIDYuNTQ1Yy0uMDA0LjAzNC0uMjQyIDIuMTkzLS44MiA1LjQ3OCAxLjU4Ni0xLjI4OSA0LjEwNC0zLjQ1NyA1LjMyOC01LjE2LjEwNSAyLjA1NC00LjQ0NCA3LjU1Ni02LjE5MyA5LjU5NC0uMTgzLjg0OS0uMzgyIDEuNzMtLjYgMi42MzUtLjE1NC42NC0uMzEyIDEuMjctLjQ3MyAxLjg5IDEuNTE3LS44NDIgNC45OTItMi44NiA2LjkzMi00LjY5Ny0uMjk0IDIuMDk1LTYuNDYgNy40MTktOC4wOSA4Ljc5NGE4MC4xNjEgODAuMTYxIDAgMCAxLTEuMzM2IDMuOThjMy43NDQtLjIxMyA3LjY3Ni0yLjEgMTAuOTY4LTYuMTM2QzQ5LjQwNyAyNC45NiAzNS42NzItMy43NjUgMzMuMjAyLjQxMVoiLz48L3N2Zz4=)](https://www.contensis.com)
[![Contensis Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)](https://contensis.slack.com)

Create a Contensis client that allows you to manage various aspects of your Contensis instance, project, content or deployments. It can be used in all your JavaScript / TypeScript projects, whether it runs in a browser, Node.js app, or both.

Read our documentation on [contensis.com](https://www.contensis.com/help-and-docs/apis/management-js) and there is a [contensis-management-api-examples](https://github.com/contensis/contensis-management-api-examples) repo containing Express and React examples.

Use with Contensis version 14.0 and above. This library requires Node.js 14 or above.

## Installation

Install the package to your project `dependencies` using npm, or your preferred Node.js package manager.

```shell
npm install --save contensis-management-api
```

> ### Note
>
> Before following the rest of the examples we assume you have an existing Node.js / Express.js application that is already created.
>
> To get started with a new Node.js app, inside a terminal, `cd` to your chosen directory and run `npm init`

## Import the correct client

Depending on how and where your code is used you may need to find the right Client flavour to import that creates the Management Client best suited to your use case

### Browser app

The default `Client` import targets primarily a modern browser and assumes the `fetch` API is already available.

```typescript
// Using TypeScript, or ES Module syntax
import { Client } from "contensis-management-api";

// Using Common JS syntax
const Client = require("contensis-management-api").Client;
```

### Universal JS app

Universal JavaScript describes a JavaScript application which runs both on the client and the server.

If your API interactions will be made using a part of your application that runs [Universal or Isomorphic JavaScript](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) you should instead use the `UniversalClient`

```typescript
// Using TypeScript, or ES Module syntax
import { UniversalClient } from "contensis-management-api";

// Using Common JS syntax
const UniversalClient = require("contensis-management-api").UniversalClient;
```

### Node.js app

For applications that run exclusively on a server, or via a terminal script you will likely want to import and use the `NodejsClient`

Some Management API functionality is only available in a Node.js environment for example creating and updating assets. The `NodejsClient` class ensures `fetch` API is made available and allows us to perform file operations with the `fs` API.

```typescript
// Using TypeScript, or ES Module syntax
import { NodejsClient } from "contensis-management-api/lib/client";

// Using Common JS syntax
const NodejsClient =
  require("contensis-management-api/lib/client").NodejsClient;
```

## Configure and create a client

The `config` argument passed to the `Client.create(...)` method represents the shared configuration that will be used by all Management API calls

Use the provided intellisense to guide you where it is available

```typescript
// Import the additional "Config" type when using TypeScript
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

## Using the client

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

## Fetch API

This library uses the `fetch` API and relies on it being available at runtime.

### Browser support

In modern browsers `fetch` is available natively, a polyfill is provided for older browsers.

### Node.js support

When using this library in Node.js the `fetch` API is already polyfilled with [`cross-fetch`](https://www.npmjs.com/package/cross-fetch) package (which uses [`node-fetch`](https://www.npmjs.com/package/node-fetch) when used with a Node.js runtime).

Node.js [version 16](https://nodejs.org/docs/latest-v16.x/api/globals.html#fetch) introduced experimental support for a native global `fetch` API and shipped as standard with Node.js versions [18](https://nodejs.org/docs/latest-v18.x/api/globals.html#fetch) and [20](https://nodejs.org/docs/latest-v20.x/api/globals.html#fetch). The global `fetch` support in Node.js [version 21](https://nodejs.org/docs/latest-v21.x/api/globals.html#fetch) and greater is marked as stable.

### Use your own fetch

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
