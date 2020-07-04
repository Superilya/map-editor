import styled from 'styled-components';
import { grey, darkGrey } from 'src/constants/colors';

export const Input = styled.input`
    width: 100%;
    height: 40px;
    padding: 10px 14px;
    font-weight: 300;
    font-size: 18px;
    border: 1px solid ${grey};
    border-radius: 8px;
    box-sizing: border-box;
    outline: none;
    color: ${darkGrey};
`;
