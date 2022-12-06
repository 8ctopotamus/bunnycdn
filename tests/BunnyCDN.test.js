import * as dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'
import path from 'path'
import { pipeline } from 'node:stream'
import { promisify } from 'util'
import { Blob } from 'buffer'
import BunnyCDN from '../lib/BunnyCDN.js'

const {
  BUNNY_NET_ACCESS_KEY,
  BUNNY_NET_PULLZONE,
  BUNNY_NET_STORAGEZONE_NAME,
  BUNNY_NET_STORAGEZONE_REGION,
  BUNNY_NET_STORAGEZONE_PASSWORD,
} = process.env

let bunny = new BunnyCDN({
  pullZone: BUNNY_NET_PULLZONE,
  accessKey: BUNNY_NET_ACCESS_KEY,
  storageZoneName: BUNNY_NET_STORAGEZONE_NAME,
  storageZoneRegion: BUNNY_NET_STORAGEZONE_REGION,
  storageZonePassword: BUNNY_NET_STORAGEZONE_PASSWORD
})

const streamPipeline = promisify(pipeline)
const testImgBasePath = path.join(process.cwd(), 'tests', )
const testUploadImgPath = path.join(testImgBasePath, 'tiger.jpg')
const testDownloadedImgPath = path.join(testImgBasePath, 'tiger-downloaded.jpg')

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

  describe('Edge Storage API', () => {
    it('Uploads a file', async () => {
      try {
        let content = fs.readFileSync(testUploadImgPath)
        const blob = new Blob([content], { type: 'image/jpg' })
        const response = await bunny.storage.upload('images/tiger-uploaded.jpg', blob)
        expect(response.Ok).toBe(true)
      } catch(err) {
        console.log(err)
      }
    })
    it('Lists folders and files', async () => {
      const response = await bunny.storage.list('images')
      expect(typeof response).toBe('object')
    })
    it('Downloads a file ', async () => {
      try {
        const responseBody = await bunny.storage.download('images/tiger.jpg')
        await streamPipeline(responseBody, fs.createWriteStream(testDownloadedImgPath))
        const fileExists = fs.existsSync(testDownloadedImgPath)
        expect(fileExists).toBe(true)
      } catch(err) {
        console.log(err)
      }
    })
    it('Deletes a file', async () => {
      try {
        const countB4 = (await bunny.storage.list('images')).length
        await bunny.storage.delete('images/tiger-uploaded.jpg')
        const countAfter = (await bunny.storage.list('images')).length
        console.log(`B4: ${countB4}, After: ${countAfter}`)
        expect(countAfter).toBe(countB4 - 1)
      } catch(err) {
        console.log(err)
      }
    })
  })
})

afterAll(() => {
  // TODO: clean up downloaded file
})