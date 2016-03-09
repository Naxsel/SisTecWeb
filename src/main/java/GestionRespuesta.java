import java.io.*;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.nio.file.StandardOpenOption;

public final class GestionRespuesta {
	
	private GestionRespuesta() {}
	
	public static String gestionGET(String ruta, String home) {
		String salida = "";
		
		/* No aceptaria esto: "/./estoy_en_el_directorio_correcto.txt" 
		 * Ruta correcta 
		 */

		System.out.println(ruta);
		if (ruta.lastIndexOf('/') == 0
				&& ((ruta.length() < 3) 
				    || (!ruta.substring(1,3).equals("src/main")))) {
			
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
	 *
	 *
	 *
	 *
	 */
//	public static String gestionPOST(String ruta,
//							ByteBuffer body, String home) {
//		String salida = new String(body.array());
//
//		if (ruta.equals("/")) {	/*Ruta correcta */
//
//			/*
//			 * Se trata el cuerpo del mensaje
//			 */
//			try {
//				salida = URLDecoder.decode(salida, "UTF-8");
//			} catch (Exception e) {}
//			/*
//			 * Se comprueba la estructura y se analiza
//			 */
//			String[] partes = salida.split("[&=]",4);
//
//			if (partes[0].equals("fname") &&
//					partes[2].equals("content") &&
//					partes[1].indexOf('/') == -1 &&
//					!partes[1].substring(0,2).equals("src/main")) {
//				/*Formato correcto*/
//
//				File fichero = new File(home+"/"+partes[1]);
//
//				try {
//					fichero.createNewFile();
//				} catch (Exception e) {}
//
//				if (escribeFichero(fichero, partes[3])) {
//
//					salida = salidaFicheroEscrito(fichero);
//
//				} else {
//					salida = mensajeError(3); /*Forbidden */
//				}
//			} else {
//				salida = mensajeError(1); /*Bad request */
//			}
//		} else {
//			salida = mensajeError(3);	/*Forbidden */
//		}
//
//		return salida;
//	}
	
	
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
	 * CODIGO BASADO EN EL PROPUESTO EN:
	 * https://docs.oracle.com/javase/tutorial/essential/io/file.html
	 *
	 */
//	public static String salidaFicheroEscrito(File fichero) {
//
//		String salida = "HTTP/1.1 200 OK\n";	/*Cabecera*/
//
//		try {
//			/* tipo */
//			String tipo = Files.probeContentType(fichero.toPath());
//			salida += "Content-Type: "+tipo+"\n";
//
//			/* longitud */
//			long longitud = fichero.length() + 149 + fichero.getName().length();
//			salida += "Content-Length: "+longitud+"\n\n";
//
//			/* contenido */
//			salida += "<html>\n";
//			salida += "<head>\n";
//			salida += "<title>!Exito!</title>\n";
//			salida += "</head>\n";
//			salida += "<body>\n";
//			salida += "<h1>!Exito!</h1>\n";
//			salida += "<p>Se ha escrito lo siguiente en el fichero ";
//			salida += fichero.getName()+":</p>\n";
//			salida += "<pre>\n";
//
//			/* contenido del fichero */
//			BufferedReader reader = Files.newBufferedReader(fichero.toPath(),
//											Charset.forName("UTF-8"));
//			String linea = null;
//			while ((linea = reader.readLine()) != null) {
//				salida += linea+"\n";
//			}
//			salida += "</pre>\n";
//			salida += "</body>\n";
//			salida += "</html>";
//
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//
//		return salida;
//	}
	
	 /**
	  * CODIGO BASADO EN EL PROPUESTO EN:
	  * https://docs.oracle.com/javase/tutorial/essential/io/file.html
	  *
	  */
//	public static boolean escribeFichero(File fichero, String contenido) {
//		try {
//			BufferedWriter writer = Files.newBufferedWriter(fichero.toPath(),
//					Charset.forName("UTF-8"),
//					StandardOpenOption.valueOf("APPEND"));
//			writer.write(contenido, 0, contenido.length());
//			writer.close();
//		} catch (Exception e) {
//			e.printStackTrace();
//			return false;
//		}
//		return true;
//	}
	
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
