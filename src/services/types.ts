
export type PositionType = {
    _id: string,
    companyID: number,
    year: number,
    currentlyOpen: boolean,
    positionType: string,
    term: number
};

export interface IPosition {
    position: PositionType
}

export enum Season {
    Spring = 1,
    Summer = 2,
    Fall = 3,
    Winter = 4
}