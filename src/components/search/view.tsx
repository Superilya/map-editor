import React from 'react'
import Autosuggest, { InputProps } from 'react-autosuggest'
import { auth } from 'src/utils/auth'
import { get } from 'src/utils/request'
import { Response, UserResponse, User } from 'src/types/api'
import throttle from 'lodash.throttle'

type PropsType = {}
type StateType = {
  value: string
  suggestions: User[] | []
}

const getSuggestions = async (value: string): Promise<User[]> => {
  const inputValue = value.trim().toLowerCase()

  if (!inputValue) return []
  
  const response: Response<UserResponse> = await get({
    url: '/api/users/search',
    data: {
      q: value,
    },
    headers: {
      uuid: auth.uuid || '',
    },
  })

  return response.users
}

const getSuggestionsWithThrottle = throttle(getSuggestions, 1000)

const getSuggestionValue = (suggestion: User): string => suggestion.name

const renderSuggestion = (suggestion: User) => <div>{suggestion.name}</div>

export class Search extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)

    this.state = {
      value: '',
      suggestions: [],
    }
  }

  onChange = (_, { newValue }) => {
    this.setState({
      value: newValue,
    })
  }

  onSuggestionsFetchRequested = async ({ value }) => {
    this.setState({
      suggestions: await getSuggestionsWithThrottle(value),
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  render() {
    const { value, suggestions } = this.state

    const inputProps: InputProps<User> = {
      placeholder: 'Искать',
      value,
      onChange: this.onChange,
    }

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}
