declare class BunnyCDN {
    BUNNY_API_URL: string;
    ACCESS_KEY: string;
    PULLZONE: string;
    PULLZONE_URL: string;
    STORAGEZONE_NAME: string;
    STORAGEZONE_REGION: string;
    STORAGEZONE_PASSWORD: string;
    STORAGEZONE_URL: string;
    talkToBunny: Function;
    constructor({ accessKey, pullZone, storageZoneName, storageZoneRegion, storageZonePassword }: {
        accessKey: any;
        pullZone: any;
        storageZoneName: any;
        storageZoneRegion: any;
        storageZonePassword: any;
    });
    pullzone: {
        list: (args: any) => Promise<any>;
        get: (id: string, args: any) => Promise<any>;
        add: (args: any) => Promise<any>;
        update: (args: any) => Promise<any>;
        delete: (args: any) => Promise<any>;
    };
    storage: {
        list: (path: string, args: any) => Promise<any>;
        download: (path: string) => Promise<any>;
        upload: (path: string, blob: any) => Promise<any>;
        delete: (path: string) => Promise<any>;
    };
    stream: {};
}
export default BunnyCDN;
//# sourceMappingURL=BunnyCDN.d.ts.map