
package p1;

import java.io.IOException;
import java.net.Socket;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Cliente {
	
	// constantes
	static int REINTENTO = 2000; // milisegundos hasta volver a intentar la conexión si el servidor está saturado
	static int INTENTOS = 3; // total de intentos de negociación no fallidos, sin contar el inicial
	
	// VARIABLES PARA LOS PARÁMETROS DE ENTRADA
	static int id; // id del cliente
	static String SERVER_ADDRESS; // dirección del servidor
	static int SERVER_PORT; // puerto del servidor
	
	// socket para comunicarse con el servidor empresa
	static Socket socketAlServidor = null;
	
	/*
	* Proceso cliente
	* 
	* @param[in] 1		identificador del cliente
	* @param[in] 2		puerto del servidor
	* @param[in] 3		dirección del servidor
	*/
	public static void main(String[] args) {
		
		// valores por defecto
		SERVER_PORT = 8080;
		SERVER_ADDRESS = "localhost";
		
		switch (args.length) {
			case 3 :	SERVER_ADDRESS = args[2];
			case 2 :	SERVER_PORT = Integer.parseInt(args[1]);
			case 1 :	id = Integer.parseInt(args[0]);
						break;
			default :	SERVER_PORT = 8080;
						SERVER_ADDRESS = "localhost";
		}
		
		// Protocolo de comunicación con el Main.
		try{
			for (int i = 1; i < 10; i++) {
				
				// estableciendo conexión con el servidor empresa
				boolean exito; //¿conectado?
				exito = conectarServidor(10); //10 intentos

				if(!exito){
					System.err.println("Don't know about host:"+SERVER_ADDRESS);
					System.exit(1); //abortar si hay problemas
				}
		
				// Ya hay conexíón
				// Inicialización de los flujos de datos del socket
				// para la comunicación con el servidor
				PrintWriter canalSalidaAlServidor = null;
				BufferedReader canalEntradaDelServidor = null;
				try {
					canalSalidaAlServidor = new PrintWriter(
						socketAlServidor.getOutputStream(),
						true
					);
					canalEntradaDelServidor = new BufferedReader(
						new InputStreamReader(socketAlServidor.getInputStream())
					);
				} catch (IOException e) { //abortar si hay problemas
					System.err.println("I/O problem:" + SERVER_ADDRESS);
					System.exit(1);
				}
			
				// para guardar los valores recibidos en la comunicación con la empresa
				String respuesta = ""; // la respuesta recibida
				String peticion = ""; // la petición enviada
				
				// generamos petición
				peticion = generaPeticion(i);
			
				// mostramos petición
				System.out.println("--> PETICION\n");
				System.out.println(peticion);
			
				// realizamos petición
				canalSalidaAlServidor.println(peticion);
			
				try {
					// recibimos respuesta
					String linea = null;
					while ((linea = canalEntradaDelServidor.readLine()) != null) {
						respuesta += linea+"\n";
					}
				}  catch (Exception e) {
					// DE MOMENTO IGNORAMOS ESTE RERROR!!!!!!!!!
					// System.err.println("\n--> SOCKET MAL CERRADO\n");
				}
			
				// mostramos respuesta
				System.out.println("--> RESPUESTA\n");
				System.out.println(respuesta);
				
				// Al cerrar cualquiera de los canales de
				// comunicación usados por un socket, el socket 
				// se cierra. Como no nos importa perder información 
				// cerramos el canal de entrada.
				canalEntradaDelServidor.close();

				// Cierre del Socket para comunicarse con el servidor.
				socketAlServidor.close();
			}
		} catch (Exception e) {
			System.err.println("Cliente "+id+" error: "+e);
			e.printStackTrace();
		}
	}

	static private boolean conectarServidor(int maxIntentos) {
		//hasta maxIntentos intentos de conexión, para
		//darle tiempo al servidor a arrancar
		boolean exito = false; //¿hay servidor?
		int van = 0;
		
		while((van<maxIntentos) && !exito){
			try {
				socketAlServidor = new Socket(SERVER_ADDRESS, SERVER_PORT);
				exito = true;
			} catch (Exception e) {
				van++;
				System.err.println("Failures:" + van);
				try { //esperar 1 seg
    				Thread.sleep(1000);
				} catch (InterruptedException e2) {
    				e2.printStackTrace();
				}
			}
		}
		return exito;
	}
	
	static private String generaPeticion(int tipo) {
		
		String salida = "";
		
		switch (tipo) {
			case 1:	// BAD REQUEST
					salida = "Me lo invento...\n";
					break;
			case 2: // NOT IMPLEMENTED
					salida = "HEAD /prueba.html HTTP/1.1\n";
					break;
			case 3: // FORBIDDEN
					salida = "GET /src/ssdd/p1/prueba.html HTTP/1.1\n";
					break;
			case 4: // FORBIDDEN
					salida = "GET /.. HTTP/1.1\n";
					break;
			case 5: // NOT FOUND
					salida = "GET /bar.txt HTTP/1.1\n";
					break;
			case 6: // CORRECTA
					salida = "GET /prueba.html HTTP/1.1\n";
					break;
			case 7: // FORBIDDEN
					salida = "POST /hola.txt HTTP/1.1\n";
					salida += "Content-Length: 43\n\n";
					salida += "fname=foo.txt&content=Este es el contenido";
					break;
			case 8: // FORBIDDEN
					salida = "POST / HTTP/1.1\n";
					salida += "Content-Length: 48\n\n";
					salida += "fname=dir/file.txt&content=Este es el contenido";
					break;
			case 9: // CORRECTA
					salida = "POST / HTTP/1.1\n";
					salida += "Content-Length: 80\n\n";
					salida += "fname=foo.txt&content=Este es el contenido\nEsta es otra línea\n\nY ahora con eñe";
					break;
			default:salida = "¡¡ESTO NO DEBE PASAR!!";
					break;
		}
		
		return salida;
		
	}
}
