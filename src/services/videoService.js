import { createClient } from "@supabase/supabase-js";

const NEXT_PUBLIC_PROJECT_URL = process.env.NEXT_PUBLIC_PROJECT_URL
const NEXT_PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY
const supabase = createClient(
    process.env.NEXT_PUBLIC_PROJECT_URL,
    process.env.NEXT_PUBLIC_KEY,
)

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video").select("*").order("created_at", { ascending: false })
        }
    }
}