import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container,Table,Button,Form} from 'react-bootstrap'
import axios from 'axios'

class App extends React.Component{

  constructor(props){
    super(props)
    this.state = (
      {
        tareas : [],
        descripcion:'',
        estado:'pendiente',
        id:0,
        pos:null,
      }
    )
    this.cambioDescripcion = this.cambioDescripcion.bind(this)
    this.guardar = this.guardar.bind(this)
    this.mostrar = this.mostrar.bind(this)
  }

  componentDidMount(){
    console.log("cargando tareas...")
    axios.get('http://localhost:5000/tarea')
    .then(res=>{
      console.log(res.data)
      this.setState({
        tareas : res.data.content
      })
    })
  }

  cambioDescripcion(e){
    this.setState({
      descripcion : e.target.value
    })
  }

  mostrar(cod,index){
    axios.get('http://localhost:5000/tarea/'+cod)
    .then(res=>{
      console.log(res.data.content)
      this.setState({
        descripcion:res.data.content.descripcion,
        id:res.data.content.id,
        pos:index
      })
    })
  }

  guardar(e){
    e.preventDefault()
    let cod = this.state.id
    const data = {
      descripcion : this.state.descripcion,
      estado : this.state.estado
    }
    console.log("enviando data al servidor :",data)
    
    if(cod>0){
      //actualizar
      axios.put('http://localhost:5000/tarea/'+cod,data)
      .then(res=>{
        let index_tarea = this.state.pos
        this.state.tareas[index_tarea] = res.data.content
        var temp = this.state.tareas
        this.setState({
          tareas : temp,
          descripcion:'',
          pos:null,
          id:0
        })
      })
    }
    else{
      //insertar
      axios.post('http://localhost:5000/tarea',data)
      .then(res=>{
        console.log("respuesta del servidor :",res.data.content)
        this.state.tareas.push(res.data.content)
        var temp = this.state.tareas
        this.setState({
          tareas :temp,
          descripcion:''
        })
      })
    }
    
  }

  render(){
    return(
      <div>
        <Container>
          <h1>Lista de Tareas</h1>
          <Form onSubmit={this.guardar}>
            <Form.Group className="mb-3">
              <Form.Control type="text" value={this.state.descripcion}
              onChange={this.cambioDescripcion}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Id</th>
                <th>Descripcion</th>
                <th>Estado</th>
                <th>...</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tareas.map((tarea,index)=>{
                return(
                  <tr key={tarea.id}>
                    <td>{tarea.id}</td>
                    <td>{tarea.descripcion}</td>
                    <td>{tarea.estado}</td>
                    <td>
                      <Button variant="success" onClick={()=>this.mostrar(tarea.id,index)}>
                        Editar
                      </Button>
                    </td>
                  </tr>
                )
              })}
              
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
}

export default App
