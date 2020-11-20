import { makeStyles } from '@material-ui/core/styles'

export const editCandidateStyles = makeStyles({
    rootCard: {
      padding: 20,
      maxWidth: 400,
      textAlign: 'center',
      margin: '30px auto',
      backgroundColor: '#f5f6fa',
    },
    ratingCard: {
      padding: 20,
      maxWidth: 400,
      textAlign: 'center',
      marginBottom: 30,
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
    challengesSolved: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },
    },
    addSkillButton: {
      marginBottom: 30,
    },  
    submitButton: {
      background: 'linear-gradient(45deg, #2193b0 30%, #6dd5ed 90%)',
      color: 'white',
    },
    avatar: {
        marginLeft: 30,
    },
});

