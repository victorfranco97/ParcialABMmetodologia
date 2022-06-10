import { useState } from 'react';
import { Button, Card, Col, Container, Nav, Row } from 'react-bootstrap';

type InstrumentoParams = {
    id:number;
    nombre: string;
    imagen: string;
    precio: number;
    cantidadVendida:string;
}

export const ItemInstrumento = (args : InstrumentoParams) => {

    return (
        <>
            <Card style={{ width: '18rem' }} className="margenesTarjeta"> 
            <Card.Img variant="top" className="maxAltoImg" src={"http://localhost:3000/images/"+args.imagen.toLowerCase()} />
            <Card.Body>
                <></>
                <Card.Title>{args.nombre}</Card.Title>
                <Card.Text>
                Precio = ${args.precio}
                </Card.Text>
                <Card.Text>
                Cantidad de unidades vendidas = {args.cantidadVendida}
                </Card.Text>
                <Button href={`detalle/${args.id}`} variant="primary">Detalle</Button>
            </Card.Body>
            </Card>
        </>
    )
}