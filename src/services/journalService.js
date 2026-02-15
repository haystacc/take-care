import supabase from "@/utils/supabase";

export async function upsertJournalEntry({ user_id, entry_date, mood, content }) {
  const payload = { user_id, entry_date };

  if (mood !== undefined) payload.mood = mood;
  if (content !== undefined) payload.content = content;

  const { data, error } = await supabase
    .from("journal_entries")
    .upsert(payload, { onConflict: "user_id,entry_date" })
    .select()
    .single();

  if (error) return { 
    success: false, error
  };
  return { success: true, data };
}

export async function getJournalEntryForDate(user_id, entry_date) {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", user_id)
    .eq("entry_date", entry_date)
    .maybeSingle();
  
  if (error) return { 
    success: false, error
  };
  return { success: true, data };
}