import {writeFile} from "fs"
import {parse} from "url"
import {get, RequestOptions} from "https"
import {IncomingMessage} from "http"
import {join} from "path"
import {config} from "dotenv"
config();

const endPoints = require("./endPoints.json");
export async function update() {
    return new Promise((resolve) => {
          
        const accountEndPoint: string = endPoints.hostname + endPoints.account.replace("{summonerName}", endPoints.summonerName);
        const {hostname, path} = parse(accountEndPoint);
        const ro: RequestOptions = {
            hostname,
            path,
            headers: {
                "X-Riot-Token": process.env.RIOT_API_KEY
            }
        }
        //Account
        get(ro, (res: IncomingMessage) => {
            console.log(ro);
            
            let accountData: string = "";
            res.on("data", (chunk: string) => {
               accountData += chunk; 
            });

            res.on("end", () => {

                const account: any = JSON.parse(accountData);
                writeFile(join(__dirname, "./../__tests__/testData/accountDTO.json"), accountData, () => {});
                ro.path = parse(endPoints.matchList.replace("{encryptedAccountId}", account.accountId)).path;
                //MatchList 
                get(ro, (res: IncomingMessage) => {
                    console.log(ro);

                    let matchListData: string = "";
                    res.on("data", (chunk: string) => {
                        matchListData += chunk;
                    });

                    res.on("end", () => {
                        const matchList: any = JSON.parse(matchListData);
                        writeFile(join(__dirname, "./../__test__/testData/matchListDTO.json"), matchListData, () => {});
                        const matchId: string = matchList.matches[1].gameId;
                        ro.path = parse(endPoints.match.replace("{matchId}", matchId)).path;
                        let [endMatch, endMatchTimeline] = [false, false]; 

                        //Match
                        get(ro, (res: IncomingMessage) => {
                    
                            console.log(ro);
                            let matchData: string = ""; 
                            res.on("data", (chunk: string) => {
                                matchData += chunk; 
                            });
                            res.on("end", () => {
                                writeFile(join(__dirname, "./../__test__/testData/matchDTO.json"), matchData, () => {});
                                endMatch = true;
                                if (endMatch && endMatchTimeline){
                                    writeFile(join(__dirname, "./../__tests__/testData/qparams.json"), JSON.stringify({
                                        accountId: account.accountId,
                                        matchId: matchId
                                    }), resolve);
                                } 
                            });

                        });
                        
                        ro.path = parse(endPoints.match.replace("{matchId}", matchId)).path;
                        //MatchTimeline
                        get(ro, (res: IncomingMessage) => {
                            console.log(ro);
                            let matchTimelineData: string = "";
                            res.on("data", (chunk: string) => {
                                matchTimelineData+=chunk;
                            });
                            res.on("end", ()=> {
                                writeFile(join(__dirname, "./../__test__/testData/matchTimeline.json"), matchTimelineData, () => {});
                                endMatchTimeline = true;
                                if (endMatch && endMatchTimeline){
                                    writeFile(join(__dirname, "./../__tests__/testData/qparams.json"), JSON.stringify({
                                        accountId: account.accountId,
                                        matchId: matchId
                                    }), resolve);
                                }
                            });
                        });
                    })
                });
            })
        });
    })
}
