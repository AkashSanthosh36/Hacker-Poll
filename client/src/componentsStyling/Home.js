import { makeStyles } from '@material-ui/core/styles'

export const homeStyles = makeStyles((theme) => ({
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
    accordion: {
      '&:nth-of-type(odd)': {
        backgroundColor: "#f3f2f8",
      },
      '&:nth-of-type(even)': {
        backgroundColor: "white",
      },
    },
    button: {
      marginBottom: 30,
    }
}));

