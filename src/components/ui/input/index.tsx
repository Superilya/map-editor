import React, { HTMLAttributes } from 'react';
import { Text } from 'src/components/ui/text';
import { Size } from 'src/constants/ui';
import { getDoubleDownSize } from 'src/utils/ui';
import { InputBox, Box } from './styles';

type PropsType = HTMLAttributes<HTMLInputElement> & {
    label?: string;
    size?: Size;
    value?: string | number;
    type?: string;
};

export const Input = ({ label, value, type, size, ...props }: PropsType) => (
    <Box>
        {label && (
            <div>
                <Text size={getDoubleDownSize(size)}>{label}</Text>
            </div>
        )}
        <div>
            <InputBox {...props} value={value} type={type} size={size} />
        </div>
    </Box>
);
