import styled from 'styled-components';
import { grey, darkGrey } from 'src/constants/colors';
import { getFontSize, getDownSize } from 'src/utils/ui';
import { Size } from 'src/constants/ui';

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

const getPaddingTop = (size?: Size) => {
    switch (size) {
        case Size.M: {
            return 8;
        }

        case Size.L: {
            return 10;
        }

        default: {
            return 8;
        }
    }
};

const getPaddingLeft = (size?: Size) => {
    switch (size) {
        case Size.M: {
            return 10;
        }

        case Size.L: {
            return 14;
        }

        default: {
            return 10;
        }
    }
};

type PropsType = {
    size?: Size;
};

export const InputBox = styled.input<PropsType>`
    width: 100%;
    height: ${({ size }) => getHeight(size)}px;
    padding: ${({ size }) => getPaddingTop(size)}px
        ${({ size }) => getPaddingLeft(size)}px;
    font-weight: 300;
    font-size: ${({ size }) => getFontSize(getDownSize(size))}px;
    border: 1px solid ${grey};
    border-radius: 4px;
    box-sizing: border-box;
    outline: none;
    color: ${darkGrey};
`;

export const Box = styled.div`
    display: inline-block;
    width: 100%;
`;
