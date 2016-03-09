import java.io.*;


public class Main {
	
	private static int PORT = 8080; /* puerto por defecto */
	
	public static void main(String[] args) {
	    
	    /* Si hay argumentos tomamos el primero como puerto */
		try {
			PORT = Integer.parseInt("8080");
			ServidorThread st = new ServidorThread(PORT);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (NumberFormatException e2) {
		    System.out.println("Main -t|-s puerto\n");
		}
	}
}
