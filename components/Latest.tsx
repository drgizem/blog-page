import { Col, Container,Row,Card,Button } from "react-bootstrap"
import styles from '@/styles/Home.module.sass'
import Link from "next/link"


export const Latest=()=>{

  return (
    <>
      <Container>
        <Row className="mt-3">
          <p className="text-secondary">Latest Post</p><hr/>
          <Row lg={3}>
          <Col>
          <Card style={{ width: '15rem' }} className={styles.latestcard}>
      <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/blog-9afc2.appspot.com/o/04m9NUtALQe8ByyaSoE4961xcDq2%2Fposts%2Fclover.png85574e85-d350-45e3-979d-3ea862704683?alt=media&token=91b627d1-ed45-4cc3-9937-4a2fc35f850e" />
      <Card.Body>
        <Card.Title>Free</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Link href="/topics/10?subtopic=c9cb9d6e-317c-4cec-8faf-559aa48213f8}"><Button className={styles.latestbtn} variant="primary">Go this post</Button></Link>
      </Card.Body>
    </Card>
          </Col>
          <Col>
          <Card style={{ width: '15rem' }} className={styles.latestcard}>
      <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/blog-9afc2.appspot.com/o/04m9NUtALQe8ByyaSoE4961xcDq2%2Fposts%2Fbootstrapicon.png5bb209de-a30c-41a0-a887-a1cd0cd49d04?alt=media&token=9e819efb-8285-475b-80bf-e1dda1cebbb6" />
      <Card.Body>
        <Card.Title>karl</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Link href="/topics/1?subtopic=73ef8329-9c92-4d9b-9d19-425506db6839}"><Button className={styles.latestbtn} variant="primary">Go this post</Button></Link>
      </Card.Body>
    </Card>
          </Col>
          <Col>
          <Card style={{ width: '15rem' }} className={styles.latestcard}>
      <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/blog-9afc2.appspot.com/o/04m9NUtALQe8ByyaSoE4961xcDq2%2Fposts%2Fclover.png85574e85-d350-45e3-979d-3ea862704683?alt=media&token=91b627d1-ed45-4cc3-9937-4a2fc35f850e" />
      <Card.Body>
        <Card.Title>Free</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button className={styles.latestbtn} variant="primary">Go this post</Button>
      </Card.Body>
    </Card>
          </Col>
          </Row>
        </Row>
        <hr/>
      </Container>
    </>
  )
}