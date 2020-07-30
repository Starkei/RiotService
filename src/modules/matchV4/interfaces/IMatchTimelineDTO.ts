import {IMatchFrameDTO} from "./IMatchFrameDTO"

export interface IMatchTimeLineDTO{
    frames: IMatchFrameDTO[];
    frameInterval: number;
}
