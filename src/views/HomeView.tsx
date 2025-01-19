import { Header } from "../components/Header"


export const HomeView = () => {
  return (
    <>
      <Header />

      <main className="bg-gray-100 py-10 min-h-screen bg-no-repeat bg-right-top lg:bg-home lg:bg-home-xl">
        <div className="max-w-5xl mx-auto mt-10">
          <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
            <h1 className="text-6xl font-black">
              Todas tus <span className="text-cyan-400">Redes Sociales</span> en un enlace
            </h1>
            <p className="text-slate-800 text-xl">
              Crea tu propia página de enlaces con todas tus redes sociales y compártela con tus seguidores. Comprte tu perfil de Instagram, TikTok, Twitter, Facebook, YouTube y mucho más en un solo lugar.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
