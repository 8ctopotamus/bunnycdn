export interface BunnyConstructor {
  accessKey: string | undefined,
  pullZone: string | undefined,
  storageZoneName: string | undefined,
  storageZoneRegion: string | undefined,
  storageZonePassword: string | undefined,
}

export interface TalkToBunny { 
  url: string, 
  fetchArgs: {
    method: string | null | undefined,
    headers: object | null | undefined,
    body: any | undefined
  } | null | undefined,
  ttbOptions: {
    responseType: string | null | undefined,
    stringifyBody: boolean | null | undefined,
  } | null | undefined,
}