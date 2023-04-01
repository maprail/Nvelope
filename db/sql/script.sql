-- Database: portfolio_budget

-- DROP DATABASE IF EXISTS portfolio_budget;

CREATE DATABASE portfolio_budget
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

 -- DROP any EXISTing tables   
DROP TABLE IF EXISTS public.envelopes;
DROP TABLE IF EXISTS public.categories;

-- Table: public.categories
DROP TABLE IF EXISTS public.envelopes;
DROP TABLE IF EXISTS public.categories;

CREATE TABLE IF NOT EXISTS public.categories
(
    name character varying COLLATE pg_catalog."default" NOT NULL,
    percentage double precision NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.categories
    OWNER to postgres;

-- Table: public.envelopes



CREATE TABLE IF NOT EXISTS public.envelopes
(
    name character varying COLLATE pg_catalog."default" NOT NULL,
    percentage double precision NOT NULL,
    budget double precision DEFAULT '0.0',
    CONSTRAINT envelopes_pkey PRIMARY KEY (name),
    CONSTRAINT envelopes_name_fkey FOREIGN KEY (name)
        REFERENCES public.categories (name) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.envelopes
    OWNER to postgres;