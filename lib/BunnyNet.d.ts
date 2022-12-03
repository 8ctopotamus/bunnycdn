declare class BunnyNet {
    BUNNY_API_URL: string;
    ACCESS_KEY: string;
    PULLZONE: string;
    PULLZONE_URL: string;
    STORAGEZONE_NAME: string;
    talkToBunny: Function;
    constructor({ accessKey, pullZone, storageZoneName }: {
        accessKey: any;
        pullZone: any;
        storageZoneName: any;
    });
    pullzone: {
        list: (args: any) => Promise<any>;
        get: (id: string, args: any) => Promise<any>;
        add: (args: any) => Promise<any>;
        update: (args: any) => Promise<any>;
        delete: (args: any) => Promise<any>;
    };
    edge: {};
    stream: {};
}
export default BunnyNet;
//# sourceMappingURL=BunnyNet.d.ts.map