export type EnquirySource = "contact" | "events" | "banquet" | "stay";

export type EnquiryField =
  | "name"
  | "email"
  | "phone"
  | "message"
  | "eventType"
  | "eventDate"
  | "guests";

export type EnquiryFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<EnquiryField, string>>;
};

export const initialEnquiryState: EnquiryFormState = { status: "idle", message: "" };