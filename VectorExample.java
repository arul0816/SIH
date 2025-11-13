import java.util.*;

public class VectorExample {
    public static void main(String[] args) {
        Vector<String> cities = new Vector<>();

        cities.add("Delhi");
        cities.add("Mumbai");
        cities.add("Chennai");
        
        

        System.out.println("Cities in vector: " + cities);

        // Access using elementAt()
        System.out.println("City at index 1: " + cities.elementAt(1));
    }
}
