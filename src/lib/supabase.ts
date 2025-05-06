import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fjuiocwtweuxjmthlwev.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqdWlvY3d0d2V1eGptdGhsd2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MzM3MTEsImV4cCI6MjA2MTQwOTcxMX0.xPoCPRDctNqt7wAwacCNtlx3GH96vbUSk1fa-tMiYHo'
export const supabase = createClient(supabaseUrl, supabaseAnonKey);