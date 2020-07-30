jest.mock("../../utils/makeRequest");
import {makeGetRequest} from "../../utils/makeRequest"

describe("#makeGetRequest", () => {
    test("should make request and return data with passed type", async () => {
       const data: any = await makeGetRequest<any>({path: "test" }); 
       expect(data).toBeDefined();
    });
});

