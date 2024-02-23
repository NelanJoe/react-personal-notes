import useLocale from "../hooks/use-locale";

export default function Hero() {
  const { locale } = useLocale();

  return (
    <section className="mb-8 lg:mb-12">
      <div className="p-6 space-y-3 text-white rounded-xl bg-gradient-to-tr from-indigo-500 via-violet-400 to-purple-500">
        <h2 className="text-3xl font-semibold">
          {locale === "id" ? "Catatan Pribadi" : "Personal Notes"}
        </h2>
        <p>
          {locale === "id" ? (
            <>
              Fokus pada hal-hal yang penting dengan fitur-fitur ramping yang
              dirancang untuk mengurangi kekacauan dan meningkatkan
              produktivitas. Kendalikan pikiran, tujuan, dan tugas Anda, dan
              tugas sehari-hari dengan mudah.
            </>
          ) : (
            <>
              Focus on what matters with streamlined features designed to reduce
              clutter and boost productivity. Take control of your thoughts,
              goals, and daily tasks with ease.
            </>
          )}
        </p>
      </div>
    </section>
  );
}
