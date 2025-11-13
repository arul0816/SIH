import java.util.HashMap;

public class HashMapExample {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();

        // 1. put()
        map.put("Apple", 50);
        map.put("Banana", 30);

        // 2. get()
        System.out.println("Apple Price: " + map.get("Apple"));

        // 3. remove()
        map.remove("Banana");

        // 4. containsKey()
        System.out.println("Has Apple? " + map.containsKey("Apple"));

        // 5. containsValue()
        System.out.println("Has value 50? " + map.containsValue(50));

        // 6. size()
        System.out.println("Map size: " + map.size());

        // 7. clear()
        map.clear();
        System.out.println("After clear, size: " + map.size());
    }
}