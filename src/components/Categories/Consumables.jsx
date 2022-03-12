import React from 'react'
import { makeStyles } from '@mui/styles';
import { Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AddShoppingCartRounded, ShoppingCartCheckoutRounded } from '@mui/icons-material';

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    height: '200px',
    width: '90%',
    borderRadius: '10px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textShadow: '0px 0px 10px #000',
    marginBottom: '20px',
  }, 
  menu: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    display: 'flex',
    minWidth: 320,
    width: 'calc(31% - 20px)',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: '10px',
    margin: '10px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 6px #00000010',
  },
  menuImage: {
    height: '130px',
    borderRadius: '10px',
  },
})

const ContainedButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  padding: '8px 20px',
  fontSize: 14,
  width: 'max-content',
  height: 'max-content',
  outline: 'none',
  border: 'none',
  borderRadius: '10px',
  textTransform: 'Capitalize',
  color: '#f1f1f1',
  fontWeight: "bold",
  justifySelf: 'flex-end',
}));

const Consumables = (props) => {
  const classes = useStyles();
  const data = props.data;
  const [visible, setVisible] = React.useState({
    'id': '',
    'is': false,
  });
  const [quantity, setQuantity] = React.useState(1);
  const [session, setSession] = React.useState('');

  const handleChangeSession = (event) => {
    setSession(event.target.value);
  }
  return (
    <div className={classes.main}>
      {
        data.loading ? 'Loading...' : 
        data.error ? 'Error' :
        <>
          <div className={classes.banner} style={{backgroundImage: `url(${data.data.extras.categories.Consumables.bannerImage})`}}>
            <h2>Consumables</h2>
          </div>
          <Typography variant="h6" style={{marginLeft: '5%', alignSelf: 'flex-start'}}>Menu</Typography>
          <div className={classes.menu}>
            {data.data.menu.filter(item => item.category === 'Consumables').map(item => (
              <div className={classes.menuItem} key={item.foodid}>
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={item.imageurl} className={classes.menuImage} alt="" />
                    <div>
                      <Typography style={{fontWeight: 'bold', fontSize: 18, textOverflow: 'ellipsis'}}>{item.foodname}</Typography>
                      <Typography>{item.fooddescription}</Typography>
                      <Typography>{item.category}</Typography>
                    </div>
                  </div>
                  <Typography color="primary" style={{fontWeight: "bold", marginRight: 20, fontSize: 18}}>$ {item.price}</Typography>
                </div>
                {!visible.is && <ContainedButton variant="contained" onClick={() => setVisible({id: item.foodid, is: true})} color="primary"><AddShoppingCartRounded /> Add </ContainedButton>}
                {visible.id === item.foodid && visible.is ? 
                <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                  <div style={{display: 'flex', width: '100%'}}>
                    <TextField 
                      type="number" 
                      min="1" 
                      max="10" 
                      defaultValue="1" 
                      label="Quantity" 
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <span style={{width: 20}}></span>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Session</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={session}
                        label="Session"
                        onChange={handleChangeSession}
                      >
                        {item.sessionlist.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div style={{display: 'flex'}}>
                    <ContainedButton variant="contained" color="primary" style={{marginTop: '20px', backgroundColor: 'red'}} onClick={() => setVisible({id: '', is: false})}>Cancel</ContainedButton>
                    <ContainedButton variant="contained" color="primary" style={{marginTop: '20px', marginLeft: 20}}><ShoppingCartCheckoutRounded /> Add to cart</ContainedButton>
                  </div>
                </div> : null}
              </div>
            ))}
          </div>
        </>
      }
    </div>
  )
}

export default Consumables