import {IncomingMessage} from "http"
import https, {RequestOptions} from "https"

export const RIOT_API_TOKEN_HEADER_NAME: string = "X-Riot-Api-Token";

export function createRiotRequestOptions(url: string, apiToken: string): RequestOptions{
    return {
        path: url,
        headers: {
            [RIOT_API_TOKEN_HEADER_NAME] : apiToken
        }
    } as RequestOptions;
}

export function makeGetRequest<T> (options: RequestOptions): Promise<T>{
    return new Promise((resolve, reject) => {
        https.get(options, (res: IncomingMessage) => {
            let data: string = "";
            res.on("data", (chunk: string) => {
                data += chunk;
            });
            res.on("end", () => {
                resolve(JSON.parse(data) as T);
            })
        }).on("error", reject);
    });
}
