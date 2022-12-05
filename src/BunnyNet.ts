import fetch from 'node-fetch'

class BunnyNet {
  BUNNY_API_URL: string = 'https://api.bunny.net'
  ACCESS_KEY: string
  PULLZONE: string
  PULLZONE_URL: string
  STORAGEZONE_NAME: string
  STORAGEZONE_REGION: string
  STORAGEZONE_PASSWORD: string
  STORAGEZONE_URL: string
  talkToBunny: Function

  constructor({ accessKey, pullZone, storageZoneName, storageZoneRegion, storageZonePassword }) {
    this.ACCESS_KEY = accessKey
    this.PULLZONE = `${pullZone}.b-cdn.net`
    this.STORAGEZONE_NAME = storageZoneName
    this.STORAGEZONE_REGION = storageZoneRegion
    this.STORAGEZONE_PASSWORD = storageZonePassword
    this.PULLZONE_URL = `https://${this.PULLZONE}`
    const region = this.STORAGEZONE_REGION ? `${this.STORAGEZONE_REGION}.` : ''
    this.STORAGEZONE_URL = `https://${region}storage.bunnycdn.com/${this.STORAGEZONE_NAME}`
    
    this.talkToBunny = async function(
      url, 
      { 
        method = 'GET', 
        headers = {}, 
        body = null, 
      } = {},
      responseType = 'json'
    ) {
      try {
        const args = {
          method,
          headers: {
            AccessKey: url.includes(this.PULLZONE_URL) ? this.ACCESS_KEY : this.STORAGEZONE_PASSWORD,
            accept: 'application/json',
            ...headers,
          },
          body: body //body ? JSON.stringify(body) : null
        }
        console.log(url)
        console.log(args)
        const response = await fetch(url, args)
        console.log(response)
        if (responseType === 'json') {
          return await response.json()
        }
        console.log('no response type')
        return response
      } catch(err) {
        throw err
      }
    }
  }
  
  pullzone = {
    list: async args => {
      return this.talkToBunny(`${this.BUNNY_API_URL}/pullzone`, args)
    },
    get: async (id: string, args) => {
      return this.talkToBunny(`${this.BUNNY_API_URL}/pullzone/${id}`, args)
    },
    add: async args => {
      return this.talkToBunny(`${this.BUNNY_API_URL}/pullzone`, {
        method: 'POST',
        ...args, 
      })
    },
    update: async args => {
      return this.talkToBunny(`${this.BUNNY_API_URL}/pullzone`, {
        method: 'PUT',
        ...args, 
      })
    },
    delete: async args => {
      return this.talkToBunny(`${this.BUNNY_API_URL}/pullzone`, {
        method: 'DELETE',
        ...args, 
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

export default BunnyNet