

package p1;

import java.io.*;
import java.net.Socket;
import java.net.ServerSocket;
import java.util.Vector;


public class ServidorThread {
	
	public  ServidorThread(int SERVER_PORT) throws IOException  {
	    
	    String ruta; /* ruta donde se aloja el servidor y ficheros accesibles*/
	    
		ServerSocket serverSocket;  /* para escuchar*/
		Socket clientSocket;        /* para crear los socket de los clientes*/
		Proceso p;                  /* para crear los procesos*/
		Vector<Thread> t;           /* para ir creando los sockets*/
		
		int ultimo;                 /* para llevar la cuenta de los threads*/
		
		/* inicializamos las variables */
		
		ruta = ""; /* por defecto */
		
		try {
			ruta = new File("").getCanonicalPath();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		serverSocket = null;
		clientSocket = null;
		t = new Vector<Thread>();
		ultimo = 0;
		
		/* Creamos el socket donde escuchará el servidor */
		serverSocket = creaListenSocket(SERVER_PORT);
		
		boolean sigo = true;
		
		try {
			while (sigo) {
				
				/* escucha hasta recibir un socket de cliente */
				clientSocket = creaClientSocket(serverSocket);
				
				/* Un proceso con su thread por cada cliente */
				p = new Proceso(ultimo, clientSocket, SERVER_PORT, ruta);
				t.add(new Thread(p));
				t.elementAt(ultimo).start();
				ultimo++;
			}
			
			/* para terminar cierro el socket */
			serverSocket.close();
			
			/* join() de todos los threads que he lanzado */
			for (Thread tr : t) {
				tr.join();
			}
			
		} catch (IOException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		System.out.println("SERVIDOR CERRADO");
	}


	/**
	 * Crea el socket donde escucha peticiones el servidor
	 * 
	 * @param[in]   serverSockNum   puerto donde escuchar
	 * @return                      identificador del socket creado
	 */
	private static ServerSocket creaListenSocket(int serverSockNum) {
		ServerSocket server = null;

		try {
    		server = new ServerSocket(serverSockNum);
  		} catch (IOException e) {
   			System.err.println("Problems in port: " + serverSockNum);
   			e.printStackTrace();
   		}
   		return server;
  	}

	/**
	 * Permanece escuchando en el puerto del servidor (accept bloqueante)
	 * Al recibir una petición, devuelve el identificador del socket de cliente
	 * 
	 * @param[in]   server  identificador del socket del servidor
	 * @return              identificador del socket creado
	 */
  	private static Socket creaClientSocket(ServerSocket server) {
  		Socket res = null;

  		try {
			res = server.accept();
		} catch (IOException e) {
			System.err.println("Accept failed.");
			e.printStackTrace();
		}
		return res;
	}
}
