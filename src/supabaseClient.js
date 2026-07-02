import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ojthbfczfrjwrjuzhrsa.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_gJ8IJyv1u1_zRJJPnLcd9Q_VTofgRUV";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);