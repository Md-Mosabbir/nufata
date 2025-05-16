export function getSupabaseUrl(path?: string | null): string | null {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL || ""
  if (!path) return null
  if (path.startsWith("http")) return path

  // ✅ Remove leading projectId if mistakenly included
  const cleanedPath = path.replace(/^vmalvylbpzudqhkvpcqj\//, "")

  return baseUrl + cleanedPath
}
