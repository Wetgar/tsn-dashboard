import { sbFetch } from "@/lib/supabase";

type Task = {
  id: number;
  title: string;
  status: string | null;
  due_date: string | null;
  assignee: string | null;
};

export default async function Home() {
  const tasks = await sbFetch<Task>("tasks");

  const today = new Date().toISOString().slice(0, 10);
  const total = tasks.length;
  const overdue = tasks.filter(
    (t) => t.status !== "Готово" && t.due_date && t.due_date < today
  ).length;
  const todayCount = tasks.filter((t) => t.due_date === today).length;
  const inProgress = tasks.filter((t) => t.status === "В работе").length;
  const done = tasks.filter((t) => t.status === "Готово").length;

  const cards = [
    { label: "Всего задач", value: total, color: "border-blue-500" },
    { label: "Просрочено", value: overdue, color: "border-red-500" },
    { label: "На сегодня", value: todayCount, color: "border-amber-500" },
    { label: "В работе", value: inProgress, color: "border-yellow-400" },
    { label: "Готово", value: done, color: "border-green-500" },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        📊 Общая картина
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((c) => (
          <div
            key={c.label}
            className={`bg-white rounded-xl shadow-sm border-l-4 ${c.color} p-5`}
          >
            <div className="text-xs uppercase tracking-wide text-slate-500">
              {c.label}
            </div>
            <div className="text-3xl font-bold mt-2">{c.value}</div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🕒 Ближайшие задачи
      </h2>

      <div className="space-y-2">
        {tasks.slice(0, 10).map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
          >
            <div>
              <div className="font-medium">{t.title}</div>
              <div className="text-xs text-slate-500 mt-1">
                {t.due_date ? `Срок: ${t.due_date}` : "Без срока"}
                {t.assignee ? ` · ${t.assignee}` : ""}
              </div>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                t.status === "Готово"
                  ? "bg-green-100 text-green-700"
                  : t.status === "В работе"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {t.status || "Не начато"}
            </span>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-slate-500 text-sm">
            Задач пока нет. Проверь подключение к Supabase.
          </div>
        )}
      </div>
    </div>
  );
}
