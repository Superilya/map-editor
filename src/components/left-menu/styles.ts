import styled, { css } from 'styled-components';
import {
    lightGrey,
    skyBlue,
    shadow,
    grey,
    middleGrey,
} from 'src/constants/colors';

export const Box = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${lightGrey};
    display: flex;
    flex-direction: column;
    box-shadow: 1px 0px 3px ${shadow};
    overflow: auto;
`;

export const Top = styled.div`
    flex: 1;
`;

export const Bottom = styled.div`
    border-top: 1px solid ${grey};
    padding: 15px 17px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

type PropsType = {
    active?: boolean;
};

export const BuildingBox = styled.div<PropsType>`
    padding: 7px 17px;

    ${({ active }) =>
        active &&
        css`
            background-color: ${skyBlue};
        `}

    &:hover {
        ${({ active }) =>
            !active &&
            css`
                background-color: ${middleGrey};
            `}

        cursor: pointer;
    }
`;

export const NameBox = styled.div`
    margin-left: 10px;
`;
