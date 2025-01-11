require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Replace these with your Supabase project URL and API key
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

module.exports = supabase;