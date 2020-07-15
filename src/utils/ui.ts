import { Size } from 'src/constants/ui';

export const getFontSize = (size?: Size) => {
    switch (size) {
        case Size.XS: {
            return 14;
        }

        case Size.S: {
            return 16;
        }

        case Size.M: {
            return 18;
        }

        case Size.L: {
            return 20;
        }

        default: {
            return 18;
        }
    }
};

export const getDownSize = (size?: Size): Size => {
    switch (size) {
        case Size.XS: {
            return Size.XS;
        }

        case Size.S: {
            return Size.XS;
        }

        case Size.M: {
            return Size.S;
        }

        case Size.L: {
            return Size.M;
        }

        case Size.XL: {
            return Size.L;
        }

        default: {
            return Size.S;
        }
    }
};

export const getDoubleDownSize = (size?: Size): Size => {
    switch (size) {
        case Size.XS: {
            return Size.XS;
        }

        case Size.S: {
            return Size.XS;
        }

        case Size.M: {
            return Size.XS;
        }

        case Size.L: {
            return Size.S;
        }

        case Size.XL: {
            return Size.M;
        }

        default: {
            return Size.XS;
        }
    }
};

export const getHeight = (size?: Size) => {
    switch (size) {
        case Size.M: {
            return 30;
        }

        case Size.L: {
            return 40;
        }

        default: {
            return 30;
        }
    }
};

export const getPaddingTop = (size?: Size) => {
    switch (size) {
        case Size.M: {
            return 8;
        }

        case Size.L: {
            return 10;
        }

        default: {
            return 8;
        }
    }
};

export const getPaddingLeft = (size?: Size) => {
    switch (size) {
        case Size.M: {
            return 10;
        }

        case Size.L: {
            return 14;
        }

        default: {
            return 10;
        }
    }
};
