import styled from 'styled-components';
import { grey } from 'src/constants/colors';

export const Box = styled.div`
    border-bottom: 1px solid ${grey};
`;

export const HeaderBox = styled.div`
    padding: 15px 17px;
    border-bottom: 1px solid ${grey};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
