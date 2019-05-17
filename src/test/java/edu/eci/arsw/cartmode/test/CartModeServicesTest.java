/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.cartmode.test;

import edu.eci.arsw.cartmode.model.Carta;
import edu.eci.arsw.cartmode.model.CartaJavSc;
import edu.eci.arsw.cartmode.model.Jugador;
import edu.eci.arsw.cartmode.model.Pregunta;
import edu.eci.arsw.cartmode.model.Sala;
import edu.eci.arsw.cartmode.services.CartModeException;
import edu.eci.arsw.cartmode.services.CartModeServices;
import java.util.List;
import junit.framework.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 *
 * @author dicom
 */
//@RunWith(SpringRunner.class)
//@SpringBootTest()
public class CartModeServicesTest {

    private List<Jugador> player;
    private List<Pregunta> preguntas;
    private List<Carta> cartas;

    private List<Sala> salas;
    private Integer contador;
    private Jugador temporal;

    private static Boolean verdad;

    @Autowired
    private CartModeServices cat;

    //@Test
    public void nameAllPlayerTest() throws CartModeException {
        cat.eraseAll();
        verdad = false;
        cat.addPlayer("Pepito");
        cat.addPlayer("Maria");
        cat.addPlayer("Juliana");
        cat.addPlayer("Cesar");

        Assert.assertEquals(4, cat.nameAlPlayer().size());
        player = cat.nameAlPlayer();
        for (Jugador re : player) {
            if (re.getNickName().equals("Pepito")) {
                verdad = true;
            }
        }
        Assert.assertTrue(verdad);
    }

    //@Test
    public void GenerateBarajaTest() throws CartModeException {

        List<CartaJavSc> cartas = cat.GenerateBaraja(1);
        List<CartaJavSc> cartas2 = cat.GenerateBaraja(2);
        List<CartaJavSc> cartas3 = cat.GenerateBaraja(3);

        Assert.assertEquals(8, cartas.size());
        Assert.assertEquals(13, cartas2.size());
        Assert.assertEquals(10, cartas3.size());

    }

    //@Test
    public void getSalaBYPlayerTest() throws CartModeException {
        cat.eraseAll();
        cat.addPlayer("Pepito");
        cat.addPlayer("Maria");
        cat.addPlayer("Juliana");
        cat.addPlayer("Cesar");
        cat.addPlayer("Yeny");
        cat.addPlayer("Erick");
        cat.addPlayer("Alejandro");
        cat.addPlayer("Ramiro");
        cat.addPlayer("Leonardo");

        int num = cat.getIdSalaByPlayer(" Pepito");
        int num2 = cat.getIdSalaByPlayer(" Juliana");
        int num3 = cat.getIdSalaByPlayer(" Yeny");
        int num4 = cat.getIdSalaByPlayer(" Leonardo");
        Assert.assertEquals(0, num+1 );
        Assert.assertEquals(0, num2+1 );
        Assert.assertEquals(0, num3+1 );
        Assert.assertEquals(0, num4+1 );

    }

    //@Test
    public void getAllPlayersBySala() throws CartModeException {
        cat.eraseAll();
        cat.addPlayer("Pepito");
        cat.addPlayer("Maria");
        cat.addPlayer("Juliana");
        cat.addPlayer("Cesar");
        cat.addPlayer("Yeny");
        cat.addPlayer("Erick");
        cat.addPlayer("Alejandro");
        cat.addPlayer("Ramiro");
        cat.addPlayer("Leonardo");

        List<String> te1 = cat.getAllPlayersBySala(0);
        List<String> te12 = cat.getAllPlayersBySala(2);
        
        Assert.assertEquals(4, te1.size());
        Assert.assertEquals(1, te12.size());

    }

    //@Test
    public void getPlayerAnfiBySalaTest() throws CartModeException {
        cat.addPlayer("Pepito");
        cat.addPlayer("Maria");
        cat.addPlayer("Juliana");
        cat.addPlayer("Cesar");
        cat.addPlayer("Yeny");
        cat.addPlayer("Erick");
        cat.addPlayer("Alejandro");
        cat.addPlayer("Ramiro");
        cat.addPlayer("Leonardo");

        Jugador player1 = cat.getPlayerAnfiBySala(0);
        Jugador player2 = cat.getPlayerAnfiBySala(1);
        Jugador player3 = cat.getPlayerAnfiBySala(2);

        Assert.assertEquals("Pepito", player1.getNickName());
        Assert.assertEquals("Yeny", player2.getNickName());
        Assert.assertEquals("Leonardo", player3.getNickName());

    }

    //@Test
    public void getListPreguntasTest() throws CartModeException {
        List<Pregunta> pre = cat.getListPreguntas();
        System.out.println("qe muestra :"+pre.size());
        Assert.assertEquals(10, pre.size());

    }

}
