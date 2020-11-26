# contensis-management-api [![NPM version](https://img.shields.io/npm/v/contensis-management-api.svg?style=flat)](https://www.npmjs.com/package/contensis-management-api)
Contensis JavaScript Management API implementation written in TypeScript. This version targets Contensis 14.0 and above.

The *[contensis-management-api-examples](https://github.com/contensis/contensis-management-api-examples)* repo contains Express and React examples.

<!-- The following paragraphs are taken from https://github.com/contensis/docs-management-js/blob/master/key-concepts/api-instantiation.md -->

## Installing and importing the client *npm* package

The Contensis JS Management API client is delivered as an [*npm*](https://www.npmjs.com/package/contensis-management-api) package, with publicly available [source code](https://github.com/contensis/contensis-management-api) and [examples](https://github.com/contensis/contensis-management-api-examples).  
The client package can be used in a modern browser, in Node.js or as cross-platform client (e.g. a React.js application, a Node.js console application, an Express.js web application, a JavaScript or TypeScript library).

> ### Note
> Before following the rest of the examples we assume you have an existing Node.js or Express.js application that is already created, that targets Node.js >= 10 and uses the *CommonJS* module system (you can also use native JavaScript modules - see [examples](https://github.com/contensis/contensis-management-api-examples)).  
> The Contensis JS Management API client is using the *fetch* API to maintain consistency with the Contensis JS Delivery API client. The *fetch* API is not a native Node.js API and it is loaded from the *node-fetch* npm package when the Contensis JS Management API client runs in a Node.js environment (if it runs in a browser enviroment the native *fetch* API will be used instead).

To install the required packages for the Contensis JS Management API client please run the following Node.js command:
```
npm install contensis-management-api
```

Import default *Client* if you are using *CommonJS* modules:
```js
const Client = require('contensis-management-api').Client;
```

Import the default *Client* if you are using native JavaScript modules:
```js
import { Client } from 'contensis-management-api';
```

The default *Client* class exported in the *contensis-management-api* package targets primarily a modern browser and assumes the *fetch* API is already made available.

As an alternative you can use the *UniversalClient* class that ensures *fetch* API is always made available regardless if you are in a browser context or a Node.js context.

Import *UniversalClient* if you are using *CommonJS* modules:
```js
const UniversalClient = require('contensis-management-api/lib/client').UniversalClient;
```
Import *UniversalClient* if you are using native JavaScript modules:
```js
import { UniversalClient } from 'contensis-management-api/lib/client';
```
 Some Contensis JS Management API functionality is only available in a Node.js environment (e.g. creating and updating assets). In this scenario you need to use the *NodejsClient* class ensures *fetch* API is made available. 
  
Import *NodejsClient* if you are using *CommonJS* modules:
```js
const NodejsClient = require('contensis-management-api/lib/client').NodejsClient;
```

Import *NodejsClient* if you are using native JavaScript modules:
```js
import { NodejsClient } from 'contensis-management-api/lib/client';
```
 ## Creating and using the client instance 

All operations for the API hang off the `Client` type (or `UniversalClient` and `NodejsClient` if you are using those), which is created using the static method call `Client.create(options)`. The `options` object represents the shared configuration that will be used by all Management API calls and is of type [Config](/model/config.md):

```js
const client = Client.create({
  clientType: "client_credentials",
  clientDetails: {
    clientId: '6f8cf1e8-b2ee-49ad-9b94-2dbb09871903',
    clientSecret: '6d80c9a356ce4317bd71d92c5734d67a-4a837b1336344f63b1b24ce2dfa73945-ef09daa8d0f74b1e8e223779c392a67b'
  }
  projectId: 'website',
  rootUrl: 'https://cms-example.cloud.contensis.com'
});

client.contentTypes.list()
  .then(result => {      
      console.log('API call result: ', result);        
      return result;      
  })
  .catch(error => {
    console.log('API call fetch error: ', error);      
    throw error;
  });
```