import java.util.Set;

public class App {
    public static void main(String[] args) {

        LibraryService service = new LibraryService();

        service.addBook(new Book("111", "Java Basics", "Anu"));
        service.addBook(new Book("222", "Advanced Java", "Bala"));
        service.addBook(new Book("333", "Spring Boot", "Anu")); // same author (Set demo)

        System.out.println("📘 Book List (List):");
        System.out.println(service.getBookList());

        System.out.println("\n🏷 Unique Authors (Set):");
        System.out.println(service.getAuthors());

        System.out.println("\n🔍 Find by ISBN 222 (Map):");
        System.out.println(service.findByIsbn("222"));

        System.out.println("\n🔎 Search title contains 'java':");
        System.out.println(service.searchByTitle("java"));

        service.removeBook("222");
        System.out.println("\n❌ After Removing 222:");
        System.out.println("List: " + service.getBookList());
        System.out.println("Authors: " + service.getAuthors());

        System.out.println("\n✅ Use cases:");
        System.out.println("- List: keeps order, allows duplicates.");
        System.out.println("- Set: unique values (authors).");
        System.out.println("- Map: fast lookup (ISBN → Book).");
    }
}
