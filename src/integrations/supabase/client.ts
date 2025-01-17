import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xtpzablwtpsyuzhylnce.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cHphYmx3dHBzeXV6aHlsbmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDA3NzcsImV4cCI6MjA1MjY3Njc3N30.e75EumF3qYJzlvuoHQdwufZSuL30KbhPIz82OiBVn8w";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    storageKey: 'supabase-auth',
    storage: window.localStorage,
  },
});