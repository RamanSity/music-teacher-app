import { createClient } from "@supabase/supabase-js";

// هاي القيم آمنة تماماً تكون بالكود الظاهر — مصممة خصيصاً للاستخدام العلني بالمتصفح.
// الحماية الحقيقية موجودة بقواعد قاعدة البيانات (Row Level Security) وليس بإخفاء هالقيم.
const supabaseUrl = "https://nidxmkktimzzkdjdhtbd.supabase.co";
const supabaseKey = "sb_publishable_9abWPOF-yuVOU0kHRJRiBQ_cEYe50GC";

export const supabase = createClient(supabaseUrl, supabaseKey);
