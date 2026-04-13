export const inquiryTypes = [
  "Partnership",
  "Tryouts",
  "Talent",
  "Media",
  "General"
] as const;

export type InquiryType = (typeof inquiryTypes)[number];

export type ContactPayload = {
  name: string;
  email: string;
  organization?: string;
  inquiryType: InquiryType;
  message: string;
  socials?: string;
};

export function sanitizeContactPayload(input: Record<string, unknown>): ContactPayload {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const organization =
    typeof input.organization === "string" ? input.organization.trim() : undefined;
  const inquiryType =
    typeof input.inquiryType === "string" && inquiryTypes.includes(input.inquiryType as InquiryType)
      ? (input.inquiryType as InquiryType)
      : "General";
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const socials = typeof input.socials === "string" ? input.socials.trim() : undefined;

  if (name.length < 2) {
    throw new Error("Name must be at least 2 characters.");
  }

  if (name.length > 80) {
    throw new Error("Name must be under 80 characters.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("A valid email is required.");
  }

  if (message.length < 20) {
    throw new Error("Message must be at least 20 characters.");
  }

  if (message.length > 2500) {
    throw new Error("Message must be under 2500 characters.");
  }

  if (organization && organization.length > 120) {
    throw new Error("Organization must be under 120 characters.");
  }

  if (socials && socials.length > 160) {
    throw new Error("Socials must be under 160 characters.");
  }

  return {
    name,
    email,
    organization,
    inquiryType,
    message,
    socials
  };
}
