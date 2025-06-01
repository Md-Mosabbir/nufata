"use client"

import { sdk } from "@lib/config"
import { useMemo, useState } from "react"

export default function ResetPassword() {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const searchParams = useMemo(() => {
    if (typeof window === "undefined") {
      return
    }
    return new URLSearchParams(window.location.search)
  }, [])
  const token = useMemo(() => searchParams?.get("token"), [searchParams])
  const email = useMemo(() => searchParams?.get("email"), [searchParams])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    if (!token) {
      setError("Missing token.")
      return
    }
    if (!email) {
      setError("Missing email.")
      return
    }
    if (!password) {
      setError("Password is required.")
      return
    }
    setLoading(true)
    sdk.auth
      .updateProvider(
        "customer",
        "emailpass",
        {
          email,
          password,
        },
        token
      )
      .then(() => {
        setSuccess(true)
      })
      .catch((err) => {
        setError(err.message || "Couldn't reset password.")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Password Reset</h1>
        <p className="text-green-600">
          Password reset successfully! You can now log in.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow"
    >
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <label className="block mb-2">New Password</label>
      <input
        className="w-full p-2 border rounded mb-4"
        placeholder="New Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  )
}
