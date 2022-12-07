import { BunnyConstructor } from './interfaces';
declare class BunnyCDN {
    BUNNY_API_URL: string;
    ACCESS_KEY: string;
    PULLZONE_URL: string;
    STORAGEZONE_NAME: string;
    STORAGEZONE_REGION: string;
    STORAGEZONE_PASSWORD: string;
    STORAGEZONE_URL: string;
    talkToBunny: Function;
    constructor({ accessKey, pullZone, storageZoneName, storageZoneRegion, storageZonePassword }: BunnyConstructor);
    storage: {
        list: (path: string) => Promise<any>;
        download: (storagePath: string, destinationPath: string) => Promise<string>;
        upload: (pathToFile: string, storagePath: string) => Promise<string>;
    };
    stream: {};
    pullzone: {
        list: (params: any) => Promise<any>;
        get: (id: string | number) => Promise<any>;
        add: (args: any) => Promise<any>;
        update: (id: string | number, args: any) => Promise<any>;
        delete: (id: string | number, args: any) => Promise<any>;
    };
}
export default BunnyCDN;
//# sourceMappingURL=BunnyCDN.d.ts.map