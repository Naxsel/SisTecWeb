import java.io.*;
import java.nio.file.Files;
import java.nio.charset.Charset;

public final class Response {

    private Response() {}

    /**
     *
     * @param fichero
     * @return
     */
    public static byte [] salidaFichero(File fichero) {

        String msg = "HTTP/1.1 200 OK\n"; 	/*Cabecera */
        byte [] salida = new byte[0];
        byte [] cabecera;
        byte [] datos;


        try {
			/* tipo */

            String tipo = Files.probeContentType(fichero.toPath());


            msg += "Content-Type: "+tipo+"\n";
            System.out.println(msg);

			/* Longitud */
            long longitud = fichero.length();
            msg += "Content-Length: "+longitud+"\n\n";

			/* Contenido */
            cabecera = msg.getBytes();
            datos = Files.readAllBytes(fichero.toPath());
            salida = new byte [cabecera.length + datos.length];
            System.arraycopy(cabecera, 0, salida, 0 , cabecera.length);
            System.arraycopy(datos, 0, salida, cabecera.length , datos.length);

        } catch (IOException e) {
            e.printStackTrace();
        }

        return salida;
    }

    /**
     * Devuelve un mensaje de error, según el tipo solicitado
     *
     * @param[in]    tipo    tipo de mensaje de error
     * @return               String con el mensaje de error
     */
    public static byte [] mensajeError(int tipo) {

        String cabeza = "";
        String cuerpo = "";
        byte salida [];

        switch (tipo) {

            case 1:	/* Bad request */
                cabeza = "HTTP/1.1 400 Bad Request\n";
                cabeza += "Content-Type: text/html\n";
                cabeza += "Content-Length: 97\n\n";
                cuerpo = "<html>\n";
                cuerpo += "<head>\n";
                cuerpo += "<title>400 Bad Request</title>\n";
                cuerpo += "</head>\n";
                cuerpo += "<body>\n";
                cuerpo += "<h1>Bad Request</h1>\n";
                cuerpo += "</body>\n";
                cuerpo += "</html>";
                break;

            case 2: /* Not implemented */
                cabeza = "HTTP/1.1 501 Not Implemented\n";
                cabeza += "Content-Type: text/html\n";
                cabeza += "Content-Length: 105\n\n";
                cuerpo = "<html>\n";
                cuerpo += "<head>\n";
                cuerpo += "<title>501 Not Implemented</title>\n";
                cuerpo += "</head>\n";
                cuerpo += "<body>\n";
                cuerpo += "<h1>Not Implemented</h1>\n";
                cuerpo += "</body>\n";
                cuerpo += "</html>";
                break;

            case 3: /* Forbidden */
                cabeza = "HTTP/1.1 403 Forbidden\n";
                cabeza += "Content-Type: text/html\n";
                cabeza += "Content-Length: 93\n\n";
                cuerpo = "<html>\n";
                cuerpo += "<head>\n";
                cuerpo += "<title>403 Forbidden</title>\n";
                cuerpo += "</head>\n";
                cuerpo += "<body>\n";
                cuerpo += "<h1>Forbidden</h1>\n";
                cuerpo += "</body>\n";
                cuerpo += "</html>";
                break;

            case 4: /* Not found */
                cabeza = "HTTP/1.1 404 Not Found\n";
                cabeza += "Content-Type: text/html\n";
                cabeza += "Content-Length: 93\n\n";
                cuerpo = "<html>\n";
                cuerpo += "<head>\n";
                cuerpo += "<title>404 Not Found</title>\n";
                cuerpo += "</head>\n";
                cuerpo += "<body>\n";
                cuerpo += "<h1>Not Found</h1>\n";
                cuerpo += "</body>\n";
                cuerpo += "</html>";
                break;

            default:cabeza = "¡¡ESTO NO DEBE PASAR!!";
                break;
        }
        System.out.println(cabeza);
        byte[] cabecera = cabeza.getBytes();
        byte [] datos = cuerpo.getBytes();
        salida = new byte [cabecera.length + datos.length];
        System.arraycopy(cabecera, 0, salida, 0 , cabecera.length);
        System.arraycopy(datos, 0, salida, cabecera.length , datos.length);
        return salida;

    }
}
