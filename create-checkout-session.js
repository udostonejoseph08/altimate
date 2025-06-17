import Stripe from 'stripe';

const stripe = new Stripe('sk_test_YOUR_SECRET_KEY'); // Replace with your Stripe secret key

export async function createCheckoutSession(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price: 'price_1XXXYOURSTRIPEPRICEID',
            quantity: 1,
          },
        ],
        subscription_data: {
          trial_period_days: 2,
        },
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });
      res.status(200).json({ id: session.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
