"use client";

import { useActionState, useState } from "react";
import { saveItem, type FormState } from "@/app/admin/actions";
import type { Field } from "@/lib/admin/sections";
import { iconNames, icons } from "@/lib/icons";

type Props = {
  sectionKey: string;
  id: string | null;
  fields: Field[];
  item: Record<string, unknown>;
};

export default function ItemForm({ sectionKey, id, fields, item }: Props) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveItem.bind(null, sectionKey, id), {});

  return (
    <form action={action} className="admin-form">
      {fields.map((field) => (
        <FieldInput key={field.name} field={field} value={item[field.name]} />
      ))}
      {state.error && <p className="form-status error">{state.error}</p>}
      <button type="submit" className="btn" disabled={pending}>
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}

function FieldInput({ field, value }: { field: Field; value: unknown }) {
  const id = `f-${field.name}`;
  const hint = field.hint && (
    <small id={`${id}-hint`} className="admin-hint">
      {field.hint}
    </small>
  );
  const describedBy = field.hint ? `${id}-hint` : undefined;
  const text = typeof value === "string" ? value : "";

  switch (field.kind) {
    case "textarea":
      return (
        <div className="form-group">
          <label htmlFor={id}>{field.label}</label>
          <textarea id={id} name={field.name} defaultValue={text} aria-describedby={describedBy} />
          {hint}
        </div>
      );
    case "list":
      return (
        <div className="form-group">
          <label htmlFor={id}>{field.label}</label>
          <input id={id} name={field.name} defaultValue={Array.isArray(value) ? value.join(", ") : ""} aria-describedby={describedBy} />
          {hint}
        </div>
      );
    case "checkbox":
      return (
        <div className="form-group admin-check">
          <input id={id} name={field.name} type="checkbox" defaultChecked={value === true} />
          <label htmlFor={id}>{field.label}</label>
          {hint}
        </div>
      );
    case "icon":
      return <IconPicker field={field} value={text} />;
    case "image":
      return <ImageInput field={field} value={text} />;
    default:
      return (
        <div className="form-group">
          <label htmlFor={id}>{field.label}</label>
          <input id={id} name={field.name} defaultValue={text} required={field.required} aria-describedby={describedBy} />
          {hint}
        </div>
      );
  }
}

function IconPicker({ field, value }: { field: Field; value: string }) {
  const [selected, setSelected] = useState(value || "FaStar");

  return (
    <fieldset className="form-group">
      <legend>{field.label}</legend>
      <div className="icon-grid">
        {iconNames.map((name) => {
          const Icon = icons[name];
          return (
            <label key={name} className={`icon-option${selected === name ? " selected" : ""}`} title={name.slice(2)}>
              <input
                type="radio"
                name={field.name}
                value={name}
                checked={selected === name}
                onChange={() => setSelected(name)}
              />
              <Icon aria-hidden="true" />
              <span className="sr-only">{name.slice(2)}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function ImageInput({ field, value }: { field: Field; value: string }) {
  const [preview, setPreview] = useState(value);
  const id = `f-${field.name}`;

  return (
    <div className="form-group">
      <label htmlFor={id}>{field.label}</label>
      <input type="hidden" name={field.name} value={value} />
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element -- local blob previews aren't supported by next/image
        <img src={preview} alt="" className="admin-image-preview" />
      )}
      <input
        id={id}
        name={`${field.name}_file`}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          setPreview(file ? URL.createObjectURL(file) : value);
        }}
      />
      {value && (
        <label className="admin-check admin-inline">
          <input type="checkbox" name={`${field.name}_remove`} /> Remove current image
        </label>
      )}
      <small className="admin-hint">PNG, JPG or WebP, under 4 MB.</small>
    </div>
  );
}
