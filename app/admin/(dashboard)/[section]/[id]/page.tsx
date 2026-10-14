import Link from "next/link";
import { notFound } from "next/navigation";
import ItemForm from "@/components/admin/ItemForm";
import { requireAdmin } from "@/lib/admin/auth";
import { getSection } from "@/lib/admin/sections";

export default async function EditPage({ params }: { params: Promise<{ section: string; id: string }> }) {
  const { section: key, id } = await params;
  const section = getSection(key);
  if (!section) notFound();

  const { supabase } = await requireAdmin();
  let item: Record<string, unknown> = {};
  if (id !== "new") {
    const { data } = await supabase.from(key).select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    item = data;
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>{id === "new" ? `New ${section.singular}` : `Edit ${section.singular}`}</h2>
        <Link href={`/admin/${key}`} className="btn secondary">
          Back
        </Link>
      </div>
      <ItemForm sectionKey={key} id={id === "new" ? null : id} fields={section.fields} item={item} />
    </div>
  );
}
