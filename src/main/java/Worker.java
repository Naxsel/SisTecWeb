import java.io.*;
import java.net.Socket;

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
            // Instanciar PrintWriter y asociarle el OutputStream
            PrintWriter salHaciaCliente = new PrintWriter(
                    clientSocket.getOutputStream(),
                    true
            );

            // Instanciar BlockingHTTPParser y asociarle el InputStream
            BlockingHTTPParser parser = new BlockingHTTPParser();
            parser.parseRequest(clientSocket.getInputStream());

            while (!(parser.isComplete() || parser.failed())) {}

            String salida = "";

            if (parser.failed()) { // (--> NOTAR PRIORIDAD ENTRE ERRORES!!)
                // BAD REQUEST
                salida = Response.mensajeError(1);
            } else {
                if (parser.getMethod().equals("GET")) {
                    salida = Response.gestionGET(parser.getPath(), home);
                } else {
                    // NOT IMPLEMENTED
                    salida = Response.mensajeError(2);
                }
            }

            // Enviar la respuesta al cliente
            salHaciaCliente.println(salida);

            // Al cerrar cualquier canal de comunicación
            // usado por un socket, el socket se cierra.
            // Para asegurarse que se envían las respuestas que
            // están en el buffer cerramos el OutputStream.
            salHaciaCliente.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
