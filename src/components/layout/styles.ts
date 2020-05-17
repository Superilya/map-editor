import styled, { css } from 'styled-components';

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const MenuBox = styled.div`
    width: 100%;
    background-color: green;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Menu = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

type MenuItemPropsType = {
    isDisabled?: boolean;
}

export const MenuItem = styled.div<MenuItemPropsType>`
    padding: 15px 10px 17px;
    cursor: ${({ isDisabled }) => isDisabled ? 'inherit' : 'pointer'};
    position: relative;
    user-select: none;

    & + & {
        border-left: 1px solid black;
    }

    &:hover {
        background-color: rgba(0,0,0,.2);
    }
`;

export const MenuItemList = styled.div`
    position: absolute;
    z-index: 1;
    bottom: 0;
    background-color: blue;
    transform: translateY(100%);
`;

export const SubItem = styled.div`
    padding: 10px;
    user-select: none;
`;

type AvatarPropsType = {
    url: string | null;
}

export const Avatar = styled.div<AvatarPropsType>`
    height: 40px;
    width: 40px;
    background-position: center;
    background-size: cover;
    border-radius: 200px;
    margin-right: 10px;
    ${(props) => props.url
        ? css`
            background-image: url("${props.url}");
        `
        : css`
            background-color: grey;
        `
    }
`;
