import {makeStyles} from '@material-ui/core'

export const navbarStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        fontFamily: 'Grand Hotel, cursive',
        fontSize: 40,
    },
    button: {
        textTransform: 'none',
        marginRight: 30, 
    },
}));
  