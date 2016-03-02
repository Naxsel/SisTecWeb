

package p1;

import java.io.*;


public class Main {
	
	private static int PORT = 8080; /* puerto por defecto */
	
	public static void main(String[] args) {
	    
	    /* Si hay argumentos tomamos el primero como puerto */
		try {
		    if (args.length == 2) {
			    PORT = Integer.parseInt(args[1]);
			    switch (args[0]) {
			        case "-t":  ServidorThread st = new ServidorThread(PORT);
			                    break;
			        default:    System.out.println("Main -t|-s puerto\n");
			    }
		    } else {
		        System.out.println("Main -t|-s puerto\n");
		    }
		} catch (IOException e) {
			e.printStackTrace();
		} catch (NumberFormatException e2) {
		    System.out.println("Main -t|-s puerto\n");
		}
	}
}
