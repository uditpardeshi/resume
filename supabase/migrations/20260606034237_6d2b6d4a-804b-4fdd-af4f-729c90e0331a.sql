ALTER TABLE public.payment_records ADD COLUMN raw_token TEXT;
CREATE INDEX idx_payment_records_raw_token ON public.payment_records(raw_token) WHERE raw_token IS NOT NULL;