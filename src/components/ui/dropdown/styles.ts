import styled from 'styled-components';
import { Size } from 'src/constants/ui';
import { getPaddingTop, getPaddingLeft } from 'src/utils/ui';
import { grey, darkGrey, middleGrey } from 'src/constants/colors';

export const Box = styled.div`
    position: relative;
    color: ${darkGrey};
    width: 100%;
`;

type DataBoxProps = {
    size?: Size;
};

export const ItemsBox = styled.div<DataBoxProps>`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 2px;
    background-color: white;
    border: 1px solid ${grey};
    border-radius: 0 0 4px 4px;
    transform: translate(0, 100%);
`;

export const ItemBox = styled.div<DataBoxProps>`
    cursor: pointer;
    padding: ${({ size }) => getPaddingTop(size)}px
        ${({ size }) => getPaddingLeft(size)}px;

    &:hover {
        background-color: ${middleGrey};
    }
`;
