export type AuthSuccessPageQuery = {
    uuid?: string;
}

export type BuildingPageQuery = {
    place?: string;
}

export type BuildingPageParams = {
    buildingId?: string;
    floor?: string;
}

export type QueryType = AuthSuccessPageQuery & BuildingPageQuery;
export type ParamsType = BuildingPageParams;
