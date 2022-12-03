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

## TODO


### Bunny.Net API

* [] Abuse Case
* [] Countries
* [] Billing
* [] Compute
* [] Support
* [] DRM Certificate
* [] Region
* [] Stream Video Library
* [] DNS Zone
* [...] Pull Zone
* [] Purge
* [] Statistics
* [] Storage Zone
* [] User

### Edge Storage API

* [ ] Manage Files
  * [ ] Download File
  * [ ] Upload a File
  * [ ] Delete a File

* [ ] Browse Files
  * [ ] List Files

### Stream API

* [] Manage Collections
  * [] Get Collection
  * [] Update Collection
  * [] Delete Collection
  * [] Get Collection List
  * [] Create Collection

* [] Manage Videos
  * [ ] Get Videoget
  * [ ] Update Videopost
  * [ ] Delete Videodelete
  * [ ] Upload Videoput
  * [ ] Get Video Heatmapget
  * [ ] Get Video Statisticsget
  * [ ] Reencode Videopost
  * [ ] List Videosget
  * [ ] Create Videopost
  * [ ] Set Thumbnailpost
  * [ ] Fetch Videopost
  * [ ] Add Captionpost
  * [ ] Delete Caption

## Helpful links

* [BunnyNet API Docs](https://docs.bunny.net/docs)
* [How to allow ES6 Import/Exports AND CommonJS](https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html)