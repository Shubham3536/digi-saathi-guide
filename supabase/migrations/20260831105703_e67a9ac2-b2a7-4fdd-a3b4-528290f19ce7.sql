CREATE TABLE public.sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  task_id TEXT,
  step_index INTEGER,
  language TEXT NOT NULL DEFAULT 'en',
  input_mode TEXT,
  duration_ms INTEGER,
  detail TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.sessions(id) ON DELETE SET NULL,
  task_id TEXT,
  helpful TEXT,
  would_use_again BOOLEAN,
  confusing_text TEXT,
  language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX events_session_idx ON public.events(session_id);
CREATE INDEX events_type_idx ON public.events(event_type);

GRANT INSERT ON public.sessions TO anon, authenticated;
GRANT INSERT ON public.events TO anon, authenticated;
GRANT INSERT ON public.feedback TO anon, authenticated;
GRANT ALL ON public.sessions TO service_role;
GRANT ALL ON public.events TO service_role;
GRANT ALL ON public.feedback TO service_role;

ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can start a session" ON public.sessions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can log an event" ON public.events FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can submit feedback" ON public.feedback FOR INSERT TO anon, authenticated WITH CHECK (true);