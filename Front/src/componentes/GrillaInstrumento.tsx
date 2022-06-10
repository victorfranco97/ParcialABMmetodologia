import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { DetalleInstrumento } from './DetalleInstrumento';
import { getInstrumentosJSONFetch, deleteInstrumentoXId } from './FuncionesApi';
import { ItemInstrumento }  from './ItemInstrumento';
import { Navigation } from './Navigation';
import Instrumento from './Instrumento';


export const GrillaInstrumento = () => {
    
    const [Instrumento, setInstrumento] = useState<Instrumento[]>([]);
      
      const getInstrumento = async () => {
        let datos:Instrumento[] = await getInstrumentosJSONFetch();
        setInstrumento(datos);
      }
  
      useEffect(() => {
        getInstrumento();
      }, []);


      const deleteInstrumento = async (idInstrumento:number) => {
        await deleteInstrumentoXId(idInstrumento);
        window.location.reload();
      }

      return(
         <>
            <Navigation></Navigation>
          <Container fluid="md">
            <br/>
            <Button href={`/formulario/0`} variant="outline-primary">Nuevo</Button>
            < Row>
                <Col md={1}>
                <b>ID</b>
                </Col>
                <Col md={3}>
                <b>Instrumento</b>
                </Col>
                <Col md={2}>
                <b>Marca</b>
                </Col>
                <Col md={2}>
                <b>Precio</b>
                </Col>
                <Col md={2}>
                <b>Modificar</b>
                </Col>
                <Col md={2}>
                <b>Eliminar</b>
                </Col>
            </Row>
          {Instrumento.map((instrumento:Instrumento) => 
            <Row key={instrumento.id}>
                <Col md={1}>
                {instrumento.id}
                </Col>
                <Col md={3}>
                {instrumento.instrumento}
                </Col>
                <Col md={2}>
                {instrumento.marca}
                </Col>
                <Col md={2}>
                {instrumento.precio}
                </Col>
                <Col md={2}>
                <Button variant="outline-warning" href={`/formulario/` + instrumento.id}>Modificar</Button>
                </Col>
                <Col md={2}>
                <Button variant="outline-danger" onClick={(e) => deleteInstrumento(instrumento.id)}>Eliminar</Button>
                </Col>
            </Row>
               )}
          </Container>
         </>   
    )
}