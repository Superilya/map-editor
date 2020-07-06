import styled from 'styled-components';
import { grey } from 'src/constants/colors';

export const OffsetBox = styled.div`
    margin: 0 17px;
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

export const ActionsBox = styled.div`
    margin: 15px 0;
`;

export const FieldsBox = styled.div`
    margin: 10px 0 15px;
`;

export const PreviewBox = styled.div`
    display: inline-block;
    border: 1px solid ${grey};

    & + & {
        margin-left: 10px;
    }
`;

export const PreviewRowBox = styled.div`
    & + & {
        margin-top: 10px;
    }
`;
