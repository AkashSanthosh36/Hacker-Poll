import React, { useEffect, useStyles, useState } from 'react';

import { Card, Accordion, AccordionSummary, AccordionDetails, Typography, ListItem, List, ListItemText, Button } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import {toast} from 'react-toastify'

import { homeStyles } from '../componentsStyling/Home'

toast.configure()

function Home({ ip }) {
    const classes = homeStyles()
    const [candidateList, setCandidateList] = useState([])
    const [ipListInclude, setIpListInclude] = useState('')

    useEffect( () => {
        const getCandidateDetails = async () => {
            await fetch('/allCandidate')
            .then(res => res.json())
            .then(result => {
                setCandidateList(result.data)
            })
        }

        getCandidateDetails()
    }, [])

    useEffect( () => {
        fetch('/ip',{
            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ip: ip
            })
          })
          .then(res => res.json())
          .then(data => {
            setIpListInclude(data.message)
          })
          .catch(error => {
              console.log(error)
          })
    }, [ip])

    const vote = (_id) => {
        fetch('/vote',{
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              _id: _id
            })
          })
          .then(res => res.json())
          .then(result => {
              console.log(result)
              return fetch('/addIp',{
                method: 'put',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ip: ip
                })
              })
              .then(res => res.json())
              .then(data => {
                setIpListInclude('true')
                toast.dark('Voted Successfully')
              })
        })
    }
    
    return (
        <div>
            <Card className={classes.card}>
                <h1 className={classes.title}>Candidate List</h1>
                {
                    candidateList.map(candidate => (
                        <Accordion className={classes.accordion}>
                           <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{candidate.name}</Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                <List>
                                    <ListItem>
                                        <ListItemText 
                                            primary='Challenges Solved'
                                            secondary={<strong>{candidate.challengesSolved}</strong>}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary='Expertise Level'
                                            secondary={
                                                <Rating
                                                    name='experitseLevel'
                                                    className={classes.rating}
                                                    value={candidate.expertiseLevel}
                                                    readOnly
                                                />
                                            }
                                        />
                                    </ListItem>
                                {
                                    candidate.expertiseIn.map(skill => (
                                        <ListItem>
                                            <ListItemText 
                                                primary={skill.skillName}
                                                secondary={
                                                    <Rating
                                                        name={skill.skillName} 
                                                        className={classes.rating}
                                                        value={skill.level}
                                                        readOnly
                                                    />
                                                } 
                                            />
                                        </ListItem>
                                    ))
                                }
                                </List>
                            </AccordionDetails>
                            {
                                (ipListInclude == 'false') && 
                                (
                                    <Button 
                                        className={classes.button} 
                                        variant="contained"
                                        color="primary"
                                        onClick={() => vote(candidate._id)}
                                    >
                                        Vote
                                    </Button>
                                )
                            }
                        </Accordion> 
                    ))
                }
            </Card>
        </div>
    );
}

export default Home;