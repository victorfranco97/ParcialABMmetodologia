import { useEffect, useState } from 'react';
import { Col, Container, ListGroup, Nav, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getInstrumentosXIdFecth } from './FuncionesApi';
import { Navigation } from './Navigation';
import Instrumento from './Instrumento';

export const DetalleInstrumento = () =>{

    const {idInstrumento} = useParams();
    const[Instrumento, setInstrumento] = useState<Instrumento>();
    //let InstrumentoId:number =0;
    const getInstrumento = async () => {

        let InstrumentoSelect:Instrumento = await getInstrumentosXIdFecth(Number(idInstrumento));
        setInstrumento(InstrumentoSelect);
    }
    useEffect(()=>{
        getInstrumento();
    
}, []);
    return(
        <>
           <Navigation></Navigation>
        <Container>
                <Row> 
                <Col><br/><img alt="Instrumento" className="minAltoImg" src={"http://localhost:3000/images/"+Instrumento?.imagen}  /></Col>
                    <Col>
                        <Row>
                            <Col><h1>{Instrumento?.instrumento}</h1></Col>
                        </Row>
                        <Row>
                            <Col>Precio: <h2>${Instrumento?.precio}</h2></Col>
                        </Row>
                        <Row>
                            <Col>Marca: <h2>{Instrumento?.marca}</h2></Col>
                        </Row>
                        <Row>
                            <Col>Modelo: <h2>{Instrumento?.modelo}</h2></Col>
                        </Row>
                        <Row>
                            <Col>Costo de Envio: <h2>{Instrumento?.costoEnvio}</h2></Col>
                        </Row>
                        <Row>
                            <Col>Unidades Vendidas: <h2>{Instrumento?.cantidadVendida}</h2></Col>
                        </Row>
                        <Row>
                            <Col>Descripcion: <h2>{Instrumento?.descripcion}</h2></Col>
                        </Row>
                    </Col>
                </Row>
                
                <Row>
                    <Col><Nav.Link href="/"><h3>Volver</h3></Nav.Link></Col>
                </Row>                
                </Container>
        </>
    )
}