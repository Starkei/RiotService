import {IParticipantIdentityDTO} from "./IParticipantIdentity"
import {ITeamStatsDTO} from "./ITeamStatsDTO"
import {IParticipantDTO} from "./IParticipantDTO"

export interface IMatchDTO{
    gameId : number;
    participantIdentities : IParticipantIdentityDTO[];
    queueId : number;
    gameType : string;
    gameDuration : number;
    teams : ITeamStatsDTO[];
    platformId : string;
    gameCreation : number;
    seasonId : number;
    gameVersion : string;
    mapId : number;
    gameMode : string;
    participants : IParticipantDTO[];
}
