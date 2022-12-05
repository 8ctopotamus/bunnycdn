import fetch from 'node-fetch'
import { 
  BunnyConstructor, 
  TalkToBunny, 
} from './interfaces'

class BunnyCDN {
  BUNNY_API_URL: string = 'https://api.bunny.net'
  ACCESS_KEY: string
  PULLZONE_URL: string
  STORAGEZONE_NAME: string
  STORAGEZONE_REGION: string
  STORAGEZONE_PASSWORD: string
  STORAGEZONE_URL: string
  talkToBunny: Function

  constructor({
    accessKey,
    pullZone,
    storageZoneName,
    storageZoneRegion,
    storageZonePassword
  }: BunnyConstructor) {
    this.ACCESS_KEY = accessKey
    this.PULLZONE_URL = `https://${pullZone}.b-cdn.net`
    this.STORAGEZONE_NAME = storageZoneName
    this.STORAGEZONE_REGION = storageZoneRegion
    this.STORAGEZONE_PASSWORD = storageZonePassword
    const region = this.STORAGEZONE_REGION ? `${this.STORAGEZONE_REGION}.` : ''
    this.STORAGEZONE_URL = `https://${region}storage.bunnycdn.com/${this.STORAGEZONE_NAME}`

    this.talkToBunny = async function({
      url,
      fetchArgs = {
        method: 'GET',
        headers: {},
        body: null,
      },
      ttbOptions = {
        responseType: 'json',
        stringifyBody: true,
      }
    }: TalkToBunny) {
      const { method, headers, body } = fetchArgs

      const {
        responseType = 'json',
        stringifyBody = true
      } = ttbOptions

      try {
        let finalBody = null
        if (body) {
          finalBody = stringifyBody
            ? JSON.stringify(body)
            : body
        }
        const args = {
          method,
          headers: {
            AccessKey: url.includes(this.PULLZONE_URL) ? this.ACCESS_KEY : this.STORAGEZONE_PASSWORD,
            accept: 'application/json',
            ...headers,
          },
          body: finalBody
        }
        console.log(method, url)
        console.log(args)
        // const response = await fetch(url, args)
        // if (!response.ok) 
        //   throw new Error(`BunnyCDN unexpected response: [${response.status}], ${response.statusText}`)
        // if (responseType === 'json') {
        //   return await response.json()
        // } else if (responseType === 'text') {
        //   return await response.text()
        // }
        // return response.body // you can decide what to do with it
      } catch(err) {
        throw err
      }
    }
  }
  
  pullzone = {
    list: async params => {
      // TODO: params
      return this.talkToBunny({ url: `${this.BUNNY_API_URL}/pullzone` })
    },
    get: async (id: string | number) => {
      // TODO: params
      return this.talkToBunny({ url: `${this.BUNNY_API_URL}/pullzone/${id}` })
    },
    add: async args => {
      return this.talkToBunny({
        url: `${this.BUNNY_API_URL}/pullzone`,
        fetchArgs: {
          method: 'POST',
          ...args, 
        },
      })
    },
    update: async (id: string | number, args) => {
      return this.talkToBunny({
        url: `${this.BUNNY_API_URL}/pullzone/${id}`, 
        fetchArgs: {
          method: 'PUT',
          ...args, 
        },
      })
    },
    delete: async (id: string | number, args) => {
      return this.talkToBunny({
        url: `${this.BUNNY_API_URL}/pullzone/${id}`, 
        fetchArgs: {
          method: 'DELETE',
          ...args, 
        }
      })
    },
  }
  
  storage = {
    list: async (path: string, args) => {
      return this.talkToBunny(`${this.STORAGEZONE_URL}/${path}/`, args)
    },
    download: async (path: string) => {
      return this.talkToBunny(`${this.STORAGEZONE_URL}/${path}`, {
        headers: {
          accept: '*/*'
        }
      }, null)
    },
    upload: async (path: string, blob: any) => {
      return this.talkToBunny(`${this.STORAGEZONE_URL}/${path}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/octet-stream',
          accept: null,
        },
        body: blob,
      })
    },
    delete: async (path: string) => {
      return this.talkToBunny(`${this.STORAGEZONE_URL}/${path}`, {
        method: 'DELETE',
      })
    },
  }

  stream = {}
}

export default BunnyCDN