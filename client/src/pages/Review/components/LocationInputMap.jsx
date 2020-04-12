import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import parse from 'autosuggest-highlight/parse'
import throttle from 'lodash/throttle'

const autocompleteService = { current: null }

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  myAutocomplete: {
    width: '100%',
  },
}))

export default function LocationInputMap({ form, setForm, setError }) {
  const classes = useStyles()
  const [options, setOptions] = React.useState([])

  const handleChange = event => {
    setForm({ ...form, address: event.target.value })
  }

  const handleSelect = (_, address) => {
    setForm({ ...form, address: address.description, placeId: address.id })
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback)
      }, 200),
    [],
  )

  React.useEffect(() => {
    let active = true

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) {
      return undefined
    }

    if (form.address === '') {
      setOptions([])
      return undefined
    }

    fetch({ input: form.address }, results => {
      if (active) {
        setOptions(results || [])
      }
    })

    return () => {
      active = false
    }
  }, [form.address, fetch])

  return (
    <Autocomplete
      className={classes.myAutocomplete}
      id="google-map-demo"
      getOptionLabel={option =>
        typeof option === 'string' ? option : option ? option.description : ''
      }
      filterOptions={x => x}
      options={options}
      noOptionsText="Введите адрес"
      autoComplete
      includeInputInList
      onChange={handleSelect}
      renderInput={params => (
        <TextField
          {...params}
          label="Адрес"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={form.address}
          filled={true}
          shrink
        />
      )}
      renderOption={option => {
        const matches =
          option.structured_formatting.main_text_matched_substrings
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map(match => [match.offset, match.offset + match.length]),
        )

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        )
      }}
    />
  )
}