
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
