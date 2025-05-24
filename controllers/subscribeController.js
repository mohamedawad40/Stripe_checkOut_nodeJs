const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); //stripe module
const PORT = process.env.PORT || 3000;

exports.subscribe = async (req, res) => {
    const plan = req.query.plan;
    const planOptions = {
        original: 'price_1RNHtYFRwXGzN3LBgG7u12be', //price id for original plan
        pro: 'price_1RNHshFRwXGzN3LB2F9XPEDs' //price id for pro plan
    }
    const priceId = planOptions[plan];
    if (!priceId) {
        return res.status(400).send('Invalid plan selected');
    }
    const origin = req.headers.origin || `http://localhost:${PORT}`;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `${origin}/success`,
        cancel_url: `${origin}/cancel`,
    });

    res.redirect(303, session.url);
}