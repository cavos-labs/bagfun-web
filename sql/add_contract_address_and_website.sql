-- Add contract_address and website columns to token table
ALTER TABLE public.token 
ADD COLUMN contract_address text,
ADD COLUMN website text;

-- Add index for faster lookups by contract address
CREATE INDEX idx_token_contract_address ON public.token (contract_address);

-- Add comments for documentation
COMMENT ON COLUMN public.token.contract_address IS 'The blockchain contract address of the deployed token';
COMMENT ON COLUMN public.token.website IS 'Optional website URL for the token project';