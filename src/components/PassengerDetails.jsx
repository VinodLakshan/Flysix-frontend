import { AssignmentInd, KeyboardArrowDown, Person } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Button, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Const } from '../Properties'
import PassengerForm from './PassengerForm'

const PassengerDetails = ({ passengers, setPassengers }) => {

    const [expanded, setExpanded] = React.useState(false);
    const { searchCriteria } = useSelector(state => state.flight)

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const changePassengerDetails = (passengerDetails) => {

        const otherPassengers = passengers.map((pass) => {
            if (pass.id === passengerDetails.id) pass = passengerDetails;
            return pass;
        });
        setPassengers(otherPassengers);
    }

    useEffect(() => {

        const allPassengers = [];

        for (let index = 0; index < searchCriteria.adults; index++) {
            const passenger = { id: Const.Adult + (index + 1), type: Const.Adult, count: index + 1, title: "Mr" };
            allPassengers.push(passenger)

        }

        for (let index = 0; index < searchCriteria.children; index++) {
            const passenger = { id: Const.Child + (index + 1), type: Const.Child, count: index + 1, title: "Master" };
            allPassengers.push(passenger)

        }

        for (let index = 0; index < searchCriteria.infants; index++) {
            const passenger = { id: Const.Infant + (index + 1), type: Const.Infant, count: index + 1, title: "Master" };
            allPassengers.push(passenger)

        }

        setPassengers(allPassengers)

    }, [searchCriteria])



    return (
        <Paper elevation={5} sx={{ borderRadius: 2, p: 2, width: { md: "60vw" }, maxWidth: 800 }}>
            <Stack justifyContent="center" spacing={2} >

                <Stack direction="row" spacing={1}>
                    <AssignmentInd />
                    <Typography variant="h6">Passenger Details</Typography>
                </Stack>

                {
                    passengers.map((passenger, index) => {

                        return (
                            <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleAccordionChange(`panel${index}`)}>
                                <AccordionSummary
                                    expandIcon={<KeyboardArrowDown />}
                                >
                                    <Stack direction="row" spacing={1} alignItems="flex-start">
                                        <Person sx={{ fontSize: 20 }} />
                                        <Typography variant="body1">{passenger.type} - {passenger.count}</Typography>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <PassengerForm passengerDetails={passenger} changePassengerDetails={changePassengerDetails} />
                                </AccordionDetails>
                            </Accordion>)

                    })
                }

            </Stack>
        </Paper>
    )
}

export default PassengerDetails