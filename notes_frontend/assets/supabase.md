# Supabase Integration for Notes App Frontend

## Usage
- Uses `@supabase/supabase-js` client, initialized in `src/app/services/notes-supabase.service.ts`.
- API endpoint: `https://mzxyorlnbfdkneiezgjz.supabase.co`
- API key: See project `src/app/supabase.config.ts`
- Notes table fields: `id (uuid)`, `title (text)`, `content (text)`, `created_at (timestamp)`, `updated_at (timestamp)`
- No authentication required.

## How to change credentials
- Update `src/app/supabase.config.ts` for `SUPABASE_URL` and `SUPABASE_KEY`.
