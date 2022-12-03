import dotenv from 'dotenv'
dotenv.config()

import BunnyNet from './lib/BunnyNet.js'

const {
  BUNNY_NET_ACCESS_KEY,
  BUNNY_NET_PULLZONE,
  BUNNY_NET_STORAGEZONE_NAME 
} = process.env

const bunny = new BunnyNet({
  pullzone: BUNNY_NET_PULLZONE,
  accessKey: BUNNY_NET_ACCESS_KEY,
  storageZoneName: BUNNY_NET_STORAGEZONE_NAME
})

// GET all pullzones
console.log(await bunny.pullzone.list())
