import React from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import { FilledInput } from '@material-ui/core'
const useStyles = makeStyles(theme => ({
  inputWrapper: {},
  locationInput: {
    justifyContent: 'center',
    marginTop: theme.spacing(4),
    width: '100%',
    height: 40,
    '& .MuiInputLabel-formControl': {
      transform: 'translate(0, 1px) scale(0.75)',
      color: '#0277bd',
    },
  },
  autocompleteDropdownContainer: {
    width: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    fontSize: '1rem',
    zIndex: 5,
  },
  suggestioItem: {
    cursor: 'pointer',
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
}))

export const LocationSearchInput = ({ form, setForm, setError }) => {
  const focusedLabel = form.address
    ? {
        transform: 'translate(0, 1px) scale(0.75)',
        color: '#0277bd',
      }
    : ''
  console.log('LocationSearchInput -> focusedLabel', focusedLabel)
  const classes = useStyles(focusedLabel)

  const changeHandler = event => {
    setForm({ ...form, address: event })
  }
  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => setForm({ ...form, address, latLng }))
      .catch(error => setError(error))
  }

  return (
    <PlacesAutocomplete
      name="address"
      value={form.address}
      onChange={changeHandler}
      onSelect={handleSelect}
      className={classes.inputWrapper}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          {/* <FilledInput htmlFor="address"> */}
          {/* Адрес */}
          <TextField
            className="myClass"
            // InputLabelProps={{ shrink: true }}
            id="address"
            fullWidth
            label="Адрес"
            value={form.address}
            filled={true}
            shrink
            {...getInputProps({
              // placeholder: 'Search Places ...',
              className: classes.locationInput,
            })}
          />
          {/* </FilledInput> */}
          <div className={classes.autocompleteDropdownContainer}>
            {loading && <div>Загрузка...</div>}
            {suggestions.map(suggestion => {
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className: classes.suggestioItem,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              )
            })}
          </div>
        </>
      )}
    </PlacesAutocomplete>
  )
}
