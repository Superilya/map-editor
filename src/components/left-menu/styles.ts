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

export const SearchBox = styled.div`
    background-color: ${skyBlue};
    padding: 15px 0;
    border-bottom: 1px solid ${grey};
`;

export const SearchInner = styled.div`
    margin: 0 17px;
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

type AvatarPropsType = {
    url: string | null;
};

export const Avatar = styled.div<AvatarPropsType>`
    height: 40px;
    width: 40px;
    background-position: center;
    background-size: cover;
    border-radius: 200px;
    border: 1px solid ${grey};
    margin-right: 10px;

    ${(props) =>
        props.url
            ? css`
            background-image: url("${props.url}");
        `
            : css`
                  background-color: grey;
              `}
`;

export const NameBox = styled.div`
    margin-left: 10px;
`;
