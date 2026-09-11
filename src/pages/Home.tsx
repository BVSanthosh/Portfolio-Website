import { useEffect } from 'react'
import { Hero } from '../sections/Hero'
import { About } from '../sections/About'
import { Work } from '../sections/Work'
import { Evaluation } from '../sections/Evaluation'
import { Experience } from '../sections/Experience'
import { Stack } from '../sections/Stack'
import { Contact } from '../sections/Contact'
import { profile } from '../content/profile'

export function Home() {
  useEffect(() => {
    document.title = `${profile.name} — ${profile.role}`
  }, [])

  return (
    <>
      <Hero />
      <About />
      <Work />
      <Evaluation />
      <Experience />
      <Stack />
      <Contact />
    </>
  )
}
