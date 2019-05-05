/* global Stomp */

var prue;

var popo = (function () {

    var stompClient = null;
    var m = null;
    var jugador = null;

    var verdad = false;

    var nombreUsuario = null;
    var sala = null;

    var salalis = false;

    var solucion = 1;
    var connect = function (topic) {
        //alert("que votastomp : "+topic);
        var socket = new SockJS('/gs-guide-websocket');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            setConnected(true);
            console.log('Connected: ' + frame);

            stompClient.subscribe('/topic/greetings' + topic, function (evenbody) {
                showGreeting(JSON.parse(evenbody.body).content);
            });

            stompClient.subscribe('/topic/cart' + topic, function (evenbody) {
                limpiar();
                var t = JSON.parse(evenbody.body);
                m = t.dato;
                mostrar(m, t.pos);
                mostrarParejas();
                //limpiar();
                console.log(evenbody.body);
            });
            stompClient.subscribe('/topic/parejas' + topic, function (evenbody) {

                limpiar();
                //alert("Cuales sin las parejas: "+evenbody.body);
                var t = JSON.parse(evenbody.body);
                console.log(evenbody.body);
                allPar(t);
                limpiar();
                sendPuntaje();
                //alert(parAcert);  
            });
            stompClient.subscribe('/topic/uplevel' + topic, function (evenbody) {
                //alert("sIOOOO");
                //RECORDAR SUBIRLE EL ID A LA SALA
                preguntas.mudanza();
                //var temp = document.getElementById("playerr").innerHTML;                
                var sal = document.getElementById("levelGame").innerHTML;
                //alert("que arrjoa: " + sal);
                var tro = parseInt(sal, 10);

                preguntas.get2Nivel(preguntas.getPreguntas);

                necart(pu, tro + 1);
                res();
            });

            stompClient.subscribe('/topic/result' + topic, function (evenbody) {
                goToResult();


            });
        }, function (error) {
            alert(error);

        });

    }
    function sendPuntaje() {

        var jugador = document.getElementById("playerr").innerHTML;
        axios.post('/jugadores/puntaje/' + jugador + '/' + parAcert())
                .then(function (response) {
                    console.log(response.data);
                    //alert(salalis);
                });
    }

    function senf() {
        return m;

    }

    function goSendResult() {
        sala = document.getElementById("idSala").innerHTML;
        var t = parseInt(sala, 10);
        //alert("enviamos sala : "+t);
        stompClient.send("/app/result." + t, {}, JSON.stringify());
    }

    function goToResult() {

        var temp = document.getElementById("playerr").innerHTML;

        pagina = "/resultados.html";
        pagina += "?";
        nomVec = temp.split(",");
        pagina += "=" + temp;
        location.href = pagina;



    }

    function sendName() {
        stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
        pasarVariables();
    }

    function dt(nickName, sala) {
        return{
            nickName: nickName,
            sala: sala
        }
    }

    function sendUpLevel(op, ppl) {
        document.getElementById('levelGame').innerHTML = op;
        //alert("Actulizando nivel, ahora es : " + op);
        sala = document.getElementById("idSala").innerHTML;
        //alert("EL JUGADOR ESS:1 "+ppl);
        var playe = ppl;
        //alert("EL JUGADOR ESS:2 "+playe);
        var t = parseInt(sala, 10);
        var f = dt(ppl, t);
        //alert("enviamos sala : "+f.nickName);        
        //alert("enviamos sala : "+f.sala);   
        //stompClient.send("/app/level." + t, {}, JSON.stringify(t));
        stompClient.send("/app/level." + t, {}, JSON.stringify(f));
    }





    function sendCart(ct, ctp) {
        var n = document.getElementById("idSala").innerHTML;
        //alert("carga n: "+n);
        stompClient.send("/app/cart." + n, {}, JSON.stringify(ctp));
    }

    function pasarVariables() {

        var temp = $("#name").val();
        pagina = "AnteSala.html";
        pagina += "?";
        nomVec = temp.split(",");
        pagina += "=" + temp;
        location.href = pagina;
    }
    function showGreeting(message) {
        $("#greetings").append("<tr><td>" + message + "</td></tr>");
    }

    function disconnect() {
        if (stompClient !== null) {
            stompClient.disconnect();
        }
        setConnected(false);
        console.log("Disconnected");
    }

    function setConnected(connected) {
        $("#connect").prop("disabled", connected);
        $("#disconnect").prop("disabled", !connected);
        if (connected) {
            $("#conversation").show();
        } else {
            $("#conversation").hide();
        }
        $("#greetings").html("");
    }

    function showGreeting(message) {
        $("#greetings").append("<tr><td>" + message + "</td></tr>");
    }

    function getLisSalaAxios() {
        sala = document.getElementById("idSala").innerHTML;
        axios.get('/jugadores/sala/listo/' + sala)
                .then(function (response) {
                    salalis = response.data;
                    //alert(salalis);
                });
    }

    var reload = function () {
        var t = 0;
        var cono = 0;
        while (!verdad & cono < 2) {
            loadd();
            cono += 1;
        }
        if (verdad) {
            if (t < 1) {
                t = 1;
                alert("Usted es el anfritrion no tiene porque revisar");
            }
        } else {//EN esta parte se verifica hasta que la sala este activa
            if (!verdad) { //while (!salalis) {//Aqui es donde esperan 3 segundos
                var cronometro;
                contador_s = 0;
                cronometro = setInterval(
                        function () {
                            contador_s++;
                            getLisSalaAxios();
                            if (salalis) {
                                alert("Empiece a jugar");
                                clearInterval(cronometro);
                                popo.pr(popo.conec);
                                solucion = 5;
                            }
                        }, 3000);
            }
        }
    }

    var loadd = function () {

        nombreUsuario = document.getElementById("playerr").innerHTML;
        var nom = nombreUsuario.replace("=", "");
        //alert("que dice la player"+nom);
        sala = document.getElementById("idSala").innerHTML;

        axios.get('/jugadores/playAnfi/' + sala + '/' + nom)
                .then(function (response) {
                    verdad = response.data;
                    console.log('saved successfully')
                });

        return verdad;
    }

    var load = function () {
        var salal = document.getElementById("idSala").innerHTML;
        if (verdad) {
            stompClient.send("/app/avisar." + salal, {}, "");
            location.href = "/Juego.html";
        } else {
            alert("Debes ser el anfrition para iniciar la partida");
        }
    }

    return {
        dt: dt,
        goSendResult: goSendResult,
        reload: reload,
        loadd: loadd,
        setConnected: setConnected,
        sendName: sendName,
        pasarVariables: pasarVariables,
        showGreeting: showGreeting,
        disconnect: disconnect,
        showGreeting: showGreeting,
        sendCart: sendCart,
        senf: senf,
        sendUpLevel: sendUpLevel,
        init: function () {

            connect('');
        },
        cone: function () {
            connect('');
        },
        conec: function () {
            connect('');            
            id = document.getElementById("idSala").value;
            //alert("id que es: "+id);
            //stompClient.send("/app/iniciar", {}, "");

        },
        conecS(dat) {
            //Proximamene, para conectar a una sala especifica
            //alert("que es data: "+dat);
            connect(dat);
        },
        pr: function () {
            var qw = loadd();
            var salal = document.getElementById("idSala").innerHTML;
            if (qw) {
                stompClient.send("/app/avisar." + salal, {}, "");
                temp = document.getElementById("playerr").innerHTML;
                pagina = "/Juego.html";
                pagina += "?";
                nomVec = temp.split(",");
                pagina += "=" + temp;
                location.href = pagina;
                stompClient.send("/app/iniciar", {}, "");
            } else if (solucion > 2) {
                temp = document.getElementById("playerr").innerHTML;
                pagina = "/Juego.html";
                pagina += "?";
                nomVec = temp.split(",");
                pagina += "=" + temp;
                location.href = pagina;
                //stompClient.send("/app/iniciar", {}, "");
            } else {
                alert("Debes ser el anfrition para iniciar la partida");
            }
        },
        can: function () {
            reload();
        }
    };
})();


$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#connect").click(function () {
        popo.conec();
    });
    $("#disconnect").click(function () {
        disconnect();
    });
    $("#send").click(function () {
        popo.sendName();
    });
});