import {IMatchPositionDTO} from "./IMatchPositionDTO"

export interface IMatchParticipantFrameDTO{
    participantId : number;
    minionsKilled : number;
    teamScore : number;
    dominionScore : number;
    totalGold : number;
    level : number;
    xp : number;
    currentGold : number;
    position : IMatchPositionDTO;
    jungleMinionsKilled : number
}
