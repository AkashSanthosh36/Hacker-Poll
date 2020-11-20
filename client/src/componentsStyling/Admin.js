import { makeStyles } from '@material-ui/core/styles'
import { FormHelperText } from '@material-ui/core'

export const adminStyles = makeStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    card: {
        padding: 20,
        height: '50%',
        width: "50% !important",
        textAlign: 'center',
        marginLeft: 40,
        marginTop: 40,
    },
    statsCard: {
        padding: 20,
        height: '50%',
        width: "20% !important",
        textAlign: 'center',
        marginRight: 40,
        marginTop: 40,
    },
    title: {
        fontSize: 50,
        fontFamily: 'Grand Hotel, cursive',
        flexGrow: 1,
    },
    accordion: {
        '&:nth-of-type(odd)': {
          backgroundColor: "#f3f2f8",
        },
        '&:nth-of-type(even)': {
          backgroundColor: "white",
        },
    },
    button: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 30,
      marginLeft: 30,
      marginRight: 30,
    },
})