import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://rzgptwoliadtjldgzaby.supabase.co';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6Z3B0d29saWFkdGpsZGd6YWJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MzI3NjgsImV4cCI6MjA4NDUwODc2OH0.6oLGVvukt248Ub4eB5T73_5QMBBiRw62Q95_sliNWqk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
