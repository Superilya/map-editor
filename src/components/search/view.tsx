import React from 'react'
import Autosuggest from 'react-autosuggest'
import { auth } from 'src/utils/auth'
import { get } from 'src/utils/request'
import { UserResponse, User } from 'src/types/api'

type PropsType = {}
type StateType = {
  value?: string
  suggestions: []
}

const getSuggestions = async (value: string) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  const response = await get({
    url: '/api/users/search',
    data: {
      q: value,
    },
    headers: {
      uuid: auth.uuid || '',
    }
  })

  return inputLength === 0 ? [] : response.users.filter((user: User) =>
    user.name.toLowerCase().slice(0, inputLength) === inputValue
  )
}

const getSuggestionValue = suggestion => suggestion.name

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
)

export class Search extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    
    this.state = {
      value: '',
      suggestions: [],
    }
  }

  onChange = (event: KeyboardEvent, { newValue }) => {
    this.setState({
      value: newValue,
    })
  }

  onSuggestionsFetchRequested = async ({ value }) => {
    this.setState({
      suggestions: await getSuggestions(value),
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
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