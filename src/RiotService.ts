import {MatchV4Module} from "./modules"

export class RiotService{

    private matchV4Module: MatchV4Module | null = null;

    constructor(private readonly riotApiToken: string){}

    public getMatchV4Module(): MatchV4Module {
        if (this.matchV4Module)
            return this.matchV4Module;
        this.matchV4Module = new MatchV4Module(this.riotApiToken);
        return this.matchV4Module;
    }

    public getMatchV4ModuleLight(): MatchV4Module {
        return new MatchV4Module(this.riotApiToken);
    }
}
