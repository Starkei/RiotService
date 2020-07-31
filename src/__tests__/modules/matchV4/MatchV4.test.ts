import {config} from "dotenv"
config();
import {MatchV4Module} from "../../../modules/matchV4/MatchV4"
import {update} from "../../../testUtils/updateTestData"
const testMatchDTO = require("../../testData/matchDTO.json");
const testMatchListDTO = require("../../testData/matchListDTO.json");
const testMatchTimelineDTO = require("../../testData/matchTimeline.json");
const testQParams = require("../../testData/qparams.json");

describe("#MatchV4", async () => {
    beforeAll(update);
    const module: MatchV4Module = new MatchV4Module(process.env.RIOT_API_KEY|| "NONE");
    if (process.env.RIOT_API_KEY){
        const shouldReturnData: any[][] = [
            [
                module.getMatchesByMatchId, [testQParams.matchId], testMatchDTO
            ],
            [
                module.getMatchListByAccountId, [testQParams.accountId], testMatchListDTO 
            ],
            [
                module.getTimelinesByMatch, [testQParams.matchId], testMatchTimelineDTO 
            ]
        ]
        const shouldReturnError: any[][] = [
            [
                module.getMatchesByTournamentCode, [1]
            ],
            [
                module.getMatchesByMatchId, [1] 
            ],
            [
                module.getMatchListByAccountId, ["1"]
            ],
            [

                module.getTimelinesByMatch, [1]
            ],
            [
                module.getMatchesByMatchIdAndTournamentCode, [1]
            ]
        ];
        describe("#methods which should return err", () => {
            for(const [method, params] of shouldReturnError){
                test(`method ${method.name} should return err`, async () => {
                    let err: Error | undefined = undefined;
                    try{
                        await method.call(module, params);
                    }catch(e){
                        err = e;
                    }
                    expect(err).toBeDefined();
                })  
            }  
        });

        describe("#methids which should return data", () => {
            for(const [method, params, expectData] of shouldReturnData){
                test(`method ${method.name} should return data`, async () => {
                    const data: any = await method.call(module, params);
                    expect(data).toBeDefined();
                    expect(data).toEqual(expectData);
                })
            }
        });
    }
});
