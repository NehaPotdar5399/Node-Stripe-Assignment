require('dotenv').config();
const stripe=require("stripe")(process.env.stripe_key);

module.exports = {
    stripeCheckout: async (req, res, next) => {
      try {
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price_data: {
                currency: "inr",
                product_data: {
                  name: req.body.product_details.product_name,
                  images: [req.body.product_details.images[0]],
                },
                unit_amount: req.body.product_details.price * 100,
              },
              quantity: req.body.quantity,
            },
          ],
          mode: "payment",
          success_url: "http://localhost:4200/success",
          cancel_url: "http://localhost:4200/",
        });
        res.send(session.url);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
  
}
  