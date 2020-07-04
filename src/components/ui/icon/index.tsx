import React from 'react';
import { Text } from 'src/components/ui/text';

type PrropsType = {
    name: string;
};

export const Icon = ({ name }: PrropsType) => (
    <Text>
        <i className={`fas ${name}`} />
    </Text>
);
