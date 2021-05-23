import React from "react"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Video = ({ videoUrl, ...props }) => (
  <Row className="justify-content-center my-2">
    <Col lg={6}>
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          className="embed-responsive-item"
          src={videoUrl}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameBorder='0'
          rel='0'
          height='400'
          width='800'
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen
        />
      </div>
    </Col>
  </Row>
)
export default Video;