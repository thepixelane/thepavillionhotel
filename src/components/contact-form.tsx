"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  submitEnquiry,
} from "@/app/actions/submit-enquiry";
import { contactEnquirySchema, type ContactEnquiryValues } from "@/lib/enquiry-schema";
import { initialEnquiryState, type EnquiryFormState } from "@/lib/enquiry-state";

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-offwhite transition hover:bg-fresh disabled:cursor-not-allowed disabled:opacity-60 dark:bg-fresh dark:text-forest-deep"
    >
      {pending ? "Sending…" : "Submit Enquiry"}
    </button>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs text-terracotta dark:text-beige">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<EnquiryFormState, FormData>(
    submitEnquiry,
    initialEnquiryState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);
  const [renderedAt] = useState<number>(() => Date.now());
  const {
    register,
    handleSubmit,
    formState: { errors: clientErrors },
  } = useForm<ContactEnquiryValues>({
    resolver: zodResolver(contactEnquirySchema),
    mode: "onBlur",
  });

  const submitValidatedForm = () => {
    if (formRef.current) formAction(new FormData(formRef.current));
  };

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      successRef.current?.focus();
    }
  }, [state.status]);

  const fieldErrors = useMemo(() => state.fieldErrors ?? {}, [state.fieldErrors]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(submitValidatedForm)}
      noValidate
      className="rounded-3xl border border-line bg-surface-2 p-5 shadow-[0_18px_50px_rgba(20,38,30,0.06)] sm:p-7"
    >
      <h2 className="text-2xl text-fg sm:text-3xl">Send an Enquiry</h2>
      <p className="mt-3 text-sm leading-7 text-fg-muted">
        Tell us your dates or requirements and we&rsquo;ll respond shortly.
      </p>

      <input type="hidden" name="source" value="contact" />
      <input type="hidden" name="rendered_at" value={renderedAt} />
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-hp">Leave this field empty</label>
        <input
          id="contact-hp"
          type="text"
          name="hp_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.status !== "idle" && state.message ? (
        <p
          ref={successRef}
          role="status"
          tabIndex={-1}
          className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
            state.status === "success"
              ? "border-emerald/30 bg-emerald/10 text-emerald dark:text-fresh"
              : "border-terracotta/30 bg-terracotta/10 text-terracotta dark:text-beige"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
        <div className="grid gap-1">
          <label htmlFor="contact-name" className="sr-only">
            Full name
          </label>
          <input
            id="contact-name"
            {...register("name")}
            required
            maxLength={120}
            autoComplete="name"
            aria-invalid={Boolean(clientErrors.name || fieldErrors.name)}
            aria-describedby={clientErrors.name || fieldErrors.name ? "contact-name-error" : undefined}
            className="rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-fg outline-none ring-0 transition placeholder:text-fg-muted focus:border-gold"
            placeholder="Full name"
          />
          <FieldError id="contact-name-error" message={clientErrors.name?.message || fieldErrors.name} />
        </div>
        <div className="grid gap-1">
          <label htmlFor="contact-phone" className="sr-only">
            Phone
          </label>
          <input
            id="contact-phone"
            {...register("phone")}
            inputMode="tel"
            required
            maxLength={40}
            autoComplete="tel"
            aria-invalid={Boolean(clientErrors.phone || fieldErrors.phone)}
            aria-describedby={clientErrors.phone || fieldErrors.phone ? "contact-phone-error" : undefined}
            className="rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-fg outline-none ring-0 transition placeholder:text-fg-muted focus:border-gold"
            placeholder="Phone"
          />
          <FieldError id="contact-phone-error" message={clientErrors.phone?.message || fieldErrors.phone} />
        </div>
        <div className="grid gap-1 sm:col-span-2">
          <label htmlFor="contact-email" className="sr-only">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            {...register("email")}
            required
            maxLength={254}
            autoComplete="email"
            aria-invalid={Boolean(clientErrors.email || fieldErrors.email)}
            aria-describedby={clientErrors.email || fieldErrors.email ? "contact-email-error" : undefined}
            className="rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-fg outline-none ring-0 transition placeholder:text-fg-muted focus:border-gold"
            placeholder="Email"
          />
          <FieldError id="contact-email-error" message={clientErrors.email?.message || fieldErrors.email} />
        </div>
        <div className="grid gap-1 sm:col-span-2">
          <label htmlFor="contact-message" className="sr-only">
            Message
          </label>
          <textarea
            id="contact-message"
            {...register("message")}
            required
            maxLength={4000}
            aria-invalid={Boolean(clientErrors.message || fieldErrors.message)}
            aria-describedby={clientErrors.message || fieldErrors.message ? "contact-message-error" : undefined}
            className="min-h-24 rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-fg outline-none ring-0 transition placeholder:text-fg-muted focus:border-gold sm:min-h-32"
            placeholder="Tell us more about your plans"
          />
          <FieldError id="contact-message-error" message={clientErrors.message?.message || fieldErrors.message} />
        </div>
      </div>

      <SubmitButton pending={isPending} />
      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.28em] text-fg-muted">
        We&rsquo;ll never share your details.
      </p>
    </form>
  );
}
