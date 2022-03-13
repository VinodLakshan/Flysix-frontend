import { AssignmentInd, KeyboardArrowDown, Person } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { Const } from '../Properties'
import PassengerForm from './PassengerForm'

const PassengerDetails = () => {

    const [expanded, setExpanded] = React.useState(false);

    const handleAccordionChange =
        (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <Paper elevation={5} sx={{ borderRadius: 2, p: 2, width: { md: "60vw" }, maxWidth: 800 }}>
            <Stack justifyContent="center" spacing={2} >

                <Stack direction="row" spacing={1}>
                    <AssignmentInd />
                    <Typography variant="h6">Passenger Details</Typography>
                </Stack>

                <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<KeyboardArrowDown />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Stack direction="row" spacing={1} alignItems="flex-start">
                            <Person sx={{ fontSize: 20 }} />
                            <Typography variant="body1">{Const.Adult} - {1}</Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <PassengerForm type={Const.Adult} count={1} />
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<KeyboardArrowDown />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Stack direction="row" spacing={1} alignItems="flex-start">
                            <Person sx={{ fontSize: 20 }} />
                            <Typography variant="body1">{Const.Child} - {1}</Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <PassengerForm type={Const.Child} count={1} />
                    </AccordionDetails>
                </Accordion>

            </Stack>
        </Paper>
    )
}

export default PassengerDetails