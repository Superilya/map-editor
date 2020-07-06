import styled, { css } from 'styled-components';
import { Size } from 'src/constants/ui';
import { darkGrey } from 'src/constants/colors';
import { getFontSize } from 'src/utils/ui';

type PropsType = {
    bold?: boolean;
    size?: Size;
};

export const Text = styled.span<PropsType>`
    color: ${darkGrey};
    font-size: ${({ size }) => getFontSize(size)}px;

    ${({ bold }) =>
        bold &&
        css`
            font-weight: 500;
        `}
`;
