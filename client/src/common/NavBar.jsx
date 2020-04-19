import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import MailIcon from '@material-ui/icons/Mail'
import MoreIcon from '@material-ui/icons/MoreVert'
import AccountCircle from '@material-ui/icons/AccountCircle'
import PowerOutlinedIcon from '@material-ui/icons/PowerOutlined'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PowerOffOutlinedIcon from '@material-ui/icons/PowerOffOutlined'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import {
  TextField,
  IconButton,
  Typography,
  Badge,
  Toolbar,
  AppBar,
  MenuItem,
  Menu,
  fade,
  makeStyles,
  withStyles,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

const SearchTextField = withStyles({
  root: {
    '& .MuiInputBase-root': {
      color: 'white',
    },
    '& label.Mui-focused': {
      border: 'none',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      border: 'none',
    },
    '& .MuiInput-underline:after': {
      border: 'none',
    },
    '& .MuiInput-underline:before': {
      border: 'none',
    },
  },
})(TextField)

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  search: {
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  searchInput: {
    color: 'white',
    width: 400,
    paddingLeft: 20,
  },
  plusIcon: {
    padding: 0,
    marginRight: theme.spacing(1),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  autocomplete: {
    width: 260,
    '& .MuiAutocomplete-endAdornment': {
      display: 'none',
    },
  },
}))

export default function NavBar() {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState({})
  const { request, loading, setError } = useHttp()
  const { token } = useContext(AuthContext)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/auth')
  }
  const profileHandler = event => {
    event.preventDefault()
    history.push('/profile')
  }
  const authHandler = event => {
    event.preventDefault()
    history.push('/auth')
  }
  const mainHandler = event => {
    event.preventDefault()
    history.push('/')
  }
  const newReviewHandler = event => {
    event.preventDefault()
    history.push('/review/new')
  }

  const searchCompany = async event => {
    event.persist()
    setCompany({ name: event.target.value })
    try {
      const data = await request(
        `/api/company/search/${event.target.value}`,
        'GET',
        null,
        {
          Authorization: `Bearer ${token}`,
        },
        false,
      )

      setCompanies(data.companies)
    } catch (e) {
      setError(e.message)
    }
  }

  const onSelectCompany = event => {
    event.persist()
    const company = companies.find(company => company.name === event.target.value)
    if (company) {
      history.push(`/company/${company._id}`)
      setCompany({})
      setCompanies([])
    }
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={profileHandler}>Профиль</MenuItem>
      <MenuItem onClick={logoutHandler}>Выйти</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Сообщения</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Уведомления</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Профиль</p>
      </MenuItem>
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography onClick={mainHandler} className={classes.title} variant="h6" noWrap>
            JobIt
          </Typography>
          <div className={classes.search}>
            <Autocomplete
              id="autocomplete-search"
              autoComplete="off"
              autoHighlight
              freeSolo
              options={companies || []}
              loading={loading}
              value={company.name || ''}
              className={classes.autocomplete}
              getOptionLabel={option => (typeof option === 'string' ? option : option ? option.name : '')}
              renderInput={params => (
                <SearchTextField
                  {...params}
                  name="name"
                  placeholder="Найти компанию"
                  className={classes.searchInput}
                  fullWidth
                  onChange={searchCompany}
                  onSelect={onSelectCompany}
                />
              )}
            />
            <IconButton className={classes.plusIcon} color="inherit" onClick={newReviewHandler}>
              <AddCircleOutlineOutlinedIcon className={classes.plusButton} />
            </IconButton>
          </div>
          <div className={classes.grow} />
          {auth.isAuthenticated ? (
            <>
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit">
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit" onClick={profileHandler}>
                  <AccountCircleOutlinedIcon />
                </IconButton>
                <IconButton color="inherit" onClick={logoutHandler}>
                  <PowerOffOutlinedIcon />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </>
          ) : (
            <>
              <div className={classes.sectionDesktop}>
                <IconButton onClick={authHandler}>
                  <PowerOutlinedIcon />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton onClick={authHandler}>
                  <PowerOutlinedIcon />
                </IconButton>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
