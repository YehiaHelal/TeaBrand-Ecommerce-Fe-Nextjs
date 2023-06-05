// import { NextApiRequest, NextApiResponse } from "next";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log(req.body.OrderDetails.orderTotalValue);
  // console.log(req.body.ordernumber);

  // const OrderDetails = {
  //   orderProducts: [...orderItemsv],
  //   orderTotalValue: orderPriceTotalvalue,
  // };

  // res.status(200);
  if (req.method === "POST") {
    // res.status(200);
    // const items = req.body.cartItem;

    const item = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Total Price",
            // images: [req.headers.origin + item.image],
          },
          unit_amount: req.body.OrderDetails.orderTotalValue * 100,
        },
        quantity: 1,
      },
    ];
    // const transformedItems = items.map((item) => ({
    //   price_data: {
    //     currency: "usd",
    //     product_data: {
    //       name: item.name,
    //       images: [req.headers.origin + item.image],
    //     },
    //     unit_amount: item.price * 100,
    //   },
    //   quantity: item.quantity,
    // }));

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: item,
        mode: "payment",
        success_url: `${req.headers.origin}/successorder`,
        cancel_url: `${req.headers.origin}/failure`,
        // success_url: `https://zippy-horse-78b7b7.netlify.app/successorders`,
        // cancel_url: `https://zippy-horse-78b7b7.netlify.app/order`,
      });
      res.json({ sessionURL: session.url });
    } catch (err) {
      console.log(err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
