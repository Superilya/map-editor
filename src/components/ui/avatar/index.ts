import styled, { css } from 'styled-components';
import { grey } from 'src/constants/colors';

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

    ${(props) =>
        props.url
            ? css`
            background-image: url("${props.url}");
        `
            : css`
                  background-color: grey;
              `}
`;
