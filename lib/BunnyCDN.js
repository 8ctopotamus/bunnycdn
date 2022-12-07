var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'node:stream';
import { promisify } from 'util';
import { Blob } from 'buffer';
import mime from 'mime-types';
var streamPipeline = promisify(pipeline);
var BunnyCDN = /** @class */ (function () {
    function BunnyCDN(_a) {
        var accessKey = _a.accessKey, pullZone = _a.pullZone, storageZoneName = _a.storageZoneName, storageZoneRegion = _a.storageZoneRegion, storageZonePassword = _a.storageZonePassword;
        var _this = this;
        this.BUNNY_API_URL = 'https://api.bunny.net';
        this.storage = {
            list: function (path) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.talkToBunny({ url: "".concat(this.STORAGEZONE_URL, "/").concat(path, "/") })];
                });
            }); },
            download: function (storagePath, destinationPath) { return __awaiter(_this, void 0, void 0, function () {
                var responseBody;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.talkToBunny({
                                url: "".concat(this.STORAGEZONE_URL, "/").concat(storagePath),
                                fetchArgs: {
                                    method: 'GET',
                                    headers: {
                                        accept: '*/*'
                                    },
                                    body: null,
                                },
                                ttbOptions: {
                                    responseType: null,
                                    stringifyBody: false
                                }
                            })];
                        case 1:
                            responseBody = _a.sent();
                            return [4 /*yield*/, streamPipeline(responseBody, fs.createWriteStream(destinationPath))];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, destinationPath];
                    }
                });
            }); },
            upload: function (pathToFile, storagePath) { return __awaiter(_this, void 0, void 0, function () {
                var szURL, content, ext, type, blob;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            szURL = "".concat(this.STORAGEZONE_URL, "/").concat(storagePath);
                            content = fs.readFileSync(pathToFile);
                            ext = path.extname(pathToFile);
                            type = mime.lookup(ext);
                            blob = new Blob([content], { type: type });
                            return [4 /*yield*/, this.talkToBunny({
                                    url: szURL,
                                    fetchArgs: {
                                        method: 'PUT',
                                        headers: {
                                            'content-type': 'application/octet-stream',
                                            accept: null,
                                        },
                                        body: blob,
                                    },
                                    ttbOptions: {
                                        responseType: null,
                                        stringifyBody: false
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, szURL];
                    }
                });
            }); },
            delete: function (path) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.talkToBunny({
                            url: "".concat(this.STORAGEZONE_URL, "/").concat(path),
                            fetchArgs: {
                                method: 'DELETE',
                            },
                        })];
                });
            }); },
        };
        this.stream = {};
        this.pullzone = {
            list: function (params) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // TODO: params
                    return [2 /*return*/, this.talkToBunny({ url: "".concat(this.BUNNY_API_URL, "/pullzone") })];
                });
            }); },
            get: function (id) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // TODO: params
                    return [2 /*return*/, this.talkToBunny({ url: "".concat(this.BUNNY_API_URL, "/pullzone/").concat(id) })];
                });
            }); },
            add: function (args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.talkToBunny({
                            url: "".concat(this.BUNNY_API_URL, "/pullzone"),
                            fetchArgs: __assign({ method: 'POST' }, args),
                        })];
                });
            }); },
            update: function (id, args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.talkToBunny({
                            url: "".concat(this.BUNNY_API_URL, "/pullzone/").concat(id),
                            fetchArgs: __assign({ method: 'PUT' }, args),
                        })];
                });
            }); },
            delete: function (id, args) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.talkToBunny({
                            url: "".concat(this.BUNNY_API_URL, "/pullzone/").concat(id),
                            fetchArgs: __assign({ method: 'DELETE' }, args)
                        })];
                });
            }); },
        };
        this.ACCESS_KEY = accessKey;
        this.PULLZONE_URL = "https://".concat(pullZone, ".b-cdn.net");
        this.STORAGEZONE_NAME = storageZoneName;
        this.STORAGEZONE_REGION = storageZoneRegion;
        this.STORAGEZONE_PASSWORD = storageZonePassword;
        var region = this.STORAGEZONE_REGION ? "".concat(this.STORAGEZONE_REGION, ".") : '';
        this.STORAGEZONE_URL = "https://".concat(region, "storage.bunnycdn.com/").concat(this.STORAGEZONE_NAME);
        this.talkToBunny = function (_a) {
            var url = _a.url, _b = _a.fetchArgs, fetchArgs = _b === void 0 ? {
                method: 'GET',
                headers: {},
                body: null,
            } : _b, _c = _a.ttbOptions, ttbOptions = _c === void 0 ? {
                responseType: 'json',
                stringifyBody: true,
            } : _c;
            return __awaiter(this, void 0, void 0, function () {
                var method, headers, body, _d, responseType, _e, stringifyBody, finalBody, accessKey_1, args, response, err_1;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            method = fetchArgs.method, headers = fetchArgs.headers, body = fetchArgs.body;
                            _d = ttbOptions.responseType, responseType = _d === void 0 ? 'json' : _d, _e = ttbOptions.stringifyBody, stringifyBody = _e === void 0 ? true : _e;
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 7, , 8]);
                            finalBody = null;
                            if (body) {
                                finalBody = stringifyBody
                                    ? JSON.stringify(body)
                                    : body;
                            }
                            accessKey_1 = url.includes(this.PULLZONE_URL) ? this.ACCESS_KEY : this.STORAGEZONE_PASSWORD;
                            args = {
                                method: method,
                                headers: __assign({ AccessKey: accessKey_1, accept: 'application/json' }, headers),
                                body: finalBody
                            };
                            console.log(method, url);
                            console.log(args);
                            return [4 /*yield*/, fetch(url, args)];
                        case 2:
                            response = _f.sent();
                            if (!response.ok)
                                throw new Error("BunnyCDN unexpected response: [".concat(response.status, "], ").concat(response.statusText));
                            if (!(responseType === 'json')) return [3 /*break*/, 4];
                            return [4 /*yield*/, response.json()];
                        case 3: return [2 /*return*/, _f.sent()];
                        case 4:
                            if (!(responseType === 'text')) return [3 /*break*/, 6];
                            return [4 /*yield*/, response.text()];
                        case 5: return [2 /*return*/, _f.sent()];
                        case 6: return [2 /*return*/, response.body]; // you can decide what to do with it
                        case 7:
                            err_1 = _f.sent();
                            throw err_1;
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
    }
    return BunnyCDN;
}());
export default BunnyCDN;
//# sourceMappingURL=BunnyCDN.js.map