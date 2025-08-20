import React, { useContext, useState } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

const BuyCredit = () => {
  const { user, backendUrl, token, setShowLogin, loadCreditsData  } = useContext(AppContext)
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const paymentStripe = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true)
        return
      }

      setLoading(true)

      // Step 1: Create PaymentIntent via backend
      const { data } = await axios.post(
        backendUrl + '/api/user/pay-stripe',
        { planId },
        { headers: { token: token } }
      )

      if (!data.success) {
        toast.error(data.message)
        setLoading(false)
        return
      }

      const clientSecret = data.clientSecret
      const cardElement = elements.getElement(CardElement)

      if (!cardElement) {
        toast.error("Card details not entered")
        setLoading(false)
        return
      }

      // Step 2: Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.name || "Anonymous",
            email: user?.email || "test@example.com",
          },
        },
      })

      if (result.error) {
        toast.error(result.error.message)
      } else if (result.paymentIntent.status === 'succeeded') {
        toast.success("Payment successful 🎉")
        await loadCreditsData()
        navigate('/result') // credits update via webhook
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10"
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10 ">
        Choose the plan
      </h1>

      {/* Stripe Card Element */}
      <div className="max-w-md mx-auto border p-4 rounded mb-6">
        <CardElement className="p-2 border rounded" />
      </div>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className="mt-3 mb-1 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price} </span>/{" "}
              {item.credits} Credits
            </p>
            <button
              onClick={() => paymentStripe(item.id)}
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 disabled:opacity-50"
              disabled={!stripe || !elements || loading}
            >
              {loading ? "Processing..." : user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit
