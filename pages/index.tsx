
import { NavbarModal } from "@/components/Navbar"
import { Container } from 'react-bootstrap'
import { SubNav } from '@/components/SubNav'
import { Intro } from '@/components/Intro'
import { Latest } from '@/components/Latest'
import { Footer } from '@/components/Footer'




export default function Home() {

  return (<>
  <Container>
  <NavbarModal />
  <SubNav/>
  <Intro/>
  <Latest/>
  <Footer/>
  </Container>
  </>)
}
