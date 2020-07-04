import styled from 'styled-components';
import { darkGrey } from 'src/constants/colors';

type FloorItemPropsType = {
    disabled?: boolean;
};

export const Box = styled.div<FloorItemPropsType>`
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 500px;
    position: relative;

    user-select: none;
    cursor: ${({ disabled }) => (disabled ? 'inherit' : 'pointer')};
    border: 2px solid ${darkGrey};

    & + & {
        margin-top: 15px;
    }
`;

export const InnerBox = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
