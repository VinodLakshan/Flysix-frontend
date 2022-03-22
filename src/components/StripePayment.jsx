import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Properties } from '../Properties';
import StripeComponent from "react-stripe-checkout";
import { Button } from '@mui/material';

const StripePayment = ({ price }) => {

    const [stripeToken, setStripeToken] = useState(null);

    const onToken = (token) => {
        setStripeToken(token);
    }

    useEffect(() => {

        const makeRequest = async () => {

            try {
                const res = await axios.post(`${Properties.backendUrl}/stripe/payment`, {
                    tokenId: stripeToken.id,
                    amount: price * 100
                });

                console.log(res)

                // navigate("/success", {
                //     stripeData: res.data,
                //     cart: cart
                // });

            } catch (err) {
                console.log(err);
            }

        }

        stripeToken && price > 0 && makeRequest();

    }, [stripeToken, price])

    return (
        <StripeComponent
            name="Flysix"
            image="https://i.ibb.co/3Tc4KMF/Fly-Six-logo.png"
            billingAddress
            shippingAddress
            description={`Your Total amount is ${price}`}
            amount={price * 100}
            token={onToken}
            stripeKey={Properties.STRIPE_KEY}>
            <Button variant="contained" fullWidth>
                Continue to Payment
            </Button>
        </StripeComponent>
    )
}

export default StripePayment