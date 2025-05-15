import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sayihvvtwievdiqatkzh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNheWlodnZ0d2lldmRpcWF0a3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMTMzNDcsImV4cCI6MjA2MjY4OTM0N30.DJit51ZkRMwBcyH2harSb-ago_Zc5sMYDeht6qAMQIA';

export const supabase = createClient(supabaseUrl, supabaseKey);
