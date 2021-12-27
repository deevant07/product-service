export class ModelField{
    
    private _cloud: boolean;
    public get cloud(): boolean {
        return this._cloud;
    }
    public set cloud(value: boolean) {
        this._cloud = value;
    }
    private _allowedVals: Map<string, string>;
    public get allowedVals(): Map<string, string> {
        return this._allowedVals;
    }
    public set allowedVals(value: Map<string, string>) {
        this._allowedVals = value;
    }
    private _home: boolean;
    public get home(): boolean {
        return this._home;
    }
    public set home(value: boolean) {
        this._home = value;
    } 

}

export class ModelDField{
    private _ref: string;
    public get ref(): string {
        return this._ref;
    }
    public set ref(value: string) {
        this._ref = value;
    }
    
    private _limit: string;
    public get limit(): string {
        return this._limit;
    }
    public set limit(value: string) {
        this._limit = value;
    }
    private _cond: string;
    public get cond(): string {
        return this._cond;
    }
    public set cond(value: string) {
        this._cond = value;
    }
    private _metStat: string;
    public get metStat(): string {
        return this._metStat;
    }
    public set metStat(value: string) {
        this._metStat = value;
    }
    private _metColr: string;
    public get metColr(): string {
        return this._metColr;
    }
    public set metColr(value: string) {
        this._metColr = value;
    }
    private _umetStat: string;
    public get umetStat(): string {
        return this._umetStat;
    }
    public set umetStat(value: string) {
        this._umetStat = value;
    }
    private _umetColr: string;
    public get umetColr(): string {
        return this._umetColr;
    }
    public set umetColr(value: string) {
        this._umetColr = value;
    }
    private _ranges: DFieldRange;
    public get ranges(): DFieldRange {
        return this._ranges;
    }
    public set ranges(value: DFieldRange) {
        this._ranges = value;
    }
}
export class DFieldRange{
    private _low: string;
    public get low(): string {
        return this._low;
    }
    public set low(value: string) {
        this._low = value;
    }
    private _high: string;
    public get high(): string {
        return this._high;
    }
    public set high(value: string) {
        this._high = value;
    }
    private _stat: string;
    public get stat(): string {
        return this._stat;
    }
    public set stat(value: string) {
        this._stat = value;
    }
    private _colr: string;
    public get colr(): string {
        return this._colr;
    }
    public set colr(value: string) {
        this._colr = value;
    }
}