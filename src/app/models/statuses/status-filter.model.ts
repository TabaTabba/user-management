export class StatusFilter {
    value?: string;
    _page?: number;
    _limit?: number;
    
    constructor(){
        this.value = '';
        this._page = 1;
        this._limit = 10;
    }
}