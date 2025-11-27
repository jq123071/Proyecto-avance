import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ==========================
// CONFIGURA TU SUPABASE
// ==========================
let SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4YWhhdWZ5bnhkY29neXB4Ym5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDUzMDcsImV4cCI6MjA3NjEyMTMwN30.BVyC4lf98NvF2dZbsYvqYyPHsybMtjQAo0zMDE7IN8Y";
let SUPABASE_URL = "https://jxucinwtreugfehjfgkx.supabase.co";

// Crear cliente una sola vez
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 