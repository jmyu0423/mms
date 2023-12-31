import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { red, grey, indigo, blue } from '@mui/material/colors';
import styles from './customButton.module.css';

export const BaseButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(indigo[400]),
    backgroundColor: indigo[400],
    width: 'auto',
    minWidth: 80,
    height: 30,
    fontSize: 15,
    marginRight: 5,
    '&:hover': {
      backgroundColor: indigo[600],
    },
}));

export const DangerButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(indigo[400]),
    backgroundColor: red[300],
    width: 'auto',
    minWidth: 80,
    height: 30,
    fontSize: 15,
    marginRight: 0,
    '&:hover': {
      backgroundColor: red[400],
    },
}));

export const NormalButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[400]),
  backgroundColor: grey[400],
  width: 'auto',
  minWidth: 80,
  height: 30,
  fontSize: 15,
  marginRight: 5,
  '&:hover': {
    backgroundColor: grey[400],
  },
}));

export const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[400]),
  backgroundColor: grey[900],
  width: 'auto',
  minWidth: 80,
  height: 30,
  fontSize: 15,
  marginRight: 5,
  '&:hover': {
    backgroundColor: grey[900],
  },
}));

export const HelpButton = ({title}) =>{
  return(
    <div 
      className={styles.help_button}
    >
      <div style={{
        backgroundImage: 'url("/img/help.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '26px',
        height: '26px',
        position: 'relative',
        top: '3px',
        marginLeft: '5px',
        marginRight: '2px'
      }}>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        
      }}>
        {title}
      </div>
    </div>
  )
};