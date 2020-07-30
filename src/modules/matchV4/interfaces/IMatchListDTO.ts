import {IMatchReferenceDTO} from "./IMatchReferenceDTO"

export interface IMatchListDTO{
    startIndex : number;
    totalGames : number;
    endIndex : number;
    matches :  IMatchReferenceDTO[];
}
