import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://ooizylnrmiyifscnuwiu.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vaXp5bG5ybWl5aWZzY251d2l1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2ODE5MjI2MCwiZXhwIjoxOTgzNzY4MjYwfQ.opEE_c0cm4HWxmElvoPLwcYx-_Vf0mALUGIbEDZTBzI";

// const NEXT_PUBLIC_PROJECT_URL = process.env.PROJECT_URL
// const NEXT_PUBLIC_KEY = process.env.PUBLIC_KEY
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video").select("*").order("created_at", { ascending: false })
        }
    }
}