import dotenv from 'dotenv'
import BunnyNet from './src/BunnyNet.js'

dotenv.config()

const { BUNNY_NET_ACCESS_KEY, BUNNY_NET_PULLZONE } = process.env

const bunny = new BunnyNet({
  pullzone: BUNNY_NET_PULLZONE,
  accessKey: BUNNY_NET_ACCESS_KEY
})

console.log(await bunny.listPullzones())
