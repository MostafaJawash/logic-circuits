import type { KMapGrid } from "@/lib/chapter-4";

/** ألوان الخانة حسب قيمتها لمطابقة أسلوب الصور على الثيم الداكن */
function cellClass(v: string): string {
  const val = v.toUpperCase();
  if (val === "1") return "bg-accent/15 text-accent ring-1 ring-accent/40";
  if (val === "X") return "bg-purple-500/15 text-purple-300 ring-1 ring-purple-500/30";
  return "bg-card/50 text-slate-400 ring-1 ring-border-soft/50";
}

function Board({ map }: { map: KMapGrid }) {
  return (
    <div className="inline-block">
      {map.title && (
        <p className="mb-2 text-center text-sm font-bold text-accent">{map.title}</p>
      )}
      {/* الاتجاه LTR للحفاظ على ترتيب الخريطة كما في الصورة */}
      <div dir="ltr" className="overflow-x-auto">
        <table className="border-separate border-spacing-1">
          <thead>
            <tr>
              {/* خانة الزاوية: رمز الصفوف \\ رمز الأعمدة */}
              <th className="h-12 w-14 rounded-lg bg-secondary/60">
                <span className="flex flex-col leading-none text-[11px] font-semibold text-muted-2">
                  <span className="self-end pr-1">{map.colHeader}</span>
                  <span className="my-0.5 h-px w-full rotate-[-18deg] bg-muted-2/40" />
                  <span className="self-start pl-1">{map.rowHeader}</span>
                </span>
              </th>
              {map.cols.map((c) => (
                <th
                  key={c}
                  className="h-12 w-14 rounded-lg bg-secondary/60 text-sm font-bold text-white"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {map.rows.map((r, ri) => (
              <tr key={r}>
                <th className="h-14 w-14 rounded-lg bg-secondary/60 text-sm font-bold text-white">
                  {r}
                </th>
                {map.cols.map((c, ci) => (
                  <td
                    key={c}
                    className={`h-14 w-14 rounded-lg text-center align-middle ${cellClass(
                      map.cells[ri][ci],
                    )}`}
                  >
                    <span className="block text-lg font-extrabold leading-none">
                      {map.cells[ri][ci]}
                    </span>
                    <span className="mt-1 block text-[10px] font-medium text-muted-2">
                      {map.nums[ri][ci]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function KMapBoards({ maps }: { maps: KMapGrid[] }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-center gap-6">
      {maps.map((m, i) => (
        <Board key={i} map={m} />
      ))}
    </div>
  );
}
