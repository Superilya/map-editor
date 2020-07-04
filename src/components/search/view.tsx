import React from 'react';
import Autosuggest, {
    InputProps,
    OnSuggestionSelected,
} from 'react-autosuggest';
import { auth } from 'src/utils/auth';
import { get } from 'src/utils/request';
import { search as searchActrion } from 'src/ducks/search/actions';
import { Icon } from 'src/components/ui/icon';
import { Text } from 'src/components/ui/text';
import { Input } from 'src/components/ui/input';
import { Response, UserResponse, User } from 'src/types/api';
import throttle from 'lodash.throttle';
import { StyledWrapper, Suggestion, SuggestionName, InputBox } from './styles';

type PropsType = {
    isDisabled: boolean;
    search: typeof searchActrion;
    onFocus: () => void;
    onBlur: () => void;
};

type StateType = {
    value: string;
    suggestions: User[];
};

const getSuggestions = async (value: string): Promise<User[]> => {
    const inputValue = value.trim().toLowerCase();

    if (!inputValue) return [];

    const response: Response<UserResponse> = await get({
        url: '/api/users/search',
        data: {
            q: value,
        },
        headers: {
            uuid: auth.uuid || '',
        },
    });

    return response.users;
};

const getSuggestionsWithThrottle = throttle(getSuggestions, 1000);

const getSuggestionValue = (suggestion: User): string => suggestion.name;

const renderSuggestion = (suggestion: User, { isHighlighted }) => (
    <Suggestion highlighted={isHighlighted}>
        <Icon name="fa-user" />
        <SuggestionName>
            <Text>{suggestion.name}</Text>
        </SuggestionName>
    </Suggestion>
);

const renderInputComponent = (inputProps) => (
    <InputBox>
        <Input {...inputProps} />
    </InputBox>
);

export class SearchView extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        this.state = {
            value: '',
            suggestions: [],
        };
    }

    onChange = (_, { newValue }) => {
        this.setState({
            value: newValue,
        });
    };

    handleSelect: OnSuggestionSelected<User> = (e, { suggestion }) => {
        const { search, onBlur } = this.props;

        search(suggestion.id);
        onBlur();
    };

    onSuggestionsFetchRequested = async ({ value }) => {
        this.setState({
            suggestions: await getSuggestionsWithThrottle(value),
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    render() {
        const { isDisabled, onFocus, onBlur } = this.props;
        const { value, suggestions } = this.state;

        const inputProps: InputProps<User> = {
            onFocus,
            onBlur,
            placeholder: 'Search',
            disabled: isDisabled,
            value,
            onChange: this.onChange,
        };

        return (
            <StyledWrapper>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={
                        this.onSuggestionsFetchRequested
                    }
                    onSuggestionsClearRequested={
                        this.onSuggestionsClearRequested
                    }
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    onSuggestionSelected={this.handleSelect}
                    renderInputComponent={renderInputComponent}
                />
            </StyledWrapper>
        );
    }
}
