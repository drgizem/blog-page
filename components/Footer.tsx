import { Container, Row,Col } from "react-bootstrap"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import styles from '@/styles/Home.module.sass'
import Link from "next/link";

export const Footer=()=>{


  return (
    <Container>
      <Row className={styles.footer}>
        <Col>
        <h4>About</h4><hr/>
        <p>Frontend developer</p>
        <p>Blog page creater</p>
        </Col>
        <Col>
        <h4>Contact</h4><hr/>
        <p>drgizemakpinar@gmail.com</p>
        <p>Wilmington, NC 28412</p>
        </Col>
        <Col>
        <h4>Follow me</h4><hr/>
        <div>
          <Link className="text-dark" href="https://github.com/drgizem"><GitHubIcon/></Link>
          <Link className="text-dark" href="https://www.linkedin.com/in/gizem-akpinar/"><LinkedInIcon/></Link>
        </div>
        </Col>
      </Row>
    </Container>
  )
}