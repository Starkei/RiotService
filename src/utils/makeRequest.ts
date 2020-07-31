import {IncomingMessage} from "http"
import https, {RequestOptions} from "https"
import {parse} from "url"
import {ResponseErrorsEnum} from "../enums/ResponseErrorsEnum"

export const RIOT_API_TOKEN_HEADER_NAME: string = "X-Riot-Token";

export function createRiotRequestOptions(url: string, apiToken: string): RequestOptions | never{
    const {hostname, path} = parse(url);
    if (!hostname || !path) throw Error(`Error: Invalid url \n\thostname: ${hostname};\n\tpath: ${path};`);
    return {
        hostname,
        path,
        headers: {
            [RIOT_API_TOKEN_HEADER_NAME] : apiToken
        }
    } as RequestOptions;
}

const mapResponseErrorHint: Map<ResponseErrorsEnum, Error> = new Map([
    [ResponseErrorsEnum.FORBIDDEN, new Error(
        "Error: Old api key, regenerate it please, or check access to this end point\nhttps://developer.riotgames.com/"
    )],
    [ResponseErrorsEnum.BAD_GATEWAY, new Error()],
    [ResponseErrorsEnum.BAD_REQUEST, new Error()],
    [ResponseErrorsEnum.UNAUTHORIZED, new Error()],
    [ResponseErrorsEnum.DATA_NOT_FOUNT, new Error(
        "Error: Data not found, check your input"
    )],
    [ResponseErrorsEnum.GATEWAY_TIMEOUT, new Error()],
    [ResponseErrorsEnum.METHOD_NOT_ALLOWED, new Error()],
    [ResponseErrorsEnum.RATE_LIMIT_EXCEEDED, new Error(
        "Error: Rate limit is 20 request per second and 100 request per minute"
    )],
    [ResponseErrorsEnum.SERVICE_UNAVAILABLE, new Error()],
    [ResponseErrorsEnum.INTERNAL_SERVER_ERROR, new Error()],
    [ResponseErrorsEnum.UNSUPPORTED_MEDIA_TYPE, new Error()]
]);

function isErrorResponse({status = 0} : any) : Error | undefined{
    const {status_code} = status;
    return mapResponseErrorHint.get(status_code);
}

export function makeGetRequest<T> (options: RequestOptions): Promise<T>{
    return new Promise((resolve, reject) => {
        https.get(options, (res: IncomingMessage) => {
            console.log(options);
            let data: string = "";
            res.on("data", (chunk: string) => {
                data += chunk;
            });
            res.on("end", () => {
                const parsedData = JSON.parse(data);
                const err: Error | undefined = isErrorResponse(parsedData);
                if (err){
                    reject(err);
                } else resolve(parsedData as T);
            })
        }).on("error", reject);
    });
}
