import React, { useEffect, useCallback, useState, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { Card, ListGroup, ListGroupItem, Modal, Spinner } from 'react-bootstrap'
import './style.css'

const Details = () => {
  const params = useParams()
  const history = useHistory()
  if (!params?.id) {
    history.push('/home')
  }

  const [id] = useState(params?.id)
  const [detail, setDetail] = useState([])
  const [show, setShow ] = useState(false)
  const [description, setDescription] = useState('')
  const refModal = useRef()

  const getDetail = useCallback(async () => {
    const reply = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    setDetail(reply.data.drinks[0])
  }, [id])

  useEffect(() => {
    getDetail()
  }, [getDetail])

  const handleShowModal = async () => {
    setShow(true)
    const reply = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${1}`)
    setDescription(reply?.data?.ingredients[0]?.strDescription)
  }

  const handleCloseModal = () => {
    setDescription('')
    setShow(false)
  }

  return (
    <div className="content">
      <Card className="card-custom">
          {detail.strDrink ? (
            <Card.Img className="card-custom-img" variant="top" src={detail.strDrinkThumb} />
          ) : (
            <Spinner className="spinner-custom" animation="border" variant="light" />
          )}
        <Card.Body>
          <Card.Title className="card-custom-title">{detail.strDrink}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="card-custom-item">
            ID: {detail.idDrink}
          </ListGroupItem>
          <ListGroupItem className="card-custom-item">
            CATEGORIA: {detail.strCategory}
          </ListGroupItem>
          <ListGroupItem className="card-custom-item">
            ALCOHOLICA: {detail.strAlcoholic}
          </ListGroupItem>
          <ListGroupItem className="card-custom-item">
            VASO EN QUE SE SIRVE: {detail.strGlass}
          </ListGroupItem>
          <ListGroupItem className="card-custom-item">
            INSTRUCCIONES: {detail.strInstructions}
          </ListGroupItem>
          <ListGroupItem className="card-custom-item pointer" onClick={handleShowModal}>
            HASTA 4 INGREDIENTES CON SUS MEDIDAS: {`${detail.strIngredient1} / ${detail.strMeasure1}` }
          </ListGroupItem>
          <ListGroupItem className="card-custom-item">
            ULTIMA FECHA DE MODIFICACION: {detail.dateModified}
          </ListGroupItem>
        </ListGroup>
      </Card>
      {}
      <Modal
        show={show}
        onHide={handleCloseModal}
        ref={refModal}
        animation
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Descripción de ingrediente</Modal.Title>
        </Modal.Header>
        <Modal.Body>{description || <Spinner className="spinner-custom" animation="grow" variant="dark" />}</Modal.Body>
      </Modal>
    </div>
  )
}

export default Details