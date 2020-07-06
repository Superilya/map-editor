import styled, { css } from 'styled-components';
import { grey, darkGrey, skyBlue, middleGrey } from 'src/constants/colors';
import { getFontSize, getDownSize } from 'src/utils/ui';
import { Size, Theme } from 'src/constants/ui';

const getHeight = (size?: Size) => {
    switch (size) {
        case Size.M: {
            return 30;
        }

        case Size.L: {
            return 40;
        }

        default: {
            return 30;
        }
    }
};

const getBorderColor = (theme?: Theme) => {
    switch (theme) {
        case Theme.ACTIVE: {
            return skyBlue;
        }

        case Theme.BASIC: {
            return grey;
        }

        default: {
            return grey;
        }
    }
};

const getBackgroungColor = (theme?: Theme) => {
    switch (theme) {
        case Theme.ACTIVE: {
            return skyBlue;
        }

        case Theme.BASIC: {
            return 'transparent';
        }

        default: {
            return 'transparent';
        }
    }
};

const getBackgroungHoverColor = (theme?: Theme) => {
    switch (theme) {
        case Theme.ACTIVE: {
            return 'transparent';
        }

        case Theme.BASIC: {
            return middleGrey;
        }

        default: {
            return middleGrey;
        }
    }
};

type PropsType = {
    size?: Size;
    wide?: boolean;
    theme?: Theme;
};

export const ButtonBox = styled.button<PropsType>`
    display: inline-block;
    height: ${({ size }) => getHeight(size)}px;
    font-size: ${({ size }) => getFontSize(getDownSize(size))}px;
    border-radius: 4px;
    color: ${darkGrey};
    outline: none;
    cursor: pointer;

    border: 2px solid ${({ theme }) => getBorderColor(theme)};
    background-color: ${({ theme }) => getBackgroungColor(theme)};

    &:hover {
        background-color: ${({ theme }) => getBackgroungHoverColor(theme)};
    }

    ${({ wide }) =>
        wide &&
        css`
            width: 100%;
        `}
`;
