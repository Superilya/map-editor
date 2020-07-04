import styled, { css } from 'styled-components';
import { middleGrey } from 'src/constants/colors';

export const InputBox = styled.div`
    margin: 0 17px;
`;

export const SuggestionsContainer = styled.div``;

type SuggestionPropsType = {
    highlighted: boolean;
};

export const Suggestion = styled.div<SuggestionPropsType>`
    display: flex;
    flex-direction: row;
    cursor: pointer;
    padding: 10px 30px;

    ${({ highlighted }) =>
        highlighted &&
        css`
            background-color: ${middleGrey};
        `}
`;

export const SuggestionName = styled.div`
    margin-left: 20px;
`;

export const StyledWrapper = styled.div`
    .react-autosuggest__suggestions-list {
        margin-top: 30px;
        padding: 0;
        list-style-type: none;
    }
`;
