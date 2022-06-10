/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.controllers;

import com.example.demo.entities.Instrumento;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class InstrumentoController {
    
    @RequestMapping(value = "prueba")
    public String prueba(){
        return "PRUEBA SPRING BOOT";
    } 
    
    @GetMapping("prueba2")
    public String prueba2(){
        return "PRUEBA 2 SPRING BOOT";
    } 
    
    String urlConexion = "jdbc:mysql://localhost:3306/api";
    String usuario = "root";
    String clave = "mysql";
    
    @GetMapping("api/instrumentos")
    public List<Instrumento> getInstrumentosDataBaseJSON(){
        System.out.println("getInstrumentosDataBaseJSON");
        return getInstrumentosDataBase();
    }
    
    @RequestMapping(value = "api/getInstrumentosDataBase")
    public List<Instrumento> getInstrumentosDataBase(){
    
        ResultSet rs = null;
        List<Instrumento> instrumentos = new ArrayList<Instrumento>();
        
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conexion = DriverManager.getConnection(urlConexion, usuario, clave);

            Statement s = conexion.createStatement();

            // Se realiza la consulta. Los resultados se guardan en el
            // ResultSet rs
            rs = s.executeQuery("select * from instrumentos");
            while (rs.next()) {
                Instrumento instrumento = new Instrumento();
                instrumento.setId(Integer.parseInt(rs.getString("id")));
                instrumento.setInstrumento(rs.getString("instrumento"));
                instrumento.setImagen(rs.getString("imagen"));
                instrumento.setPrecio(rs.getString("precio"));
                instrumento.setMarca(rs.getString("marca"));
                instrumento.setModelo(rs.getString("modelo"));
                instrumento.setCostoEnvio(rs.getString("costoEnvio"));
                instrumento.setCantidadVendida(rs.getString("cantidadVendida"));
                instrumento.setDescripcion(rs.getString("descripcion"));
                instrumentos.add(instrumento);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return instrumentos;

    
    } 
    
    @GetMapping("api/instrumentoxid/{id}")
    public Instrumento getInstrumentoDataBaseXIdJSON(@PathVariable String id){
        return getInstrumentoDataBaseXId(Long.parseLong(id));
    }
    
    public Instrumento getInstrumentoDataBaseXId(long idInstrumento){
    
        ResultSet rs = null;
        Instrumento instrumento = new Instrumento();
            
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conexion = DriverManager.getConnection(urlConexion, usuario, clave);

            Statement s = conexion.createStatement();

            // Se realiza la consulta. Los resultados se guardan en el
            // ResultSet rs
            rs = s.executeQuery("SELECT * from instrumento WHERE id = " + idInstrumento);
            while (rs.next()) {
                instrumento.setId(Integer.parseInt(rs.getString("id")));
                instrumento.setInstrumento(rs.getString("instrumento"));
                instrumento.setImagen(rs.getString("imagen"));
                instrumento.setPrecio(rs.getString("precio"));
                instrumento.setCantidadVendida(rs.getString("cantidadVendida"));
            }
            
//            rs = s.executeQuery("SELECT * FROM plato_ingrediente AS pin INNER JOIN ingrediente i ON pin.idingrediente = i.id " +
//                                "WHERE pin.idplato = " + idInstrumento);
//            while (rs.next()) {
//                IngredienteCantidad ingCant = new IngredienteCantidad();
//                ingCant.setIdIngrediente(Long.parseLong(rs.getString("idingrediente")));
//                ingCant.setCantidad(rs.getDouble("cantidad"));
//                ingCant.setNombre(rs.getString("nombre"));
//                ingCant.setUnidadMedida(rs.getString("unidadMedida"));
//                plato.addIngrediente(ingCant);
//            }
//            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return instrumento;
    }
    
    
    public List<Instrumento> getInstrumentoDataBaseXTermino(String termino){
    
        ResultSet rs = null;
        List<Instrumento> instrumentos = new ArrayList<Instrumento>();
            
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conexion = DriverManager.getConnection(urlConexion, usuario, clave);

            Statement s = conexion.createStatement();

            // Se realiza la consulta. Los resultados se guardan en el
            // ResultSet rs
            rs = s.executeQuery("SELECT * from instrumento WHERE nombre LIKE '%" + termino + "%'");
            while (rs.next()) {
                Instrumento instrumento = new Instrumento();
                instrumento.setId(Integer.parseInt(rs.getString("id")));
                instrumento.setInstrumento(rs.getString("instrumento"));
                instrumento.setImagen(rs.getString("imagen"));
                instrumento.setPrecio(rs.getString("precio"));
                instrumento.setCantidadVendida(rs.getString("cantidadVendida"));
                instrumentos.add(instrumento);
            }
            
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return instrumentos;
    }
    
   
    public Instrumento insertarInstrumento(Instrumento instrumento) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conexion = DriverManager.getConnection(urlConexion, usuario, clave);
            PreparedStatement ps = conexion.prepareStatement("INSERT INTO instrumentos(instrumento, imagen, precio, cantidadVendida) VALUES (?, ?, ?, ?)");

            // Se establecen los parámetros y se ejecuta la sentencia.
            ps.setString(1, instrumento.getInstrumento());
            ps.setString(2, instrumento.getImagen());
            ps.setString(3, instrumento.getPrecio());
            ps.setString(4, instrumento.getCantidadVendida());
            
            int affectedRows = ps.executeUpdate();
            if (affectedRows == 0) {
                    throw new SQLException("No se pudo guardar");
            }
            //recupero el ultimo id
            ResultSet generatedKeys = ps.getGeneratedKeys();
            long idGenerado = 0;
            if (generatedKeys.next()) {
                idGenerado = generatedKeys.getLong(1);
            }
            return this.getInstrumentoDataBaseXId(idGenerado);
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }

    }

    
    public Instrumento actualizarInstrumento(Instrumento instrumento) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conexion = DriverManager.getConnection(urlConexion, usuario, clave);
            PreparedStatement ps = conexion.prepareStatement("UPDATE instrumentos SET instrumento = ?, imagen = ?, precio = ?, cantidadVendida = ? WHERE id = ?");
            ps.setString(1, instrumento.getInstrumento());
            ps.setString(2, instrumento.getImagen());
            ps.setString(3, instrumento.getPrecio());
            ps.setString(4, instrumento.getCantidadVendida());
            ps.setLong(5, instrumento.getId());
            ps.executeUpdate();
            
            return this.getInstrumentoDataBaseXId(instrumento.getId());

        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }
     
    
    public void eliminarInstrumento(Long InstumentoId) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conexion = DriverManager.getConnection(urlConexion, usuario, clave);
            Statement st = conexion.createStatement();
            String sql = "DELETE FROM instrumentos WHERE id = " + InstumentoId;
            int delete = st.executeUpdate(sql);

            if (delete == 1) {
                System.out.println("instrumento Borrado");
            } else {
                System.out.println("instrumento no Borrado");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    
    
    
    
}
