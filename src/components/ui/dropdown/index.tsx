import React from 'react';
import { Input } from 'src/components/ui/input';
import { Size } from 'src/constants/ui';
import { Box, ItemsBox, ItemBox } from './styles';

export type ItemType = {
    value: number | string | boolean;
    label: string;
};

type PropsType<T extends ItemType> = {
    items: Array<T>;
    value?: number | string | boolean;
    size?: Size;
    label?: string;
    onChange?: (item: T | null) => void;
};

type StateType = {
    isOpen: boolean;
};

export class Dropdown<T extends ItemType> extends React.Component<
    PropsType<T>,
    StateType
> {
    state = {
        isOpen: false,
    };

    handleClick = () => {
        const { isOpen } = this.state;

        this.setState({
            isOpen: !isOpen,
        });
    };

    handleClickItem = (targetItem: T) => () => {
        const { onChange } = this.props;

        if (typeof onChange !== 'function') {
            return;
        }

        onChange(targetItem);
    };

    renderLabel() {
        const { value, items } = this.props;

        const targetItem = items.find((item) => item.value === value);

        if (!targetItem) {
            return '-';
        }

        return targetItem.label;
    }

    render() {
        const { items, size, label } = this.props;
        const { isOpen } = this.state;

        return (
            <Box onClick={this.handleClick}>
                <Input label={label} size={size} value={this.renderLabel()} />
                {isOpen && (
                    <ItemsBox size={size}>
                        {items.map((item) => (
                            <ItemBox
                                onClick={this.handleClickItem(item)}
                                size={size}
                            >
                                {item.label}
                            </ItemBox>
                        ))}
                    </ItemsBox>
                )}
            </Box>
        );
    }
}
