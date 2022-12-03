declare class BunnyNet {
    BUNNY_API_URL: string;
    constructor({ accessKey, pullZone, storageZoneName }: {
        accessKey: any;
        pullZone: any;
        storageZoneName: any;
    });
    pullzone: {
        list: (args: any) => Promise<any>;
    };
    edge: {};
    stream: {};
}
export default BunnyNet;
//# sourceMappingURL=BunnyNet.d.ts.map