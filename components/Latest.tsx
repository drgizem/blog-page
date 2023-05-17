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
      <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/blog-9afc2.appspot.com/o/04m9NUtALQe8ByyaSoE4961xcDq2%2Fposts%2F039a2a8a-550c-4238-8a8a-4c0534c84c3c?alt=media&token=a9fd4b5f-11cc-43b0-98e8-9e54586cc248" />
      <Card.Body className={styles.latestcardbody}>
        <Card.Title>Karl Lagerfeld: A Fashion Icon and Creative Visionary</Card.Title>
        <Card.Text>
        Karl Lagerfeld, the renowned fashion designer and creative force, left an indelible mark on the world of fashion and design during his illustrious career.
        </Card.Text>
        <Link href="/topics/1?subtopic=4ed48679-9786-4e2b-8c18-34d569769d12}"><Button className={styles.latestbtn} variant="primary">Go this post</Button></Link>
      </Card.Body>
    </Card>
          </Col>
          <Col>
          <Card style={{ width: '15rem' }} className={styles.latestcard}>
      <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/blog-9afc2.appspot.com/o/8gk9n36jSFRAQugteXAYPLpcBfJ3%2Fposts%2F7566257c-1b33-40f7-825b-d372750d2062?alt=media&token=6c22f1b3-5138-4a48-ba45-7592ae97492d" />
      <Card.Body className={styles.latestcardbody}>
        <Card.Title>The Vibrant Choice: Exploring the Significance of Orange in the New York Knicks' Color Palette</Card.Title>
        <Card.Text>
        The New York Knicks, one of the most iconic teams in the National Basketball Association (NBA), proudly don the colors of orange and blue.
        </Card.Text>
        <Link href="/topics/5?subtopic=e49f0df4-b543-40e1-9983-b895cbcfb9fc}"><Button className={styles.latestbtn} variant="primary">Go this post</Button></Link>
      </Card.Body>
    </Card>
          </Col>
          <Col>
          <Card style={{ width: '15rem' }} className={styles.latestcard}>
      <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/blog-9afc2.appspot.com/o/04m9NUtALQe8ByyaSoE4961xcDq2%2Fposts%2F82766b78-299a-46e5-9aeb-07fced7cfbd1?alt=media&token=d9a561c2-8da3-4b20-aa96-79102e31f96a" />
      <Card.Body className={styles.latestcardbody}>
        <Card.Title>Embracing Yoga: Unlocking the Advantages of a Mind-Body Practice</Card.Title>
        <Card.Text>
        Yoga, an ancient practice originating in India, has gained tremendous popularity worldwide as a means to foster physical, mental, and spiritual well-being.
        </Card.Text>
        <Link href="/topics/10?subtopic=dee567f8-05ed-4df3-89e7-c92533a43410}"><Button className={styles.latestbtn} variant="primary">Go this post</Button></Link>
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