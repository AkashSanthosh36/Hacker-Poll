import { makeStyles } from '@material-ui/core/styles'
import { FormHelperText } from '@material-ui/core'

export const adminLoginPageStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
    card: {
        padding: 20,
        maxWidth: 400,
        textAlign: 'center',
        margin: '30px auto',
    },
    title: {
        fontSize: 50,
        fontFamily: 'Grand Hotel, cursive',
        flexGrow: 1,
    },
    textfield: {
        '& label.Mui-focused': {
            color: 'black',
          },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#00000',
            },
            '&:hover fieldset': {
              borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black',
              borderLeftWidth: 6,
            },
        },
        marginBottom: 30,
    }, 
    button: {
        background: 'linear-gradient(45deg, #2193b0 30%, #6dd5ed 90%)',
        color: 'white',
    },
})