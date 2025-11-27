import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ==========================
// CONFIGURA TU SUPABASE
// ==========================
let SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4dWNpbnd0cmV1Z2ZlaGpmZ2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMDgwMjEsImV4cCI6MjA3OTc4NDAyMX0.ssWcoQwUzxIGYArzb3porS8JxFecaebZV_SMhnh98nM";
let SUPABASE_URL = "https://jxucinwtreugfehjfgkx.supabase.co";

// Crear cliente una sola vez
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 