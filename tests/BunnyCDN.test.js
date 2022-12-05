import * as dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'
import { pipeline } from 'node:stream'
import { promisify } from 'util'
import BunnyCDN from '../lib/BunnyCDN.js'

const {
  BUNNY_NET_ACCESS_KEY,
  BUNNY_NET_PULLZONE,
  BUNNY_NET_STORAGEZONE_NAME,
  BUNNY_NET_STORAGEZONE_REGION,
  BUNNY_NET_STORAGEZONE_PASSWORD,
} = process.env

let bunny

beforeAll(() => {
  bunny = new BunnyCDN({
    pullZone: BUNNY_NET_PULLZONE,
    accessKey: BUNNY_NET_ACCESS_KEY,
    storageZoneName: BUNNY_NET_STORAGEZONE_NAME,
    storageZoneRegion: BUNNY_NET_STORAGEZONE_REGION,
    storageZonePassword: BUNNY_NET_STORAGEZONE_PASSWORD
  })
})

describe('BunnyCDN class ', () => {
  describe('Constructor', () => {
    it('Correctly constructs a Pull Zone URL', () => {
      const pzURL = `https://${BUNNY_NET_PULLZONE}.b-cdn.net`
      expect(bunny.PULLZONE_URL).toEqual(pzURL)
    })
    it('Correctly constructs a Storage Zone URL', () => {
      const region = BUNNY_NET_STORAGEZONE_REGION ? `${BUNNY_NET_STORAGEZONE_REGION}.` : ''
      const szURL = `https://${region}storage.bunnycdn.com/${BUNNY_NET_STORAGEZONE_NAME}`
      expect(bunny.STORAGEZONE_URL).toEqual(szURL)
    })
  })
})

// GET all pullzones
// console.log( await bunny.pullzone.list() )

// List files in edge storage
// console.log( await bunny.storage.list('images') )

// // Upload
// import { Blob } from 'buffer'

// let content = fs.readFileSync('./tiger.jpg')
// const blob = new Blob([content], { type: 'image/jpg' })

// await bunny.storage.upload('images/tiger-uploaded-2.jpg', blob)

// // Download
// const streamPipeline = promisify(pipeline)
// try {
//   const response = await bunny.storage.download('images/tiger.jpg')
  
//   if (!response.ok) throw new Error('Unexpected response', response.statusText)
  
//   await streamPipeline(response.body, fs.createWriteStream('./tiger-downloaded.jpg'))
// }catch(err) {
//   console.log(err)
// }