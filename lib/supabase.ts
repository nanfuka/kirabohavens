import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ziozuybxcqpasmjikiof.supabase.co";
const supabaseAnonKey = "sb_publishable_NgiRU_-EV1eyoOn68abEVg_t2DDYag2";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);