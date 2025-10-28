public class LibraryServiceTest {
    public static void main(String[] args) {

        LibraryService svc = new LibraryService();

        Book b1 = new Book("111", "Java Basics", "Anu");
        Book b2 = new Book("222", "Advanced Java", "Bala");
        Book b3 = new Book("333", "Spring Boot", "Anu");

        svc.addBook(b1);
        svc.addBook(b2);
        svc.addBook(b3);

        // Test add & search
        assert svc.findByIsbn("222").getTitle().equals("Advanced Java");

        // Test List ordering
        assert svc.getBookList().size() == 3;

        // Test Set unique authors
        assert svc.getAuthors().size() == 2;

        // Test remove
        svc.removeBook("222");
        assert svc.findByIsbn("222") == null;

        System.out.println("✅ All tests passed successfully!");
    }
}
