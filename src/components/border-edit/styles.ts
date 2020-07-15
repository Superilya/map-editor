import styled from 'styled-components';

export const Box = styled.div`
    padding: 15px 17px;
`;

export const ActionsBox = styled.div`
    margin-bottom: 15px;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const ActionBox = styled.span`
    & + & {
        margin-left: 10px;
    }
`;

export const CloseAction = styled.span`
    display: inline-block;
    cursor: pointer;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;

    & + & {
        margin-top: 8px;
    }
`;

export const Cell = styled.div`
    flex: 1;

    & + & {
        margin-left: 15px;
    }
`;
