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
  message: "",
  website: ""
};

export function ContactForm({ enabled }: ContactFormProps) {
  const [formState, setFormState] = useState(initialState);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: enabled
      ? "Submissions route to the backend inquiry pipeline."
      : "Submission storage is offline in this environment. Use the direct contact channels instead."
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof typeof initialState>(key: K, value: (typeof initialState)[K]) {
    setFormState((current) => ({ ...current, [key]: value }));
  }

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
    <form className="rad-form" onSubmit={handleSubmit} noValidate>
      <div className="rad-form__grid">
        <label className="rad-field">
          <span className="rad-field__label">Name</span>
          <input
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your full name"
            required
            minLength={2}
            maxLength={80}
            className="rad-field__input"
            autoComplete="name"
          />
        </label>

        <label className="rad-field">
          <span className="rad-field__label">Email</span>
          <input
            type="email"
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="name@example.com"
            required
            className="rad-field__input"
            autoComplete="email"
          />
        </label>

        <label className="rad-field">
          <span className="rad-field__label">Organization</span>
          <input
            value={formState.organization}
            onChange={(event) => updateField("organization", event.target.value)}
            placeholder="Brand, team, or company"
            maxLength={120}
            className="rad-field__input"
            autoComplete="organization"
          />
        </label>

        <label className="rad-field">
          <span className="rad-field__label">Inquiry type</span>
          <select
            value={formState.inquiryType}
            onChange={(event) => updateField("inquiryType", event.target.value as InquiryType)}
            className="rad-field__input"
          >
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="rad-field rad-field--hidden" aria-hidden="true">
        <span className="rad-field__label">Website</span>
        <input
          tabIndex={-1}
          autoComplete="off"
          value={formState.website}
          onChange={(event) => updateField("website", event.target.value)}
          className="rad-field__input"
        />
      </label>

      <label className="rad-field">
        <span className="rad-field__label">Socials or Discord</span>
        <input
          value={formState.socials}
          onChange={(event) => updateField("socials", event.target.value)}
          placeholder="@handle, Discord username, or campaign deck link"
          maxLength={160}
          className="rad-field__input"
        />
      </label>

      <label className="rad-field">
        <span className="rad-field__label">Message</span>
        <textarea
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Tell RAD what you're looking for, what you need, and the best next step."
          required
          minLength={20}
          maxLength={2500}
          rows={7}
          className="rad-field__input rad-field__input--textarea"
        />
      </label>

      <div className="rad-form__actions">
        <p className={`rad-form__status rad-form__status--${status.type}`} aria-live="polite">
          {status.message}
        </p>
        <button className="rad-button" type="submit" disabled={!enabled || isSubmitting}>
          {isSubmitting ? "Submitting..." : "Send Inquiry"}
        </button>
      </div>
    </form>
  );
}
