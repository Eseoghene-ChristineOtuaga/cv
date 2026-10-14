// What the admin dashboard can edit. Each section maps to a Supabase table
// (see supabase/schema.sql) and the public pages that show it.

export type FieldKind = "text" | "textarea" | "list" | "icon" | "image" | "checkbox";

export type Field = {
  name: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  /** Empty input is saved as null rather than "". */
  nullable?: boolean;
  hint?: string;
};

export type Section = {
  label: string;
  singular: string;
  titleField: string;
  /** Public pages to refresh after an edit. */
  paths: string[];
  fields: Field[];
};

export const sections = {
  projects: {
    label: "Projects",
    singular: "project",
    titleField: "title",
    paths: ["/projects"],
    fields: [
      { name: "title", label: "Title", kind: "text", required: true },
      { name: "text", label: "Description", kind: "textarea" },
      { name: "tags", label: "Tags", kind: "list", hint: "Separate with commas, e.g. Python, Streamlit" },
      { name: "href", label: "Project link", kind: "text", nullable: true, hint: "Leave empty to show the status badge instead of a button." },
      { name: "status", label: "Status", kind: "text", nullable: true, hint: "Shown when there's no link, e.g. In Progress" },
      { name: "image_url", label: "Image", kind: "image", nullable: true },
      { name: "image_alt", label: "Image description", kind: "text", nullable: true, hint: "Describes the image for screen readers." },
      { name: "cover", label: "Cover text", kind: "text", hint: "Shown on the card when there's no image." },
    ],
  },
  skills: {
    label: "Skills",
    singular: "skill",
    titleField: "title",
    paths: ["/"],
    fields: [
      { name: "title", label: "Title", kind: "text", required: true },
      { name: "icon", label: "Icon", kind: "icon" },
      { name: "text", label: "Description", kind: "textarea" },
      { name: "pills", label: "Tools", kind: "list", hint: "Separate with commas, e.g. Pandas, NumPy, SQL" },
    ],
  },
  interests: {
    label: "Interests",
    singular: "interest",
    titleField: "label",
    paths: ["/"],
    fields: [
      { name: "label", label: "Label", kind: "text", required: true, hint: "Shown under the intro on the home page." },
      { name: "icon", label: "Icon", kind: "icon" },
    ],
  },
  notes: {
    label: "Notes",
    singular: "note",
    titleField: "title",
    paths: ["/notes"],
    fields: [
      { name: "title", label: "Title", kind: "text", required: true },
      { name: "text", label: "Summary", kind: "textarea" },
      { name: "date", label: "Date line", kind: "text", hint: "e.g. Published: September 16th, 2025 or Coming soon" },
      { name: "href", label: "Link", kind: "text", nullable: true, hint: "Leave empty to show Coming Soon." },
      { name: "cover", label: "Cover text", kind: "text" },
    ],
  },
  hobbies: {
    label: "Marshmallows",
    singular: "hobby",
    titleField: "title",
    paths: ["/marshmallows"],
    fields: [
      { name: "title", label: "Title", kind: "text", required: true },
      { name: "icon", label: "Icon", kind: "icon" },
      { name: "text", label: "Description", kind: "textarea" },
      { name: "tags", label: "Tags", kind: "list", hint: "Separate with commas" },
      { name: "special", label: "Pink marshmallow card", kind: "checkbox" },
    ],
  },
} satisfies Record<string, Section>;

export type SectionKey = keyof typeof sections;

export function getSection(key: string): Section | null {
  return Object.hasOwn(sections, key) ? sections[key as SectionKey] : null;
}
