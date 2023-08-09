import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container,Table,Button,Form} from 'react-bootstrap'
import axios from 'axios'

class App extends React.Component{
  render(){
    return(
      <div>
        <Container>
          <h1>Lista de Tareas</h1>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Id</th>
                <th>Descripcion</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Tarea uno</td>
                <td>Pendiente</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
}

export default App
