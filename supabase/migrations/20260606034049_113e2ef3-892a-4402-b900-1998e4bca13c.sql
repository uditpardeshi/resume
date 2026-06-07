CREATE TABLE public.payment_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_id TEXT UNIQUE NOT NULL,
  token_hash TEXT NOT NULL,
  is_used BOOLEAN NOT NULL DEFAULT false,
  gateway TEXT NOT NULL CHECK (gateway IN ('razorpay','stripe')),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '15 minutes'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payment_records_token_hash ON public.payment_records(token_hash);
CREATE INDEX idx_payment_records_payment_id ON public.payment_records(payment_id);

GRANT ALL ON public.payment_records TO service_role;

ALTER TABLE public.payment_records ENABLE ROW LEVEL SECURITY;

-- No policies = no access for anon/authenticated. Only service_role (bypasses RLS) can touch it.
-- This is intentional: all reads/writes go through server functions/routes using the admin client.