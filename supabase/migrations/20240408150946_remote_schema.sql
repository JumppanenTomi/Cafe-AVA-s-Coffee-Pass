drop policy "Enable all access if the user has the owner role" on "public"."stamp_logs";

drop policy "Enable read access for users based on user id" on "public"."stamp_logs";

drop policy "Enable read access for users based on user id" on "public"."temp_codes";

drop policy "Allow users that have the owner role all access to user_roles t" on "public"."user_roles";

revoke delete on table "public"."test" from "anon";

revoke insert on table "public"."test" from "anon";

revoke references on table "public"."test" from "anon";

revoke select on table "public"."test" from "anon";

revoke trigger on table "public"."test" from "anon";

revoke truncate on table "public"."test" from "anon";

revoke update on table "public"."test" from "anon";

revoke delete on table "public"."test" from "authenticated";

revoke insert on table "public"."test" from "authenticated";

revoke references on table "public"."test" from "authenticated";

revoke select on table "public"."test" from "authenticated";

revoke trigger on table "public"."test" from "authenticated";

revoke truncate on table "public"."test" from "authenticated";

revoke update on table "public"."test" from "authenticated";

revoke delete on table "public"."test" from "service_role";

revoke insert on table "public"."test" from "service_role";

revoke references on table "public"."test" from "service_role";

revoke select on table "public"."test" from "service_role";

revoke trigger on table "public"."test" from "service_role";

revoke truncate on table "public"."test" from "service_role";

revoke update on table "public"."test" from "service_role";

alter table "public"."test" drop constraint "test_pkey";

drop index if exists "public"."test_pkey";

drop table "public"."test";

alter table "public"."stamp_logs" enable row level security;

alter table "public"."user_roles" enable row level security;

alter table "public"."voucher_logs" enable row level security;

alter table "public"."vouchers" enable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 IMMUTABLE
AS $function$
  declare
    claims jsonb;
    user_role public.app_role;
  begin
    -- Check if the user is marked as admin in the profiles table
    select role into user_role from public.user_roles where user_id = (event->>'user_id')::uuid;

    claims := event->'claims';

    if user_role is not null then
      -- Set the claim
      claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    else
      claims := jsonb_set(claims, '{user_role}', 'null');
    end if;

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);

    -- Return the modified or original event
    return event;
  end;
$function$
;

create policy "Enable access to everything if the user has the owner or barist"
on "public"."stamp_logs"
as permissive
for all
to authenticated
using (((auth.jwt() ->> 'user_role'::text) = ANY (ARRAY['owner'::text, 'barista'::text])));


create policy "Enable read access for users with a matching user id"
on "public"."stamp_logs"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "Allow users that have the owner or barista role all access to u"
on "public"."user_roles"
as restrictive
for all
to authenticated
using (((auth.jwt() ->> 'user_role'::text) = ANY (ARRAY['owner'::text, 'barista'::text])))
with check (((auth.jwt() ->> 'user_role'::text) = ANY (ARRAY['owner'::text, 'barista'::text])));


create policy "Enable access to everything for users with the owner or barista"
on "public"."voucher_logs"
as permissive
for all
to authenticated
using (((auth.jwt() ->> 'user_role'::text) = ANY (ARRAY['owner'::text, 'barista'::text])))
with check (((auth.jwt() ->> 'user_role'::text) = ANY (ARRAY['owner'::text, 'barista'::text])));


create policy "Enable read access to all authenticated users"
on "public"."voucher_logs"
as permissive
for select
to authenticated
using (true);


create policy "Allow users with the owner or barista role access to everything"
on "public"."vouchers"
as permissive
for all
to authenticated
using (((auth.jwt() ->> 'user_role'::text) = ANY (ARRAY['owner'::text, 'barista'::text])))
with check (((auth.jwt() ->> 'user_role'::text) = ANY (ARRAY['owner'::text, 'barista'::text])));



