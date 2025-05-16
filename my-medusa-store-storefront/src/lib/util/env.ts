export const getBaseURL = () => {
  return process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"
}

export const NEXT_PUBLIC_SUPABASE_PUBLIC_URL = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL;
