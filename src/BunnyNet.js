import fetch from 'node-fetch'

class BunnyNet {
  BUNNY_API_URL='https://api.bunny.net'

  constructor({ accessKey, pullzone }) {
    this.accessKey = accessKey // NOTE: this can also be the storage zone password
    this.pullzone = `${pullzone}.b-cdn.net`
    this.pullzoneURL = `https://${this.pullzone}`
    this.talkToBunny = async function(endpoint, { method = 'GET', headers = {}, body = null } = {}) {
      try {
        const response = await fetch(`${this.BUNNY_API_URL}${endpoint}`, {
          method,
          headers: {
            ...headers,
            AccessKey: this.accessKey,
            accept: 'application/json'
          },
          body: body ? JSON.stringify(body) : null
        })
        return await response.json()
      } catch(err) {
        throw err
      }
    }
  }

  api = {
    pullzone: {
      list: async args => {
        return await this.talkToBunny('/pullzone', args)
      }
    }
  }
}

export default BunnyNet