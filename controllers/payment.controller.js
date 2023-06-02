const User = require("../models/user.model");
const stripe = require("stripe")(process.env.Secret_key);


exports.processPayment = async (req, res) => {
  try {
    const { cardNumber, expMonth, expYear, cvc, amount, currency } = req.body;
    if (!cardNumber || !expMonth || !expYear || !cvc || !amount || !currency)
      throw new Error("Please enter all field");
    const user = await User.findOne({ _id: req.user_id });
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
    });

    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc,
      }
    });

    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: customer.id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customer.id,
      payment_method: paymentMethod.id,
      confirm: true,
    });

    res.json({ status: paymentIntent.status });
  } catch (error) {
    console.error( error.message);
    res.status(500).json({ error: error.message });
  }
};


