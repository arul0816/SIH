import java.util.*;

public class MapExample {
    public static void main(String[] args) {
        Map<Integer, String> students = new HashMap<>();

        students.put(1, "Arul");
        students.put(2, "Aswin");
        students.put(3, "Bharani");

        // Access by key
        System.out.println("Student with ID 2: " + students.get(2));

        // Iterate over entries
        System.out.println("All students:");
        for (Map.Entry<Integer, String> entry : students.entrySet()) {
            System.out.println(entry.getKey() + " => " + entry.getValue());
        }
    }
}
