import java.io.*;
import java.nio.file.Files;
import java.nio.charset.Charset;

public final class Response {

    private Response() {}

    public static String gestionGET(String ruta, String home) {
        String salida = "";

		/* No aceptaria esto: "/./estoy_en_el_directorio_correcto.txt"
		 * Ruta correcta
		 */

        System.out.println(ruta);
        if (ruta.lastIndexOf('/') == 0) {

            File fichero = new File(home+ruta);

            if (fichero.isFile()) {		/*Existe y es una fichero */

                if (fichero.canRead()) { /*Existe y se puede leer */
                    salida = salidaFichero(fichero);
                } else {
                    salida = mensajeError(3);	/*Forbidden */
                }
            } else {
                salida = mensajeError(4);	/*Not found */
            }
        } else {
            salida = mensajeError(3);	/*Forbidden*/
        }

        return salida;
    }

    /**
     * CODIGO BASADO EN EL PROPUESTO EN:
     * https://docs.oracle.com/javase/tutorial/essential/io/file.html
     *
     */
    public static String salidaFichero(File fichero) {

        String salida = "HTTP/1.1 200 OK\n"; 	/*Cabecera */

        try {
			/* tipo */
            String tipo = Files.probeContentType(fichero.toPath());
            salida += "Content-Type: "+tipo+"\n";

			/* Longitud */
            long longitud = fichero.length();
            salida += "Content-Length: "+longitud+"\n\n";

			/* Contenido */
            BufferedReader reader = Files.newBufferedReader(fichero.toPath(),
                    Charset.forName("UTF-8"));
            String linea = null;
            while ((linea = reader.readLine()) != null) {
                salida += linea+"\n";
            }
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
    public static String mensajeError(int tipo) {

        String salida = "";

        switch (tipo) {

            case 1:	/* Bad request */
                salida = "HTTP/1.1 400 Bad Request\n";
                salida += "Content-Type: text/html\n";
                salida += "Content-Length: 97\n\n";
                salida += "<html>\n";
                salida += "<head>\n";
                salida += "<title>400 Bad Request</title>\n";
                salida += "</head>\n";
                salida += "<body>\n";
                salida += "<h1>Bad Request</h1>\n";
                salida += "</body>\n";
                salida += "</html>";
                break;

            case 2: /* Not implemented */
                salida = "HTTP/1.1 501 Not Implemented\n";
                salida += "Content-Type: text/html\n";
                salida += "Content-Length: 105\n\n";
                salida += "<html>\n";
                salida += "<head>\n";
                salida += "<title>501 Not Implemented</title>\n";
                salida += "</head>\n";
                salida += "<body>\n";
                salida += "<h1>Not Implemented</h1>\n";
                salida += "</body>\n";
                salida += "</html>";
                break;

            case 3: /* Forbidden */
                salida = "HTTP/1.1 403 Forbidden\n";
                salida += "Content-Type: text/html\n";
                salida += "Content-Length: 93\n\n";
                salida += "<html>\n";
                salida += "<head>\n";
                salida += "<title>403 Forbidden</title>\n";
                salida += "</head>\n";
                salida += "<body>\n";
                salida += "<h1>Forbidden</h1>\n";
                salida += "</body>\n";
                salida += "</html>";
                break;

            case 4: /* Not found */
                salida = "HTTP/1.1 404 Not Found\n";
                salida += "Content-Type: text/html\n";
                salida += "Content-Length: 93\n\n";
                salida += "<html>\n";
                salida += "<head>\n";
                salida += "<title>404 Not Found</title>\n";
                salida += "</head>\n";
                salida += "<body>\n";
                salida += "<h1>Not Found</h1>\n";
                salida += "</body>\n";
                salida += "</html>";
                break;

            default:salida = "¡¡ESTO NO DEBE PASAR!!";
                break;
        }

        return salida;

    }
}
