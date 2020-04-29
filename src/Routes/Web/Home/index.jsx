import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Pagination, Table, Alert, Form } from 'react-bootstrap'
import axios from 'axios'

import './style.css'

const Home = () => {

  const [items, setItems] = useState([])
  const [active, setActive] = useState(1)
  const [value, setValue] = useState('a')
  const [pagination, setPagination] = useState([])
  const [paginationBy, setPaginationBy] = useState(10)
  const [show, setShow] = useState(false)
  const [typeAlert, setTypeAlert] = useState('')
  const [descriptionAlert, setDescriptionAlert] = useState('')
  const history = useHistory()

  const getItems = useCallback(async () => {
    if (navigator.onLine) {
      let reply = null
      if (value) {
        reply = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`)
        if (!reply.data.drinks || reply.data.drinks.length === 0) {
          showAlert('Not fount data !', 'warning')
          return
        } else {
          const pag = (reply.data.drinks.length / paginationBy)
          setItems(reply.data.drinks)
          const list = []
          let i = list.length
          while (pag > i) {
            i += 1
            list.push(<Pagination.Item key={i} active={i === active}>{i}</Pagination.Item>)
          }
          setPagination(list)
        }
      } else {
        showAlert('Input not should is empty', 'danger')
        return
      }

    } else {
      showAlert("You haven't connection to internet, try newly most afternoon.", 'danger')
    }
  }, [value, active, paginationBy])

  useEffect(() => {
    getItems()
  }, [getItems])

  useEffect(() => {
    if (show) setTimeout(() => setShow(false), 1500)
  }, [show])

  const handleChangePagina = (e) => {
    if (e.target.text) {
      setActive(Number(e.target.text))
    }
  }

  const handleInputChange = (e, fn, key) => {
    const { value } = e.target
    if (e.key === 'Enter') {
      fn(value)
    }
  }

  const showAlert = (description, type) => {
    setShow(true)
    setDescriptionAlert(description)
    setTypeAlert(type)
  }

  const handleRedirectDetail = (e, id) => {
    history.push(`/details/${id}`)
  }

  let listItems = []
  if (items.length > 0) {
    let x = items.filter((item, i) => {
      const limit = active * paginationBy
      const min = (active * paginationBy) - paginationBy
      if (min <= i && i < limit) return item
      return false
    })

    listItems = x.map(({ idDrink, strDrink, strCategory }) => (
      <tr key={idDrink}>
        <td onClick={e => handleRedirectDetail(e, idDrink)}>{idDrink}</td>
        <td onClick={e => handleRedirectDetail(e, idDrink)}>{strDrink}</td>
        <td>{strCategory}</td>
      </tr>
    ))
  }

  return (
    <div className='container mt-4'>
      <h1 className='text-primary mb-3'>Listado de Cocteles</h1>
      <div className="form-custom">
        <Form.Group>
          <Form.Label>Paginar por : </Form.Label>
          <Form.Control type="number" onKeyPress={e => handleInputChange(e, setPaginationBy)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Buscar : </Form.Label>
          <Form.Control type="text" onKeyPress={e => handleInputChange(e, setValue)} />
        </Form.Group>
      </div>
      <Table responsive="sm md" >
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {listItems}
        </tbody>
      </Table>
      <Pagination onClick={handleChangePagina} >{pagination}</Pagination>
      {show && (
        <Alert variant={typeAlert}>
          {descriptionAlert}
        </Alert>
      )}
    </div>
  );
}


export default Home