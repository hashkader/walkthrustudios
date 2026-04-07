import Nav from '@/components/layout/Nav'
import Hero from '@/components/sections/Hero'
import Intro from '@/components/sections/Intro'
import Services from '@/components/sections/Services'
import Showcase from '@/components/sections/Showcase'
import Process from '@/components/sections/Process'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Services />
        {/* <Showcase /> */}
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
