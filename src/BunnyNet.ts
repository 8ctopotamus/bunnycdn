import fetch from 'node-fetch'

class BunnyNet {
  BUNNY_API_URL: string = 'https://api.bunny.net'
  ACCESS_KEY: string
  PULLZONE: string
  PULLZONE_URL: string
  STORAGEZONE_NAME: string
  talkToBunny: Function

  constructor({ accessKey, pullZone, storageZoneName }) {
    this.ACCESS_KEY = accessKey
    this.PULLZONE = `${pullZone}.b-cdn.net`
    this.PULLZONE_URL = `https://${this.PULLZONE}`
    this.STORAGEZONE_NAME = storageZoneName
    
    this.talkToBunny = async function(
      endpoint, 
      { 
        method = 'GET', 
        headers = {}, 
        body = null, 
      } = {}
    ) {
      try {
        const response = await fetch(`${this.BUNNY_API_URL}${endpoint}`, {
          method,
          headers: {
            ...headers,
            AccessKey: this.ACCESS_KEY,
            accept: 'application/json',
          },
          body: body ? JSON.stringify(body) : null
        })
        return await response.json()
      } catch(err) {
        throw err
      }
    }
  }
  
  pullzone = {
    list: async args => {
      return this.talkToBunny('/pullzone', args)
    },
    get: async (id: string, args) => {
      return this.talkToBunny(`/pullzone/${id}`, args)
    },
    add: async args => {
      return this.talkToBunny('/pullzone', args)
    },
    update: async args => {
      return this.talkToBunny('/pullzone', args)
    },
    delete: async args => {
      return this.talkToBunny('/pullzone', args)
    },
  }
  
  edge = {}

  stream = {}
}

export default BunnyNet