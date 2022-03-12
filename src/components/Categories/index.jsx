import React from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { Tabs, Tab, Box } from '@mui/material';
import { Link } from 'react-router-dom'
import Header from '../../Header';
// import { LocalDiningRounded, LocalPizzaRounded, RestaurantRounded } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import DataService from '../../service/DataService';

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: 'rgba(0, 0, 0, 0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    color: '#40a9ff',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#1890ff',
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

const Categories = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const data = useSelector(state => state.data);

  React.useEffect(() => {
    DataService.loadData(dispatch);
  }, [dispatch]);

  return (
    <>
      <Header />
      <Box sx={{ width: '100%', padding: '5px 10px' }}>
        <Box sx={{ bgcolor: '#fff' }}>
          {
            data.loading ? 'Loading...' : 
            data.error ? 'Error' :
            <>
              <AntTabs variant="scrollable" scrollButtons="auto" value={value} onChange={handleChange} aria-label="ant example">
                <AntTab icon={<img src={data.data.extras.categories.Consumables.icon} style={{height: 24}} alt="" />} iconPosition="start" label="Consumables" component={Link} to="/categories/consumables" />
                <AntTab icon={<img src={data.data.extras.categories.Decorations.icon} style={{height: 24}} alt="" />} iconPosition="start" label="Decorations" component={Link} to="/categories/decorations" />
                <AntTab icon={<img src={data.data.extras.categories.Pizza.icon} style={{height: 24}} alt="" />} iconPosition="start" label="Pizza" component={Link} to="/categories/pizza" />
              </AntTabs>
              <Box sx={{ p: 1 }} />
              <Outlet />
            </>
          }
        </Box>
      </Box>
    </>
  )
}

export default Categories