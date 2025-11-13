import java.util.*;

public class ListExample {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>();

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);

        // Access elements by index
        System.out.println("First number: " + numbers.get(0));

        // Iterate
        System.out.println("All numbers:");
        for (int num : numbers) {
            System.out.println(num);
        }
    }
}
