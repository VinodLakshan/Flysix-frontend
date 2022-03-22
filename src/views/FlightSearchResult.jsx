import { Alert, Button, Modal, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import FlightFilters from '../components/FlightFilters'
import Footer from '../components/Footer'
import PageHeader from '../components/PageHeader'
import SearchFlights from '../components/SearchFlights'
import SearchResults from '../components/SearchResults'
import { Const } from '../Properties'
import { updateFilteredFlightList } from '../redux/flightRedux'
import { codeToAirportName, formatStringToDate, getHourNumberFromDuration, getPTDuration, getTimeDuration } from '../utils/Common'

const FlightSearchResult = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [flightList, setFlightList] = React.useState([]);
    const [filters, setFilters] = React.useState(null);
    const { filteredFlightList } = useSelector(state => state.flight);
    const location = useLocation();
    const dispatch = useDispatch();

    let flightData = location.state?.flightList;

    const organizeSegments = (segments) => {

        const organizedSegments = [];

        segments.forEach((segment, index) => {

            if (segment.numberOfStops !== 0) {

                segment.stops.forEach((stop, indexS) => {
                    const organizedSegment = {};

                    if (indexS === 0) {
                        organizedSegment.origin = codeToAirportName(segment.departure.iataCode);
                        organizedSegment.departAt = segment.departure.at;

                    } else {
                        organizedSegment.origin = codeToAirportName(segment.stops[indexS - 1].iataCode);
                        organizedSegment.departAt = segment.stops[indexS - 1].departureAt;
                    }

                    organizedSegment.destination = codeToAirportName(stop.iataCode);
                    organizedSegment.arriveAt = stop.arrivalAt;

                    organizedSegments.push(organizedSegment);

                });

                const organizedSegment = {};

                const lastStopIndex = segment.stops.length - 1;
                organizedSegment.origin = codeToAirportName(segment.stops[lastStopIndex].iataCode);
                organizedSegment.departAt = segment.stops[lastStopIndex].departureAt;

                organizedSegment.destination = codeToAirportName(segment.arrival.iataCode);
                organizedSegment.arriveAt = segment.arrival.at;

                organizedSegments.push(organizedSegment);

            } else {

                const organizedSegment = {};

                organizedSegment.origin = codeToAirportName(segment.departure.iataCode);
                organizedSegment.departAt = segment.departure.at;

                organizedSegment.destination = codeToAirportName(segment.arrival.iataCode);
                organizedSegment.arriveAt = segment.arrival.at;

                organizedSegment.duration = getPTDuration(segment.duration);

                organizedSegments.push(organizedSegment);
            }

        });

        setSegmentsDurations(organizedSegments);
        setArriveAtDepartAtReadable(organizedSegments);

        return organizedSegments;
    }

    const setSegmentsDurations = (organizedSegments) => {

        organizedSegments.forEach((organizedSegment, index) => {
            organizedSegment.duration = getTimeDuration(organizedSegment.departAt, organizedSegment.arriveAt);

            if (index < organizedSegments.length - 1) {
                organizedSegment.layover = getTimeDuration(organizedSegment.arriveAt, organizedSegments[index + 1].departAt);

            } else {
                organizedSegment.layover = null;
            }
        })
    }

    const setArriveAtDepartAtReadable = (organizedSegments) => {

        organizedSegments.forEach((organizedSegment) => {
            organizedSegment.departAt = formatStringToDate(organizedSegment.departAt, Const.dateWithShortDay);
            organizedSegment.arriveAt = formatStringToDate(organizedSegment.arriveAt, Const.dateWithShortDay);
        })

    }

    const organizeFlights = () => {

        const flightDetails = flightData.data;
        const dictionaries = flightData.dictionaries;

        const organizedFlights = [];

        flightDetails.forEach((flight) => {

            let organizedFlight = {
                airline: {
                    code: "",
                    name: ""
                },
                depart: {
                    origin: "",
                    destination: "",
                    departAt: "",
                    arriveAt: "",
                    duration: "",
                    segments: []
                },
                return: {
                    origin: "",
                    destination: "",
                    departAt: "",
                    arriveAt: "",
                    duration: "",
                    segments: []
                },
                price: {
                    currency: "",
                    total: 0
                }

            };

            organizedFlight.id = flight.id;
            // Since the developer API returns the same price values since using random to make prices different
            organizedFlight.price.currency = flight.price.currency;
            organizedFlight.price.total = Number((Number(flight.price.grandTotal) * (Math.random() + 1)).toFixed(2));

            organizedFlight.airline.code = flight.validatingAirlineCodes[0];
            organizedFlight.airline.name = dictionaries.carriers[flight.validatingAirlineCodes[0]];

            // ==== depart ====
            organizedFlight.depart.origin = codeToAirportName(flight.itineraries[0].segments[0].departure.iataCode);
            organizedFlight.depart.departAt = formatStringToDate(flight.itineraries[0].segments[0].departure.at, Const.dateWithShortDay)

            const departIndex = flight.itineraries[0].segments.length - 1;
            organizedFlight.depart.destination = codeToAirportName(flight.itineraries[0].segments[departIndex].arrival.iataCode);
            organizedFlight.depart.arriveAt = formatStringToDate(flight.itineraries[0].segments[departIndex].arrival.at, Const.dateWithShortDay)

            organizedFlight.depart.duration = getPTDuration(flight.itineraries[0].duration);
            organizedFlight.depart.segments = organizeSegments(flight.itineraries[0].segments)

            // ==== return ====
            if (!flight.oneWay) {
                organizedFlight.return.origin = codeToAirportName(flight.itineraries[1].segments[0].departure.iataCode);
                organizedFlight.return.departAt = formatStringToDate(flight.itineraries[1].segments[0].departure.at, Const.dateWithShortDay)

                const returnIndex = flight.itineraries[1].segments.length - 1;
                organizedFlight.return.destination = codeToAirportName(flight.itineraries[1].segments[returnIndex].arrival.iataCode);
                organizedFlight.return.arriveAt = formatStringToDate(flight.itineraries[1].segments[returnIndex].arrival.at, Const.dateWithShortDay)

                organizedFlight.return.duration = getPTDuration(flight.itineraries[1].duration);
                organizedFlight.return.segments = organizeSegments(flight.itineraries[1].segments)

            } else {
                organizedFlight.return = null;
            }

            organizedFlights.push(organizedFlight)

        });

        return organizedFlights;
    }

    const loadFilters = (flights) => {

        const filters = {
            prices: {
                min: flights[0].price.total,
                max: flights[0].price.total
            },
            airlines: [],
            duration: {
                min: getHourNumberFromDuration(flights[0].depart.duration),
                max: getHourNumberFromDuration(flights[0].depart.duration)
            }
        }

        flights.forEach((flight) => {

            if (flight.price.total < filters.prices.min) {
                filters.prices.min = flight.price.total

            } else if (flight.price.total > filters.prices.max) {
                filters.prices.max = flight.price.total

            }

            if (!(filters.airlines.find(airline => airline.code === flight.airline.code))) filters.airlines.push(flight.airline);

            if (getHourNumberFromDuration(flight.depart.duration) < filters.duration.min) {
                filters.duration.min = getHourNumberFromDuration(flight.depart.duration);

            } else if (getHourNumberFromDuration(flight.depart.duration) > filters.duration.max) {
                filters.duration.max = getHourNumberFromDuration(flight.depart.duration);
            }


        });

        filters.prices.min = Math.floor(filters.prices.min / 50) * 50;
        filters.prices.max = Math.ceil(filters.prices.max / 50) * 50;

        return filters;

    }

    useEffect(() => {

        if (flightData) {

            const organizedFlights = organizeFlights();
            setFlightList(organizedFlights);
            dispatch(updateFilteredFlightList(organizedFlights));

            setFilters(loadFilters(organizedFlights));
        }

    }, [flightData])



    return (
        <Stack
            direction="column"
            alignItems='center'
            spacing={4}
        >
            <PageHeader />
            <Box sx={{ px: 2 }}>
                <SearchFlights type="hr" />
            </Box>

            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2} sx={{ px: 2 }}>

                <Box sx={{ display: { md: 'flex', xs: 'none' } }} >
                    {filters && <FlightFilters flightList={flightList} filterData={filters} />}
                </Box>
                <Stack direction="row" alignItems="center" sx={{ display: { md: 'none', xs: 'flex' }, pl: 2 }}>
                    <Button variant="contained" onClick={handleOpen}>Filters</Button>
                    <Typography variant="body2" sx={{ pl: 2 }}> {filteredFlightList?.length} of {flightList.length} results</Typography>
                    <Modal
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box>
                            {filters && <FlightFilters flightList={flightList} filterData={filters} />}
                        </Box>
                    </Modal>
                </Stack>

                <Box sx={{ px: 2 }}>
                    {!flightData && <Alert
                        sx={{ width: { md: "60vw" }, maxWidth: 900 }}
                        severity="warning" variant='filled'>No flight data available. Please change the scenario and try again.</Alert>}
                    {flightData && <SearchResults />}
                </Box>
            </Stack>
            <Footer />

        </Stack >
    )
}

export default FlightSearchResult