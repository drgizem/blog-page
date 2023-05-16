import { Container, Row,Col } from "react-bootstrap"
import books from "../books.png"
import Image from "next/image"
import styles from '@/styles/Home.module.sass'

export const Intro=()=>{

  return (
    <>
    <Container className={styles.intro}>
      <Row className="pt-5 px-4">
        <Col>
        <h1>Hello,<br></br>Welcome to my blog</h1>
        <p>Don't miss out on the latest news about Fashion, Travel, Food guide...</p>
        </Col>
        <Col>
        <Image src={books} alt="intro" className={styles.bookimg}/>
        </Col>
      </Row>
    </Container>
    </>
  )
}