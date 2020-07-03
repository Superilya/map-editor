import styled, { css } from 'styled-components';
import { Size } from 'src/constants/ui';
import { darkGrey } from 'src/constants/colors';

type PropsType = {
    bold?: boolean;
    size?: Size;
};

const getFontSize = (size: Size) => {
    switch (size) {
        case Size.M: {
            return 18;
        }

        default: {
            return 18;
        }
    }
};

export const Text = styled.span<PropsType>`
    color: ${darkGrey};
    font-size: ${({ size = Size.M }) => getFontSize(size)}px;

    ${({ bold }) =>
        bold &&
        css`
            font-weight: 500;
        `}
`;
