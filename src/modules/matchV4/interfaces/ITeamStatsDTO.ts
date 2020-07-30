import {ITeamBansDTO} from "./ITeamBansDTO"

export interface ITeamStatsDTO{
    towerKills : number;
    riftHeraldKills : number;
    firstBlood : boolean;
    inhibitorKills : number;
    bans : ITeamBansDTO[];
    firstBaron : boolean;
    firstDragon : boolean;
    dominionVictoryScore : number;
    dragonKills : number;
    baronKills : number;
    firstInhibitor : boolean;
    firstTower : boolean;
    vilemawKills : number;
    firstRiftHerald : boolean;
    teamId : number;
    win : string;
}
