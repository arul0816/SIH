import java.util.*;

public class collection {
    public static void main(String[] args) {
        Collection<String> fruits = new ArrayList<>();

        // Add elements
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");

        // Iterate using for-each
        System.out.println("Fruits in collection:");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }

        // Remove element
        fruits.remove("Banana");
        System.out.println("After removal: " + fruits);
    }
}
