import styled, { css } from 'styled-components';
import { skyBlue, grey } from 'src/constants/colors';

type SearchBoxPropsType = {
    hide?: boolean;
};

export const MenuTop = styled.div<SearchBoxPropsType>`
    ${({ hide }) =>
        !hide &&
        css`
            background-color: ${skyBlue};
            border-bottom: 1px solid ${grey};
        `}
    padding: 15px 0;
`;
