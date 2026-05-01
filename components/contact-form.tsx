"use client";

import { useState } from "react";

import { inquiryTypes, type InquiryType } from "@/lib/contact";

type ContactFormProps = {
  enabled: boolean;
};

const initialState = {
  name: "",
  email: "",
  organization: "",
  inquiryType: "Partnership" as InquiryType,
  socials: "",
  message: ""
};

export function ContactForm({ enabled }: ContactFormProps) {
  const [formState, setFormState] = useState(initialState);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: enabled
      ? "Inquiries submit to the backend pipeline once Supabase is configured."
      : "Supabase is not configured yet. Use direct contact for now."
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "Submitting inquiry..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });

      const result = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to submit inquiry.");
      }

      setFormState(initialState);
      setStatus({
        type: "success",
        message: result.message ?? "Inquiry submitted successfully."
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to submit inquiry."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Name</span>
          <input
            value={formState.name}
            onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
            placeholder="Your name"
            required
            minLength={2}
            maxLength={80}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            value={formState.email}
            onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
            placeholder="name@example.com"
            required
          />
        </label>
        <label>
          <span>Organization</span>
          <input
            value={formState.organization}
            onChange={(event) =>
              setFormState((current) => ({ ...current, organization: event.target.value }))
            }
            placeholder="Brand, team, or company"
            maxLength={120}
          />
        </label>
        <label>
          <span>Inquiry type</span>
          <select
            value={formState.inquiryType}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                inquiryType: event.target.value as InquiryType
              }))
            }
          >
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        <span>Socials or Discord</span>
        <input
          value={formState.socials}
          onChange={(event) => setFormState((current) => ({ ...current, socials: event.target.value }))}
          placeholder="@handle or discord username"
          maxLength={160}
        />
      </label>
      <label>
        <span>Message</span>
        <textarea
          value={formState.message}
          onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))}
          placeholder="Tell RAD what you're looking for."
          required
          minLength={20}
          maxLength={2500}
          rows={7}
        />
      </label>
      <div className="form-footer">
        <p className={`form-status form-status-${status.type}`}>{status.message}</p>
        <button className="btn btn-primary" type="submit" disabled={!enabled || isSubmitting}>
          {isSubmitting ? "Submitting..." : "Send Inquiry"}
        </button>
      </div>
    </form>
  );
}
