import { createClient } from "@supabase/supabase-js";

const _PROJECT_URL = process.env.PROJECT_URL
const _PUBLIC_KEY =  process.env.PUBLIC_KEY
const supabase = createClient(_PROJECT_URL, _PUBLIC_KEY)

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video").select("*").order("created_at", { ascending: false })
        }
    }
}