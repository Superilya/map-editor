import styled from 'styled-components';

export const Box = styled.div`
    flex: 1;
    position: relative;
`;

export const MapBox = styled.div`
    height: 100%:
`;

export const FloorsBox = styled.div`
    margin: 10px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
`;

type FloorItemPropsType = {
    active: boolean;
    disabled: boolean;
};

export const FloorItem = styled.div<FloorItemPropsType>`
    padding: 20px;
    border-radius: 500px;
    background-color: ${({ active, disabled }) => {
        if (disabled) {
            return 'grey';
        }

        return active ? 'yellow' : 'green';
    }};
    user-select: none;
    cursor: ${({ disabled }) => (disabled ? 'inherit' : 'pointer')};

    & + & {
        margin-top: 10px;
    }
`;
