import React from "react";
import { AppBar, Toolbar, CssBaseline, useScrollTrigger, Slide, IconButton } from "@mui/material"
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Global } from "@emotion/react";
import SmartQ_Logo from './assets/SmartQ_Logo.png';

const drawerBleeding = 56;

const useStyles = makeStyles({
  tabbar: {
    height: '70px',
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    height: '40px',
    marginRight: 'auto',
    marginLeft: 'auto',
  }
})

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Header = (props) => {
  const classes = useStyles();

  return(
    <React.Fragment>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <HideOnScroll {...props}>
        <AppBar className={classes.tabbar} style={{backgroundColor: '#fff', boxShadow: 'none'}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="default"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <img src={SmartQ_Logo} alt="logo" className={classes.logo} />
            <span style={{flexGrow: 1}}></span>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  )
}

export default Header