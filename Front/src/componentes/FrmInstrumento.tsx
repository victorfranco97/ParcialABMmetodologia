import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getInstrumentosXIdFecth, saveInstrumento } from './FuncionesApi';
import { Navigation } from './Navigation';
import Instrumento from './Instrumento';


export const FrmInstrumento = () => {

    const navigate = useNavigate();

    const {idinstrumento} = useParams();
    const [instrumento, setInstrumento] = useState<Instrumento>(new Instrumento());
    
   
    const getInstrumento = async () => {
        if(Number(idinstrumento) !== 0){
            let instrumentoSelect:Instrumento = await getInstrumentosXIdFecth(Number(idinstrumento));
            setInstrumento(instrumentoSelect);
        }else{
            let instrumentoSelect:Instrumento = new Instrumento();
            setInstrumento(instrumentoSelect);
        }
    }


    useEffect(() => {
        getInstrumento();
    }, []);

    const save = async () => {
        console.log(instrumento.instrumento);
        await saveInstrumento(instrumento);
        navigate('/grilla'); 
      }
    
    return (
        <>
        <Navigation></Navigation>
        <div className="center">
        <Form className="form-control">
            <Form.Group className="mb-3" controlId="formBasicNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="Text" placeholder="Ingrese el nombre del instrumento" defaultValue={instrumento?.instrumento} onChange={e => instrumento.instrumento = String(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrecio">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="Text" placeholder="Ingrese el precio" defaultValue={instrumento?.precio} onChange={e => instrumento.precio = Number(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRubro">
                <Form.Label>Marca</Form.Label>
                <Form.Control type="Text" placeholder="Ingrese la marca del instrumento" defaultValue={instrumento?.marca} onChange={e => instrumento.marca = String(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRubro">
                <Form.Label>Modelo</Form.Label>
                <Form.Control type="Text" placeholder="Ingrese el modelo del instrumento" defaultValue={instrumento?.modelo} onChange={e => instrumento.modelo = String(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImagenPath">
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="Text" placeholder="Ingrese la dir de la imagen" defaultValue={instrumento?.imagen} onChange={e => instrumento.imagen = String(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRubro">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control type="Text" placeholder="Ingrese la descripcion del instrumento" defaultValue={instrumento?.descripcion} onChange={e => instrumento.descripcion = String(e.target.value)}/>
            </Form.Group>
            <br/>
            
            <br/><br/>
            <Button onClick={save}  variant="primary" type="button">
                Guardar
            </Button>
        </Form>
        </div>
        </>
    )
}