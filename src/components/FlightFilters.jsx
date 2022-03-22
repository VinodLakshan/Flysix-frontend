import React, { useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { Checkbox, Chip, FormControl, FormControlLabel, FormGroup, Paper, Radio, RadioGroup, Slider, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilteredFlightList } from '../redux/flightRedux';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CDivider = styled(Divider)(() => ({
    marginBottom: 10
}))

const FlightFilters = ({ flightList, filterData }) => {

    const [journeyDuration, setJourneyDuration] = React.useState(5);
    const [customizedFilters, setCustomizedFilters] = React.useState({
        prices: {
            min: filterData.prices.min,
            max: filterData.prices.max
        },
        airlines: new Set(filterData.airlines.map(airline => { return airline.code }))
    });
    const { filteredFlightList } = useSelector(state => state.flight);
    const dispatch = useDispatch();

    const handlePriceChange = (event, newValue) => {
        setCustomizedFilters({
            ...customizedFilters,
            "prices": {
                min: newValue[0],
                max: newValue[1]
            }
        });

    };

    const handleAirlinesChange = (event) => {

        const existingAirlines = customizedFilters.airlines;

        if (event.target.checked) {
            existingAirlines.add(event.target.value);

        } else {
            existingAirlines.delete(event.target.value);
        }

        setCustomizedFilters({
            ...customizedFilters,
            "airlines": existingAirlines
        })

    }

    const handleJourneyDurationChange = (event, newValue) => {
        setJourneyDuration(newValue);
    };

    const triggerFilters = () => {

        const newFilteredList = flightList.filter(flight => {
            if (flight.price.total > customizedFilters.prices.min && flight.price.total < customizedFilters.prices.max &&
                customizedFilters.airlines.has(flight.airline.code))
                return flight;
        });


        dispatch(updateFilteredFlightList(newFilteredList))
    }

    useEffect(() => {
        triggerFilters();

    }, [customizedFilters])


    return (
        <Paper elevation={5}
            sx={{
                borderRadius: 2,
                minWidth: { sm: 250, xs: 300 },
                maxWidth: 350,
                maxHeight: { xs: 600, sm: 600, md: '100%' },
                px: 2,
                overflow: 'auto'
            }}>
            <nav aria-label="number of results">
                <List >
                    <ListItem sx={{
                        display: 'flex', justifyContent: 'center'
                    }}>
                        <Typography variant="body1"> {filteredFlightList.length} of {flightList.length} results</Typography>
                    </ListItem>

                    <CDivider variant="middle" sx={{ backgroundColor: 'primary.light' }} />

                    <ListItem>
                        <Box sx={{ width: '100%', }}>
                            <Typography id="track-inverted-slider" gutterBottom variant="subtitle2">
                                Price
                            </Typography>
                            <Typography id="track-inverted-slider" variant="body2">
                                $ {customizedFilters.prices.min} - $ {customizedFilters.prices.max}
                            </Typography>
                            <Slider
                                min={filterData ? filterData.prices.min : 0}
                                step={50}
                                max={filterData ? filterData.prices.max : 1000}
                                getAriaLabel={() => 'Price'}
                                value={[customizedFilters.prices.min, customizedFilters.prices.max]}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                valueLabelFormat={() => `$ ${customizedFilters.prices.min} - $ ${customizedFilters.prices.max}`}

                            />
                        </Box>
                    </ListItem>

                    <CDivider variant="middle" />

                    <ListItem>
                        <Box sx={{ width: '100%', }}>
                            <Typography id="track-inverted-slider" variant="subtitle2">
                                Stops
                            </Typography>

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <Checkbox {...label} disabled
                                    icon={<Chip color="primary" variant="outlined" label="0 Stop" />}
                                    checkedIcon={<Chip color="primary" variant="contained" label="0 Stop" />}
                                />
                                <Checkbox {...label}
                                    icon={<Chip color="primary" variant="outlined" label="1 Stop" />}
                                    checkedIcon={<Chip color="primary" variant="contained" label="1 Stop" />}
                                />
                                <Checkbox
                                    {...label}
                                    icon={<Chip color="primary" variant="outlined" label="2 Stop" />}
                                    checkedIcon={<Chip color="primary" variant="contained" label="2 Stop" />}
                                />
                            </Box>
                        </Box>
                    </ListItem>

                    <CDivider variant="middle" />

                    <ListItem>
                        <Box sx={{ width: '100%', }}>
                            <Typography id="track-inverted-slider" variant="subtitle2">
                                Airlines
                            </Typography>

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                pl: 2,
                            }}>

                                <FormGroup sx={{ gap: -1 }}>
                                    {
                                        filterData.airlines.map((airline, index) => {
                                            return < FormControlLabel key={index} control={<Checkbox value={airline.code} onChange={handleAirlinesChange} defaultChecked />}
                                                label={<Typography variant="body2" sx={{ fontSize: "13px" }}>{airline.name}</Typography>} />
                                        })
                                    }

                                </FormGroup>
                            </Box>
                        </Box>
                    </ListItem>

                    <CDivider variant="middle" />

                    <ListItem>
                        <Box sx={{ width: '100%', }}>
                            <Typography id="track-inverted-slider" gutterBottom variant="subtitle2">
                                Journey Duration
                            </Typography>
                            <Typography id="track-inverted-slider" variant="body2">
                                {journeyDuration} hours
                            </Typography>
                            <Slider
                                min={3}
                                step={0.5}
                                max={20}
                                getAriaLabel={() => "Journey Duration"}
                                value={journeyDuration}
                                onChange={handleJourneyDurationChange}
                                valueLabelDisplay="auto"
                                valueLabelFormat={() => `${journeyDuration} hr`}
                            />
                        </Box>
                    </ListItem>

                    <CDivider variant="middle" />

                    <ListItem>

                        <Box sx={{ width: '100%', }}>
                            <Typography id="track-inverted-slider" gutterBottom variant="subtitle2">
                                Fare Type
                            </Typography>
                            <FormControl sx={{ pl: 2 }}>
                                <RadioGroup
                                    name="fareType"
                                >
                                    <FormControlLabel value="refundable" control={<Radio />} label="Refundable" />
                                    <FormControlLabel value="non-refundable" control={<Radio />} label="Non-refundable" />
                                </RadioGroup>
                            </FormControl>
                        </Box>

                    </ListItem>
                </List>

            </nav>

        </Paper >
    )
}

export default FlightFilters