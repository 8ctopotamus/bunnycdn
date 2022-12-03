declare class BunnyNet {
    BUNNY_API_URL: string;
    ACCESS_KEY: string;
    PULLZONE: string;
    PULLZONE_URL: string;
    STORAGEZONE_NAME: string;
    STORAGEZONE_PASSWORD: string;
    STORAGEZONE_URL: string;
    talkToBunny: Function;
    constructor({ accessKey, pullZone, storageZoneName, storageZonePassword }: {
        accessKey: any;
        pullZone: any;
        storageZoneName: any;
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
        upload: (path: string, fileName: string, args: any) => Promise<any>;
        download: (path: string, fileName: string, args: any) => Promise<any>;
        delete: (path: string, fileName: string, args: any) => Promise<any>;
    };
    stream: {};
}
export default BunnyNet;
//# sourceMappingURL=BunnyNet.d.ts.map