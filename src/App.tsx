import { Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { Home } from './pages/Home'
import { CaseStudy } from './pages/CaseStudy'
import { NotFound } from './pages/NotFound'

export function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
