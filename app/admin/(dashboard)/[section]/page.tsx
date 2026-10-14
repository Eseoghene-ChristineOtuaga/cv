import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowDown, FaArrowUp, FaPen, FaPlus } from "react-icons/fa6";
import DeleteButton from "@/components/admin/DeleteButton";
import { requireAdmin } from "@/lib/admin/auth";
import { getSection } from "@/lib/admin/sections";
import { iconFor } from "@/lib/icons";
import { deleteItem, moveItem } from "../../actions";

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section: key } = await params;
  const section = getSection(key);
  if (!section) notFound();

  const { supabase } = await requireAdmin();
  const { data: items, error } = await supabase.from(key).select("*").order("position").order("created_at");
  const hasIcon = section.fields.some((f) => f.kind === "icon");

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>{section.label}</h2>
        <Link href={`/admin/${key}/new`} className="btn">
          <FaPlus aria-hidden="true" /> Add {section.singular}
        </Link>
      </div>

      {error && <p className="form-status error">Couldn&apos;t load {section.label.toLowerCase()}: {error.message}</p>}
      {items?.length === 0 && <p className="admin-muted">Nothing here yet.</p>}

      <ul className="admin-list">
        {items?.map((item, i) => {
          const Icon = hasIcon ? iconFor(item.icon) : null;
          return (
            <li key={item.id} className="admin-row">
              {Icon && (
                <span className="admin-row-icon">
                  <Icon aria-hidden="true" />
                </span>
              )}
              <div className="admin-row-text">
                <strong>{item[section.titleField]}</strong>
                {item.text && <span className="admin-muted">{item.text}</span>}
              </div>
              <div className="admin-row-actions">
                <form action={moveItem.bind(null, key, item.id, -1)}>
                  <button type="submit" className="icon-btn" disabled={i === 0} aria-label="Move up">
                    <FaArrowUp aria-hidden="true" />
                  </button>
                </form>
                <form action={moveItem.bind(null, key, item.id, 1)}>
                  <button type="submit" className="icon-btn" disabled={i === items.length - 1} aria-label="Move down">
                    <FaArrowDown aria-hidden="true" />
                  </button>
                </form>
                <Link href={`/admin/${key}/${item.id}`} className="icon-btn" aria-label={`Edit ${item[section.titleField]}`}>
                  <FaPen aria-hidden="true" />
                </Link>
                <DeleteButton action={deleteItem.bind(null, key, item.id)} name={item[section.titleField]} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
