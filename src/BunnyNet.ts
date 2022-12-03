import fetch from 'node-fetch'

class BunnyNet {
  BUNNY_API_URL: string = 'https://api.bunny.net'
  ACCESS_KEY: string
  PULLZONE: string
  PULLZONE_URL: string
  STORAGEZONE_NAME: string
  STORAGEZONE_PASSWORD: string
  STORAGEZONE_URL: string
  talkToBunny: Function

  constructor({ accessKey, pullZone, storageZoneName, storageZonePassword }) {
    this.ACCESS_KEY = accessKey
    this.PULLZONE = `${pullZone}.b-cdn.net`
    this.STORAGEZONE_NAME = storageZoneName
    this.STORAGEZONE_PASSWORD = storageZonePassword
    this.PULLZONE_URL = `https://${this.PULLZONE}`
    this.STORAGEZONE_URL = `https://storage.bunnycdn.com/${this.STORAGEZONE_NAME}`
    
    this.talkToBunny = async function(
      url, 
      { 
        method = 'GET', 
        headers = {}, 
        body = null, 
      } = {}
    ) {
      try {
        const args = {
          method,
          headers: {
            ...headers,
            AccessKey: url.includes(this.PULLZONE_URL) ? this.ACCESS_KEY : this.STORAGEZONE_PASSWORD,
            accept: 'application/json',
          },
          body: body ? JSON.stringify(body) : null
        }
        console.log(url)
        console.log(args)
        const response = await fetch(url, args)
        return await response.json()
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
    upload: async (path: string, fileName: string, args) => {
      return this.talkToBunny(`${this.STORAGEZONE_URL}/${path}/${fileName}`, {
        ...args,
        method: 'PUT',
        headers: {
          ...args.headers,
          'content-type': 'octet-stream'
        }, 
      })
    },
    download: async (path: string, fileName: string, args) => {
      return this.talkToBunny(`${this.STORAGEZONE_URL}/${path}/${fileName}`, args)
    },
    delete: async (path: string, fileName: string, args) => {
      return this.talkToBunny(`${this.STORAGEZONE_URL}/${path}/${fileName}`, {
        method: 'DELETE',
        ...args, 
      })
    },
  }

  stream = {}
}

export default BunnyNet