"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  submitEnquiry,
} from "@/app/actions/submit-enquiry";
import { EVENT_TYPES, eventsEnquirySchema, type EventsEnquiryValues } from "@/lib/enquiry-schema";
import { initialEnquiryState, type EnquiryFormState } from "@/lib/enquiry-state";

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex rounded-full bg-offwhite px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-forest-deep transition hover:bg-gold hover:text-offwhite disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
    >
      {pending ? "Sending…" : "Enquire Now"}
    </button>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs text-beige">
      {message}
    </p>
  );
}

export function EventsEnquiryForm() {
  const [state, formAction, isPending] = useActionState<EnquiryFormState, FormData>(
    submitEnquiry,
    initialEnquiryState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const [renderedAt] = useState<number>(() => Date.now());
  const {
    register,
    handleSubmit,
    formState: { errors: clientErrors },
  } = useForm<EventsEnquiryValues>({
    resolver: zodResolver(eventsEnquirySchema),
    mode: "onBlur",
  });

  const submitValidatedForm = () => {
    if (formRef.current) formAction(new FormData(formRef.current));
  };

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      statusRef.current?.focus();
    }
  }, [state.status]);

  const fieldErrors = useMemo(() => state.fieldErrors ?? {}, [state.fieldErrors]);

  return (
    <form ref={formRef} onSubmit={handleSubmit(submitValidatedForm)} noValidate className="grid gap-3 sm:grid-cols-2">
      <input type="hidden" name="source" value="events" />
      <input type="hidden" name="rendered_at" value={renderedAt} />
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="events-hp">Leave this field empty</label>
        <input id="events-hp" type="text" name="hp_website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status !== "idle" ? (
        <p
          ref={statusRef}
          role="status"
          tabIndex={-1}
          className={`rounded-2xl border px-4 py-3 text-sm sm:col-span-2 ${
            state.status === "success"
              ? "border-fresh/40 bg-fresh/10 text-fresh"
              : "border-beige/40 bg-beige/10 text-beige"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-1">
        <label htmlFor="events-name" className="sr-only">
          Full name
        </label>
        <input
          id="events-name"
          {...register("name")}
          required
          maxLength={120}
          autoComplete="name"
          aria-invalid={Boolean(clientErrors.name || fieldErrors.name)}
          aria-describedby={clientErrors.name || fieldErrors.name ? "events-name-error" : undefined}
          className="rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none placeholder:text-offwhite/40 focus:border-gold"
          placeholder="Full name"
        />
        <FieldError id="events-name-error" message={clientErrors.name?.message || fieldErrors.name} />
      </div>

      <div className="grid gap-1">
        <label htmlFor="events-phone" className="sr-only">
          Phone
        </label>
        <input
          id="events-phone"
          {...register("phone")}
          inputMode="tel"
          required
          maxLength={40}
          autoComplete="tel"
          aria-invalid={Boolean(clientErrors.phone || fieldErrors.phone)}
          aria-describedby={clientErrors.phone || fieldErrors.phone ? "events-phone-error" : undefined}
          className="rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none placeholder:text-offwhite/40 focus:border-gold"
          placeholder="Phone"
        />
        <FieldError id="events-phone-error" message={clientErrors.phone?.message || fieldErrors.phone} />
      </div>

      <div className="grid gap-1 sm:col-span-2">
        <label htmlFor="events-email" className="sr-only">
          Email
        </label>
        <input
          id="events-email"
          type="email"
          {...register("email")}
          required
          maxLength={254}
          autoComplete="email"
          aria-invalid={Boolean(clientErrors.email || fieldErrors.email)}
          aria-describedby={clientErrors.email || fieldErrors.email ? "events-email-error" : undefined}
          className="rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none placeholder:text-offwhite/40 focus:border-gold"
          placeholder="Email"
        />
        <FieldError id="events-email-error" message={clientErrors.email?.message || fieldErrors.email} />
      </div>

      <div className="relative sm:col-span-2">
        <label htmlFor="events-type" className="sr-only">
          Event type
        </label>
        <select
          id="events-type"
          {...register("eventType")}
          required
          defaultValue={EVENT_TYPES[0]}
          className="w-full appearance-none rounded-2xl border border-offwhite/20 bg-white/10 px-4 py-3 pr-11 text-sm text-offwhite outline-none transition focus:border-gold focus:bg-white/15"
        >
          {EVENT_TYPES.map((option) => (
            <option key={option} value={option} className="bg-forest-deep text-offwhite">
              {option}
            </option>
          ))}
        </select>
        <FieldError id="events-type-error" message={clientErrors.eventType?.message || fieldErrors.eventType} />
        <span className="pointer-events-none absolute inset-y-0 right-4 grid place-items-center text-gold/85">
          ▾
        </span>
      </div>

      <div className="grid gap-1 sm:col-span-2">
        <label htmlFor="events-message" className="sr-only">
          Share your date, capacity, and requirements
        </label>
        <textarea
          id="events-message"
          {...register("message")}
          maxLength={4000}
          aria-invalid={Boolean(clientErrors.message || fieldErrors.message)}
          aria-describedby={clientErrors.message || fieldErrors.message ? "events-message-error" : undefined}
          className="min-h-24 rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none placeholder:text-offwhite/40 focus:border-gold sm:min-h-28"
          placeholder="Share your date, capacity, and requirements"
        />
        <FieldError id="events-message-error" message={clientErrors.message?.message || fieldErrors.message} />
      </div>

      <SubmitButton pending={isPending} />
    </form>
  );
}
