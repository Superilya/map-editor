import { match, compile } from 'path-to-regexp';

export type InternalLink = {
    source: string;
    get: (params?: object) => string;
    is: (target: string) => boolean;
}

const MAIN = '/';

export const rootLink: InternalLink = {
    source: MAIN,
    get: () => MAIN,
    is: (target) => target === MAIN
};

const AUTH_SUCCESS = '/auth-succcess';

export const authSuccess: InternalLink = {
    source: AUTH_SUCCESS,
    get: () => AUTH_SUCCESS,
    is: (target) => target === AUTH_SUCCESS
};

const BUILDING = '/building/:buildingId';
const buildingCompile = compile(BUILDING);
const buildingMatch = match(BUILDING);

export const buildingLink: InternalLink = {
    source: BUILDING,
    get: (params) => buildingCompile(params),
    is: (target) => Boolean(buildingMatch(target))
};
