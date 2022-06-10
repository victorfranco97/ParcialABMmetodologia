
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getInstrumentosJSONFetch, getInstrumentosXBusqueda, getInstrumentoJSON } from './FuncionesApi';
import { ItemInstrumento }  from './ItemInstrumento';
import { Navigation } from './Navigation';
import Instrumento from './Instrumento';


export const Home = () => {
    
  const {termino} = useParams();

  const [instrumento, setInstrumento] = useState<Instrumento[]>([]);
    
    const getInstrumento = async () => {
      console.log("TERMINO" + termino);
      
      if(termino && termino != ""){
        let datos:Instrumento[] = await getInstrumentosXBusqueda(termino);
        setInstrumento(datos);
      }else{
        let datos:Instrumento[] = await getInstrumentosJSONFetch();
        setInstrumento(datos);
      }
    }

    useEffect(() => {
      getInstrumento();
    }, []);

    
      return (
          <>
          <Navigation></Navigation>
            <Container fluid="md" className='principal'>
                <Row>
                  {instrumento.map((instrumento:Instrumento) =>
                    <ItemInstrumento key={instrumento.id} id={instrumento.id} 
                    nombre={instrumento.instrumento} cantidadVendida={instrumento.cantidadVendida}
                    imagen={instrumento.imagen} precio={instrumento.precio}></ItemInstrumento> 
                  )}
                </Row>
            </Container>
          </>
      )
  }
  
  