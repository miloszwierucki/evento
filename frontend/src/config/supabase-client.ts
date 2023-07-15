import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kqzwzidkvefybhcypagb.supabase.co";
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const { data: user } = await supabase.from("user").select("*").single();
export const isAdmin = user?.role === "admin" || false;
