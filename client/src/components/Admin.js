import React, { useState, useEffect } from 'react';

import { Card, Typography, Button, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, CardContent } from '@material-ui/core'
import { Rating } from '@material-ui/lab'

import {toast} from 'react-toastify'
import {useHistory} from 'react-router-dom'

import {adminStyles} from '../componentsStyling/Admin'

toast.configure()

function Admin({ ip }) {
    const classes = adminStyles()
    const [candidateList, setCandidateList] = useState([])
    const [ipListInclude, setIpListInclude] = useState('')
    const [top3Candidates, setTop3Candidates] = useState([])
    const [totalVotes, setTotalVotes] = useState(0)
    const history = useHistory()
    
    const sortData = (data) => {
        const sortedData = [...data]
        data.map(candidate => (setTotalVotes(prev => prev+candidate.votes)))
        const sort = sortedData.sort((a, b) => (a.totalVotes > b.totalVotes ? -1 : 1))
        return ([sort[0], sort[1], sort[2]])
    }

    useEffect( () => {
        const getCandidateDetails = async () => {
            await fetch('/allCandidate')
            .then(res => res.json())
            .then(result => {
                const topCandidates = result.data.map((candidate) => (
                    {
                      name: candidate.name,
                      votes: candidate.totalVotes
                    }
                ))
                const sortedData = sortData(topCandidates) 
                setTop3Candidates(sortedData)
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

    const deleteCandidate = (_id) => {
        fetch('/delete-candidate',{
            method: 'delete',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                _id: _id
            })
          })
          .then(res => res.json())
          .then(data => {
            const newData = candidateList.filter(candidate => {
                return candidate._id !== _id
            })
            setCandidateList(newData)
            toast.dark('Deleted Successfully')
        })
    }

    return (
        <div>
            <div className={classes.root}>
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
                                    <div className={classes.button}>
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
                                        <Button 
                                            className={classes.button} 
                                            variant="contained"
                                            color="primary"
                                            onClick={() => history.push(`/editcandidatedetails/${candidate._id}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button 
                                            className={classes.button} 
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => deleteCandidate(candidate._id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Accordion> 
                                ))
                            }
                        </Card>

                        <Card className={classes.statsCard}>
                            <h1 className={classes.title}>Poll Statistics</h1>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Top 3 Candidates
                                    </Typography>
                                    <List>
                                        {
                                            top3Candidates.map((data, index) => (
                                                <ListItem>
                                                    <ListItemText primary={`${index+1} ${data.name}`} secondary={`${data.votes} Votes`}/>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </CardContent>
                            </Card>

                            <Card style={{marginTop: 30}}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Total Votes
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {`${totalVotes} Votes`}
                                    </Typography>
                                </CardContent>
                            </Card>
                            
                        </Card>
            </div>
        </div>
    );
}

export default Admin;