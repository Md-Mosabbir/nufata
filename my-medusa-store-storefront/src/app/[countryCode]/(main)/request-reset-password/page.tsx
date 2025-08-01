"use client"

import { sdk } from "@lib/config"
import { useState } from "react"

export default function RequestResetPassword() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) {
      alert("Email is required")
      return
    }
    setLoading(true)

    sdk.auth
      .resetPassword("customer", "emailpass", {
        identifier: email,
      })
      .then(() => {
        alert(
          "If an account exists with the specified email, it'll receive instructions to reset the password."
        )
      })
      .catch((error) => {
        alert(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="min-h-screen">

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow"
      >
        <h1 className="text-2xl font-bold mb-4">Request Password Reset</h1>
        <label className="block mb-2">Email</label>
        <input
          className="w-full p-2 border rounded mb-4"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Requesting..." : "Request Password Reset"}
        </button>
      </form>
    </div>
  )
}
