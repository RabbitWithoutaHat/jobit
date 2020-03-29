import React from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
const useStyles = makeStyles(theme => ({
  inputWrapper: {},
  locationInput: {
    justifyContent: 'center',
    marginTop: theme.spacing(4),
    width: '100%',
    height: 40,
  },
  autocompleteDropdownContainer: {
    width: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    fontSize: '1rem',
    fontFamily: 'inherit',
    zIndex: 5,
  },
  suggestioItem: {
    cursor: 'pointer',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
}))

export const LocationSearchInput = ({ form, setForm }) => {
  const classes = useStyles()

  const changeHandler = event => {
    setForm({ ...form, address: event })
  }
  const handleSelect = address => {
    console.log('LocationSearchInput -> address', address)
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => setForm({ ...form, address, latLng }))
      .catch(error => setForm({ ...form, error }))
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
          <TextField
            fullWidth
            label="Адрес"
            autoFocus
            {...getInputProps({
              // placeholder: 'Search Places ...',
              className: classes.locationInput,
            })}
          />
          {/* <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: classes.locationInput,
            })}
          /> */}
          <div className={classes.autocompleteDropdownContainer}>
            {loading && <div>Loading...</div>}
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
