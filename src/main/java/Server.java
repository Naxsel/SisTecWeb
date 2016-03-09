import java.io.File;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * Inicialización del Servidor
 *
 * @param[0]    PORT   puerto donde escuchar
 * @param[1]    folder  ruta de ficheros desde donde proveer
 * Ambos parametros son opciones, puerto 8080 y ruta de ejecucion de la JVM por defecto
 */
public class Server {

    public static void main(String[] args) {

        try {
            int PORT = 8080; /* puerto por defecto */
            String folder = new File("").getCanonicalPath(); /* ruta por defecto */
            ServerSocket serverSocket;
            Socket clientSocket;
            Worker p;

	        /* args */
            if (args.length>0 && args.length!=2){
                System.out.println("Para ejecutar con parametros, programa puerto directorio");
            }else if (args.length == 2 ){
                PORT = Integer.parseInt(args[0]);
                folder = args[1];
            }

            serverSocket = creaListenSocket(PORT);
            System.out.printf("Servidor escuchando en %d, sirviendo desde %s",PORT,folder);

            while (true) {
                clientSocket = creaClientSocket(serverSocket);
                p = new Worker(clientSocket,PORT,folder);
                Thread t = new Thread(p);
                t.start();
            }

        } catch (IOException e) {
            e.printStackTrace();
        } catch (NumberFormatException e2) {
            System.out.println("Main -t|-s puerto\n");
        }
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
