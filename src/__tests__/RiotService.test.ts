import {RiotService} from "../RiotService"
import {MatchV4Module} from "../modules/matchV4/MatchV4"

describe("#RiotService", () => {
    describe("#getMatchV4Module", () => {
        test("should return module MatchV4Module", () => {
            const m: MatchV4Module = new MatchV4Module("");
            const r: RiotService = new RiotService("");
            expect(r.getMatchV4Module()).toEqual(m);
        });

        test("should not create new instance of module", () => {
            const r: RiotService = new RiotService("");
            const m: MatchV4Module = r.getMatchV4Module();
            expect(r.getMatchV4Module()).toBe(m);
        });
    });

    describe("#getMatchV4ModuleLight", () => {
        test("should return module MatchV4Module", () => {
            const m: MatchV4Module = new MatchV4Module("");
            const r: RiotService = new RiotService("");
            expect(r.getMatchV4ModuleLight()).toEqual(m);
        });
    
        test("should create new instance of module", () => {
            const r: RiotService = new RiotService("");
            const m: MatchV4Module = r.getMatchV4ModuleLight();
            expect(r.getMatchV4ModuleLight()).not.toBe(m);
        });
    });
});
