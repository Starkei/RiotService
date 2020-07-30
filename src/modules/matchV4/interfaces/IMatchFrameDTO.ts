import {IMatchParticipantFrameDTO} from "./IMatchParticipantFrameDTO"
import {IMatchEventDTO} from "./IMatchEventDTO"

export interface IMatchFrameDTO{
    participantFrames: Map<string, IMatchParticipantFrameDTO>;
    events: IMatchEventDTO[];
    timestamp: number;
}
