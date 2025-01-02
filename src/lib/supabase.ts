import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseUrl = 'https://hurtqufqpymaywazxdos.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1cnRxdWZxcHltYXl3YXp4ZG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4MDkxNzEsImV4cCI6MjA1MTM4NTE3MX0.wsBl_2fgWfkMA1p8Z6oQRPodE4cutbp_2uJQs-Z9Bj4';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);