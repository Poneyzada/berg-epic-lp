import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Seminars } from './components/sections/Seminars'
import { SmartFilter } from './components/SmartFilter'
import { FreeArea } from './components/sections/FreeArea'
import { CourseShowcase } from './components/sections/Courses'

export function App() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Global Texture Overlay */}
      <div className="magazine-overlay" />
      
      <Hero />
      <SmartFilter />
      <section id="courses">
        <CourseShowcase />
      </section>
      <section id="free">
        <FreeArea />
      </section>
      <section id="seminars">
        <Seminars />
      </section>
      
      {/* Footer / Coming Soon */}
      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
          <div className="adidas-stripes scale-150">
            <div />
            <div className="w-12" />
            <div />
          </div>
          <h2 className="text-3xl opacity-20 uppercase tracking-[0.5em]">Pereira Academy</h2>
          <p className="text-xs text-white/40 uppercase tracking-widest">© 2024 Berg Pereira. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  )
}

