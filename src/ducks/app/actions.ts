import { AppActionType } from './action-types';

export const goToPage = (url: string) => ({
    type: AppActionType.GO_TO_PAGE,
    url
});
