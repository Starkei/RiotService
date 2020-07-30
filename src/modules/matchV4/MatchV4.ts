import {makeGetRequest, createRiotRequestOptions} from "../../utils/makeRequest"
import {IMatchDTO, IMatchListDTO, IMatchTimeLineDTO} from "./interfaces"

export class MatchV4Module{
    private readonly END_POINT_MATCHES_BY_TOURNAMENT_CODE: string = "/lol/match/v4/matches/by-tournament-code/{tournamentCode}/ids";
    private readonly END_POINT_MATCHES_BY_MATCH_ID: string = "/lol/match/v4/matches/{matchId}";
    private readonly END_POINT_MATCHES_BY_MATCH_ID_AND_TOURNAMENT_CODE: string = "/lol/match/v4/matches/{matchId}/by-tournament-code/{tournamentCode}";
    private readonly END_POINT_MATCH_LIST_BY_ACCOUNT: string = "/lol/match/v4/matchlists/by-account/{encryptedAccountId}";
    private readonly END_POINT_TIMELINES_BY_MATCH: string = "/lol/match/v4/timelines/by-match/{matchId}";

    constructor(private readonly riotApiToken: string){}

    /*
     * @return ids of tournament 
     */
    public getMatchesByTournamentCode(tournamentCode: number): Promise<number[]>{
        const url: string = this.END_POINT_MATCHES_BY_TOURNAMENT_CODE.replace("{tournamentCode}", tournamentCode + "");
        return makeGetRequest<number[]>(
            createRiotRequestOptions(url, this.riotApiToken)
        );
    }

    /*
     * @return MatchDTO
     */
    public getMatchesByMatchId(matchId: number): Promise<IMatchDTO> {
        const url: string = this.END_POINT_MATCHES_BY_MATCH_ID.replace("{matchId}", matchId + "");
        return makeGetRequest<IMatchDTO>(
            createRiotRequestOptions(url, this.riotApiToken) 
        );
    } 

    /*
     * @return MatchDTO
     */
    public getMatchesByMatchIdAndTournamentCode(matchId: number, tournamentCode: number): Promise<IMatchDTO> {
        const url: string = this.END_POINT_MATCHES_BY_MATCH_ID_AND_TOURNAMENT_CODE.replace("{matchId}", matchId + "").replace("{tournamentCode}", tournamentCode + "");
        return makeGetRequest<IMatchDTO>(
            createRiotRequestOptions(url, this.riotApiToken)
        );
    }

    /*
     *
     */
    public getMatchListByAccountId(encryptedAccountId: string): Promise<IMatchListDTO>{
        const url: string = this.END_POINT_MATCH_LIST_BY_ACCOUNT.replace("{encryptedAccountId}", encryptedAccountId);
        return makeGetRequest<IMatchListDTO>(
            createRiotRequestOptions(url, this.riotApiToken)
        );
    }
    
    /*
     *
     */
    public getTimelinesByMatch(matchId: number): Promise<IMatchTimeLineDTO>{
        const url: string = this.END_POINT_TIMELINES_BY_MATCH.replace("{matchId}", matchId + "");
        return makeGetRequest<IMatchTimeLineDTO>(
            createRiotRequestOptions(url, this.riotApiToken)
        );
    }
}
