import styled from 'styled-components';
import { lightGrey, skyBlue, shadow } from 'src/constants/colors';

export const Box = styled.div`
    flex: 1;
    position: relative;
`;

export const MapBox = styled.div`
    height: 100%:
`;

export const FloorsBox = styled.div`
    position: absolute;
    right: 35px;
    top: 35px;
    z-index: 1;
`;

type FloorItemPropsType = {
    active: boolean;
    disabled: boolean;
};

export const FloorItem = styled.div<FloorItemPropsType>`
    width: 50px;
    height: 50px;
    border-radius: 500px;
    position: relative;
    background-color: ${({ active, disabled }) => {
        if (disabled) {
            return 'grey';
        }

        return active ? skyBlue : lightGrey;
    }};
    user-select: none;
    cursor: ${({ disabled }) => (disabled ? 'inherit' : 'pointer')};
    box-shadow: 0px 1px 3px ${shadow};

    & + & {
        margin-top: 15px;
    }
`;

export const FloorInner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
