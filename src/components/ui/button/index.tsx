import React, { HTMLAttributes } from 'react';
import { Size, Theme } from 'src/constants/ui';

import { ButtonBox } from './styles';

type PropsType = HTMLAttributes<HTMLButtonElement> & {
    size?: Size;
    disabled?: boolean;
    wide?: boolean;
    theme?: Theme;
};

export const Button = (props: PropsType) => <ButtonBox {...props} />;
