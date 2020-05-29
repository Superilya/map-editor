import React from 'react'
import Autosuggest from 'react-autosuggest'

type PropsType = {}

const users = [
  {
    name: 'Vasya',
    year: 1972,
  },
  {
    name: 'Pupok',
    year: 2012,
  },
]

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : users.filter(user =>
    user.name.toLowerCase().slice(0, inputLength) === inputValue
  )
}

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
)

export class Search extends React.Component<PropsType> {
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

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
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
      placeholder: 'Type a programming language',
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