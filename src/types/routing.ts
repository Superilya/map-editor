export type AuthSuccessPageQuery = {
    uuid?: string;
};

export type BuildingPageQuery = {
    place?: string;
    room?: string;
};

export type BuildingPageParams = {
    buildingId?: string;
    floor?: string;
};

export type QueryType = AuthSuccessPageQuery & BuildingPageQuery;
export type ParamsType = BuildingPageParams;
