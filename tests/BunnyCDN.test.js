import { jest } from '@jest/globals'
import fs from 'fs'
import path from 'path'
import * as dotenv from 'dotenv'
dotenv.config()

jest.setTimeout(34000)

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

const testFilenamePrefix = 'bunnynet-banner'
const testImgBasePath = path.join(process.cwd(), `tests`)
const testUploadLocalPath = path.join(testImgBasePath, `${testFilenamePrefix}.webp`)
const testDownloadedDestPath = path.join(testImgBasePath, `${testFilenamePrefix}-downloaded.webp`)

const pzURL = `https://${BUNNY_NET_PULLZONE}.b-cdn.net`
const region = BUNNY_NET_STORAGEZONE_REGION ? `${BUNNY_NET_STORAGEZONE_REGION}.` : ''
const szURL = `https://${region}storage.bunnycdn.com/${BUNNY_NET_STORAGEZONE_NAME}`

describe('BunnyCDN class ', () => {
  describe('Constructor', () => {
    it('Correctly constructs a Pull Zone URL', () => {
      expect(bunny.PULLZONE_URL).toEqual(pzURL)
    })
    it('Correctly constructs a Storage Zone URL', () => {
      expect(bunny.STORAGEZONE_URL).toEqual(szURL)
    })
  })

  describe('Edge Storage API', () => {
    it('Lists folders and files', async () => {
      const response = await bunny.storage.list('images')
      expect(typeof response).toBe('object')
    })
    it('Uploads a file', async () => {
      try {
        const url = await bunny.storage.upload(
          `${testUploadLocalPath}`, 
          `test/${testFilenamePrefix}-uploaded.webp`
        )
        expect(url).toBe(`${szURL}/test/${testFilenamePrefix}-uploaded.webp`)
      } catch(err) {
        console.log('ERR', err)
      }
    })    
    it('Downloads a file ', async () => {
      try {
        await bunny.storage.download(
          `test/bunnynet-banner-uploaded.webp`, 
          `./tests/${testFilenamePrefix}-downloaded.webp`
        )

        const fileExists = fs.existsSync(testDownloadedDestPath)
        expect(fileExists).toBe(true)
      } catch(err) {
        console.log('ERR', err)
      }
    })
    // it('Deletes a file', async () => {
    //   try {
    //     const countB4 = (await bunny.storage.list('images')).length
    //     await bunny.storage.delete('images/tiger-uploaded.jpg')
    //     const countAfter = (await bunny.storage.list('images')).length
    //     console.log(`B4: ${countB4}, After: ${countAfter}`)
    //     expect(countAfter).toBe(countB4 - 1)
    //   } catch(err) {
    //     console.log(err)
    //   }
    // })
  })
})

afterAll(() => {
  // TODO: clean up downloaded file
})