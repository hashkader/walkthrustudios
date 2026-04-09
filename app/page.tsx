import Nav from '@/components/layout/Nav'
import Hero from '@/components/sections/Hero'
import Intro from '@/components/sections/Intro'
import Services from '@/components/sections/Services'
import Showcase from '@/components/sections/Showcase'
import Process from '@/components/sections/Process'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Step inside before you arrive. Premium 360° virtual tours for luxury real estate in Johannesburg.',
  alternates: {
    canonical: 'https://www.walkthrustudios.co.za',
  },
}

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
