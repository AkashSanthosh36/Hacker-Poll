import React, { useState, useEffect } from 'react';

import { Card, TextField, Button, Typography, Grid, Avatar, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {useParams, useHistory} from 'react-router-dom'

import { editCandidateStyles } from '../componentsStyling/EditCandidateDetails'

import { toast } from 'react-toastify'
toast.configure()

function EditCandidateDetails(props) {
    const [candidateDetails, setCandidateDetails] = useState(null)
    const [skills, setSkills] = useState([])
    const classes = editCandidateStyles()
    const {id} = useParams()
    const history = useHistory()
    
    useEffect( () => {
        fetch(`/get-candidate-details/${id}`)
        .then(res => res.json())
        .then(result => {
            setCandidateDetails(result.data)
            setSkills(result.data.expertiseIn)
        })
    }, [])

    return (
        <>
            {
                candidateDetails ?
                (
                    <div>
                        <Card className={classes.rootCard}>
                            <h1 className={classes.title}>Hacker Poll</h1>
                            <Formik
                                initialValues = {{
                                    name: candidateDetails.name,
                                    challengesSolved: candidateDetails.challengesSolved,
                                    expertiseLevel: candidateDetails.expertiseLevel
                                }}

                                validationSchema = {
                                    Yup.object({
                                        name: Yup.string('Name should be a String')
                                        .required('Required !'),
                                        challengesSolved: Yup.number('It should be a number')
                                        .required('Required !'),
                                        expertiseLevel: Yup.number()
                                        .required('Required !')
                                    })
                                }

                                onSubmit = { (values) => {
                                    fetch(`/update/${id}`, {
                                        method: "put",
                                        headers: {
                                            "Content-type": "application/json",
                                            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                                        },
                                        body: JSON.stringify({
                                            name: values.name,
                                            challengesSolved: values.challengesSolved,
                                            expertiseLevel: values.expertiseLevel,
                                            expertiseIn: skills
                                        })
                                    })
                                    .then(res => res.json())
                                    .then(result => {
                                        toast.dark(result.message)
                                        history.push('/admin')
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                                }}
                            >
                                { formik  => (
                                    <Form>
                                        <Field 
                                            name="name"
                                            className={classes.textfield}
                                            as={ TextField }
                                            id="outlined-basic" 
                                            label="Name"
                                            type="text" 
                                            variant="outlined"
                                            size="small"
                                            fullWidth 
                                            error={(formik.errors.name && formik.touched.name) ? true : false}
                                            helperText={<ErrorMessage name="name" />}
                                        />

                                        <Field 
                                            name="challengesSolved"
                                            className={`${classes.textfield} ${classes.challengesSolved}`}
                                            as={ TextField }
                                            id="outlined-basic" 
                                            label="Challenges Solved"
                                            type="number" 
                                            variant="outlined"
                                            size="small"
                                            fullWidth 
                                            error={(formik.errors.challengesSolved && formik.touched.challengesSolved) ? true : false}
                                            helperText={<ErrorMessage name="challengesSolved" />}
                                        />

                                        <Card className={classes.ratingCard}>
                                            <Typography gutterBottom>
                                                Expertise Level
                                            </Typography>
                                            <Grid container spacing={6} alignItems="center">
                                                <Grid item>
                                                    <Avatar 
                                                        src="https://image.shutterstock.com/image-illustration/switch-button-positioned-on-word-260nw-188725688.jpg" 
                                                        className={classes.avatar}    
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Field 
                                                        name="expertiseLevel"
                                                        className={classes.rating}
                                                        as={ Rating }
                                                        onChange={(event, newValue) => {formik.setFieldValue('expertiseLevel', newValue)}}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Field 
                                                        name="expertiseLevel"
                                                        className={classes.ratingValue}
                                                        as={ TextField }
                                                        id="standard-basic" 
                                                        type="number"
                                                        style={{width: 42}}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Card>

                                        {
                                            skills.map((skill, index) => (
                                                <Card className={classes.ratingCard} key={index}>
                                                    <Typography gutterBottom>
                                                        {skill.skillName}
                                                    </Typography>
                                                    <Grid container spacing={6} alignItems="center">
                                                        <Grid item>
                                                            <Avatar 
                                                                src="data:image/jpeg;base64,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"
                                                                className={classes.avatar}    
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Rating
                                                                name={skill.skillName} 
                                                                className={classes.rating}
                                                                value={skill.level}
                                                                onChange={(event, newValue) => {
                                                                    let newArr = [...skills]
                                                                    newArr[index] = {   
                                                                        skillName: skill.skillName,
                                                                        level: newValue
                                                                    }
                                                                    setSkills(newArr)
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Field 
                                                                name={skill.skillName}
                                                                className={classes.ratingValue}
                                                                as={ TextField }
                                                                id="standard-basic" 
                                                                type="number"
                                                                style={{width: 42}}
                                                                value={skill.level}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Card>
                                            ))
                                        }    

                                        <Button className={classes.submitButton} type="submit" fullWidth>Add Changes</Button>
                                     </Form>   
                                )}
                            </Formik>
                        </Card>
                    </div>
                ): 
                null
            }
        </>
    );
}

export default EditCandidateDetails;