import {IRuneDTO} from "./IRuneDTO"
import {IParticipantStatsDTO} from "./IParticipantStatsDTO"
import {IParticipantTimelineDTO} from "./IParticipantTimelineDTO"
import {IMasterDTO} from "./IMasteryDTO"

export interface IParticipantDTO{
    participantId : number;
    championId : number;
    runes : IRuneDTO[];
    stats : IParticipantStatsDTO;
    teamId : number;
    timeline : IParticipantTimelineDTO;
    spell1Id : number;
    spell2Id : number;
    highestAchievedSeasonTier : string;
    masteries : IMasterDTO[];
}
