import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseUrl = 'https://evqefyrjdvjktcisxqww.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2cWVmeXJqZHZqa3RjaXN4cXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NjUzNTQsImV4cCI6MjA1MzA0MTM1NH0.K2iviAVHFTUGJLqNzYQ7MPjQ5dEG3mByqAFJroxbQq8'
export const supabase = createClient(supabaseUrl, supabaseAnonKey);