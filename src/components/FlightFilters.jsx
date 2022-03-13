import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { Checkbox, Chip, FormControl, FormControlLabel, FormGroup, Paper, Radio, RadioGroup, Slider, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CDivider = styled(Divider)(() => ({
    marginBottom: 10
}))

const FlightFilters = () => {
    const [priceRange, setPriceRange] = React.useState([100, 1000]);
    const [journeyDuration, setJourneyDuration] = React.useState(5);

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleJourneyDurationChange = (event, newValue) => {
        setJourneyDuration(newValue);
    };

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
                        <Typography variant="body1"> 21 of 50 results</Typography>
                    </ListItem>

                    <CDivider variant="middle" sx={{ backgroundColor: 'primary.light' }} />

                    <ListItem>
                        <Box sx={{ width: '100%', }}>
                            <Typography id="track-inverted-slider" gutterBottom variant="subtitle2">
                                Price
                            </Typography>
                            <Typography id="track-inverted-slider" variant="body2">
                                $ {priceRange[0]} - $ {priceRange[1]}
                            </Typography>
                            <Slider
                                min={0}
                                step={10}
                                max={1000}
                                getAriaLabel={() => 'Price'}
                                value={priceRange}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                valueLabelFormat={() => `$ ${priceRange[0]} - $ ${priceRange[1]}`}

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
                                    <FormControlLabel control={<Checkbox />} label="Emirates" />
                                    <FormControlLabel control={<Checkbox />} label="Quatar Airways" />
                                    <FormControlLabel control={<Checkbox />} label="Itihad Airways" />
                                    <FormControlLabel control={<Checkbox />} label="British Airways" />
                                    <FormControlLabel control={<Checkbox />} label="Sri Lankan Airlines" />
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