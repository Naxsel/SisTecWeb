import sun.misc.IOUtils;

import java.io.*;
import java.net.Socket;
import java.util.Scanner;

/**
 * Clase Thread que atiende una peticion al servidor
 */
public class Worker implements Runnable {

    Socket clientSocket; // el socket asignado
    int puerto; // puerto del servidor
    String home; // ruta del servidor

    /*
    * constructor
    *
    * @param[in] s		socket asignado
    * @param[in] p		puerto de escucha del servidor
    */
    public Worker (Socket s, int p, String h) {
        clientSocket = s;
        puerto = p;
        home = h;
    }

    public void run() {

        try {
            // Entrada y Salida
            OutputStream salHaciaCliente = clientSocket.getOutputStream();
            InputStream peticion = clientSocket.getInputStream();

            // Instanciar BlockingHTTPParser y asociarle el InputStream
            BlockingHTTPParser parser = new BlockingHTTPParser();
            parser.parseRequest(peticion);


            while (!(parser.isComplete() || parser.failed())) {}

            byte [] salida;

            if (parser.failed()) { // (--> NOTAR PRIORIDAD ENTRE ERRORES!!)
                // BAD REQUEST
                salHaciaCliente.write(Response.mensajeError(1));
            } else {
                if (parser.getMethod().equals("GET")) {
                    gestionGET(parser.getPath(), home, salHaciaCliente);
                } else {
                    // NOT IMPLEMENTED
                    salHaciaCliente.write(Response.mensajeError(2));
                }
            }

            // Al cerrar cualquier canal de comunicación
            // usado por un socket, el socket se cierra.
            // Para asegurarse que se envían las respuestas que
            // están en el buffer cerramos el OutputStream.
            salHaciaCliente.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Metodo que prepara la respuesta del servidor, trantando el mensaje sea correcto o de error
     * Se trabaja de forma que los clientes no pueden acceder ni conocer directorios raiz.
     * @param ruta
     * @param home
     * @return
     */
    public static void gestionGET(String ruta, String home, OutputStream salHaciaCliente) {
        byte [] salida;

		/* No aceptaria esto: "/./estoy_en_el_directorio_correcto.txt"
		 * Ruta correcta
		 */
        try {
            if (!ruta.contains("./") && !ruta.contains("../")) {
                File fichero = new File(home + ruta);
                if (fichero.isFile()) {		/*Existe y es una fichero */

                    if (fichero.canRead()) { /*Existe y se puede leer */
                        salHaciaCliente.write(Response.salidaFichero(fichero));
                    } else {
                        salHaciaCliente.write(Response.mensajeError(3));	/*Forbidden */
                    }
                } else {
                    salHaciaCliente.write(Response.mensajeError(4));	/*Not found */
                }
            } else {
                salHaciaCliente.write(Response.mensajeError(3));	/*Forbidden*/
            }
        }catch (IOException e) {
            e.printStackTrace();
        }
    }

}
