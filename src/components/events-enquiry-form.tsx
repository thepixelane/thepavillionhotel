"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import {
  initialEnquiryState,
  submitEnquiry,
  type EnquiryFormState,
} from "@/app/actions/submit-enquiry";

const EVENT_TYPES = [
  "Wedding / Event",
  "Corporate Meeting",
  "Private Dinner",
  "General Enquiry",
];

function SubmitButton() {
  const { pending } = useFormStatus();
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
  const [state, formAction] = useActionState<EnquiryFormState, FormData>(
    submitEnquiry,
    initialEnquiryState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const [renderedAt] = useState<number>(() => Date.now());

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      statusRef.current?.focus();
    }
  }, [state.status]);

  const fieldErrors = useMemo(() => state.fieldErrors ?? {}, [state.fieldErrors]);

  return (
    <form ref={formRef} action={formAction} noValidate className="grid gap-3 sm:grid-cols-2">
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
          name="name"
          required
          autoComplete="name"
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "events-name-error" : undefined}
          className="rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none placeholder:text-offwhite/40 focus:border-gold"
          placeholder="Full name"
        />
        <FieldError id="events-name-error" message={fieldErrors.name} />
      </div>

      <div className="grid gap-1">
        <label htmlFor="events-phone" className="sr-only">
          Phone
        </label>
        <input
          id="events-phone"
          name="phone"
          inputMode="tel"
          autoComplete="tel"
          aria-invalid={Boolean(fieldErrors.phone)}
          aria-describedby={fieldErrors.phone ? "events-phone-error" : undefined}
          className="rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none placeholder:text-offwhite/40 focus:border-gold"
          placeholder="Phone"
        />
        <FieldError id="events-phone-error" message={fieldErrors.phone} />
      </div>

      <div className="grid gap-1 sm:col-span-2">
        <label htmlFor="events-email" className="sr-only">
          Email
        </label>
        <input
          id="events-email"
          type="email"
          name="email"
          autoComplete="email"
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "events-email-error" : undefined}
          className="rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none placeholder:text-offwhite/40 focus:border-gold"
          placeholder="Email"
        />
        <FieldError id="events-email-error" message={fieldErrors.email} />
      </div>

      <div className="relative sm:col-span-2">
        <label htmlFor="events-type" className="sr-only">
          Event type
        </label>
        <select
          id="events-type"
          name="eventType"
          defaultValue={EVENT_TYPES[0]}
          className="w-full appearance-none rounded-2xl border border-offwhite/20 bg-white/10 px-4 py-3 pr-11 text-sm text-offwhite outline-none transition focus:border-gold focus:bg-white/15"
        >
          {EVENT_TYPES.map((option) => (
            <option key={option} value={option} className="bg-forest-deep text-offwhite">
              {option}
            </option>
          ))}
        </select>
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
          name="message"
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "events-message-error" : undefined}
          className="min-h-24 rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none placeholder:text-offwhite/40 focus:border-gold sm:min-h-28"
          placeholder="Share your date, capacity, and requirements"
        />
        <FieldError id="events-message-error" message={fieldErrors.message} />
      </div>

      <SubmitButton />
    </form>
  );
}
