import React, {useState, useContext} from 'react';

import { Card, Divider, Button, TextField, IconButton, Typography, InputAdornment } from '@material-ui/core'
import { VisibilityOff, Visibility } from '@material-ui/icons'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {toast} from 'react-toastify'
import {useHistory} from 'react-router-dom'

import { adminLoginPageStyles } from '../componentsStyling/AdminLoginPage'
import { AdminContext } from '../App'

toast.configure()

function AdminLoginPage(props) {
    const [showPassword, setShowPassword] = useState(false)
    const classes = adminLoginPageStyles()
    const { state, dispatch } = useContext(AdminContext)
    const history = useHistory()
    
    return (
        <div>
            <Card className={classes.card}>
                <h1 className={classes.title}>Hacker Poll</h1>
                <Formik
                    initialValues = {{
                        email: '',
                        password: ''
                    }}

                    validationSchema = {
                        Yup.object({
                          email: Yup.string()
                          .email('Invalid email format')
                          .required('Required !'),
                          password: Yup.string()
                          .required('Required !')
                        })                        
                    }

                    onSubmit = { (values) => {
                        fetch("/signin", {
                            method: "post",
                            headers: {
                              "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                              email: values.email,
                              password: values.password
                            })
                          })
                          .then(res => res.json())
                          .then(data => {
                            if(data.error) {
                                toast.dark(data.error, {autoClose: 5000})
                            }
                            else {
                                localStorage.setItem("jwt", data.token)
                                localStorage.setItem("admin", JSON.stringify(data.user))
                                dispatch({ type: "ADMIN", payload: data.user})
                                toast.dark('Successfully Signed In', {autoClose: 5000})
                                history.push('/admin')
                            }
                          })
                          .catch(error => {
                            console.log(error)
                          })
                    }}
                >
                 {({ errors, touched }) => (
                    <Form>
                        <Field 
                            name="email"
                            className={classes.textfield}
                            as={ TextField }
                            id="outlined-basic" 
                            label="E-mail address"
                            type="text" 
                            variant="outlined"
                            size="small"
                            fullWidth 
                            error={(errors.email && touched.email) ? true : false}
                            helperText={<ErrorMessage name="email" />}
                        />

                        <Field 
                            name="password"
                            className={classes.textfield}
                            as={ TextField }
                            id="outlined-adornment-password" 
                            label="Password" 
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            size="small"
                            fullWidth 
                            autoComplete="off"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(prev => !prev)}
                                            onMouseDown={(event) => event.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>),
                            }}
                            error={(errors.password && touched.password) ? true : false}
                            helperText={<ErrorMessage name="password" />}
                            />

                            <Button className={classes.button} type="submit" fullWidth>Sign In</Button>
                    </Form>
                )}
                </Formik>
            </Card>    
        </div>
    );
}

export default AdminLoginPage;