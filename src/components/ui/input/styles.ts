import styled from 'styled-components';
import { grey, darkGrey } from 'src/constants/colors';
import {
    getFontSize,
    getDownSize,
    getPaddingTop,
    getPaddingLeft,
} from 'src/utils/ui';
import { Size } from 'src/constants/ui';

type PropsType = {
    size?: Size;
};

export const InputBox = styled.input<PropsType>`
    width: 100%;
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
