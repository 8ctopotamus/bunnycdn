# bunnynet-node-sdk

A NodeJS SDK for [Bunny.Net CDN](https://bunny.net/).
 
## Usage

```js
import BunnyNet from 'bunnynet-node-sdk'

const bunny = new BunnyNet({
  pullzone: process.env.BUNNY_NET_PULLZONE,
  accessKey: process.env.BUNNY_NET_ACCESS_KEY
})

console.log(await bunny.listPullzones())
```

## Develop

Create a `.env` file in the root of the project:

```env
BUNNY_NET_PULLZONE=
BUNNY_NET_ACCESS_KEY=
```

## Helpful links

* [BunnyNet API Docs](https://docs.bunny.net/docs)
* [How to allow ES6 Import/Exports AND CommonJS](https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html)