import { Nav } from "react-bootstrap"
import Link from "next/link"
import styles from '@/styles/Home.module.sass'

export const SubNav=()=>{

  return (
    <>
    <Nav className={styles.subnav}>
      <Nav.Item><Link href="/topics/1">Fashion</Link></Nav.Item>
      <Nav.Item><Link href="/topics/4">Travel</Link></Nav.Item>
      <Nav.Item><Link href="/topics/9">Food & Cooking</Link></Nav.Item>
      <Nav.Item><Link href="/topics/10">Lifestyles</Link></Nav.Item>
      <Nav.Item><Link href="/topics/2">Health and Fitness</Link></Nav.Item>
    </Nav>
    <hr/>
    </>
  )
}