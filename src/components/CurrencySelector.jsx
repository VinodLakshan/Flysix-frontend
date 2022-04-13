import React from 'react'
import { Box } from '@mui/material'
import * as MuIcon from "@mui/icons-material";
import { Action, Fab } from 'react-tiny-fab';
import { Currencies } from '../Properties';

const style = {
    backgroundColor: '#00AB55',
}

const CurrencySelector = ({ searchItems, setSearchItems }) => {


    const generateIcon = (variation, props = {}) => {
        const IconName = MuIcon[variation];;
        return <IconName {...props} />;
    };

    const changeCurrentCurrency = (currency) => {
        setSearchItems({ ...searchItems, "currency": currency })
    }

    return (
        <Box>
            <Fab
                mainButtonStyles={style}
                actionbuttonstyles={style}
                style={{
                    position: 'fixed',
                    bottom: 0,
                    right: 0,
                    zIndex: 1,
                }}
                icon={generateIcon(searchItems.currency.icon)}
                alwaysShowTitle={false}
            >
                {
                    Object.keys(Currencies).map(cur => {
                        return (
                            <Action key={cur}
                                text={Currencies[cur].name}
                                style={style}
                                onClick={() => changeCurrentCurrency(Currencies[cur])}
                            >
                                {generateIcon(Currencies[cur].icon)}
                            </Action>
                        );
                    })
                }

            </Fab>
        </Box>
    )
}

export default CurrencySelector