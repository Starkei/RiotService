import {RequestOptions} from "https"

const testData: any = {
    data: "asdasda" 
}

export function makeGetRequest<T> (options: RequestOptions): Promise<T>{
    return new Promise((resolve, reject) => {
        if (!options.path)
            reject("Url is invalid");
        process.nextTick(() => {
            resolve(testData as T);
        });
    });
}
