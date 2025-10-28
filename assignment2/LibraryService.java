import java.util.*;

public class LibraryService {

    private List<Book> bookList = new ArrayList<>();     // Keeps order, allows duplicates
    private Set<String> authors = new HashSet<>();       // Unique authors
    private Map<String, Book> bookMap = new HashMap<>(); // ISBN → Book

    // Add book
    public void addBook(Book book) {
        bookList.add(book);                      // List usage
        authors.add(book.getAuthor());           // Set usage
        bookMap.put(book.getIsbn(), book);       // Map usage
    }

    // Remove book
    public boolean removeBook(String isbn) {
        Book removed = bookMap.remove(isbn);
        if (removed == null) return false;

        bookList.removeIf(b -> b.getIsbn().equals(isbn));
        rebuildAuthors();
        return true;
    }

    private void rebuildAuthors() {
        authors.clear();
        for (Book b : bookList) authors.add(b.getAuthor());
    }

    // Search
    public Book findByIsbn(String isbn) {
        return bookMap.get(isbn);
    }

    public List<Book> searchByTitle(String title) {
        List<Book> result = new ArrayList<>();
        for (Book b : bookList) {
            if (b.getTitle().toLowerCase().contains(title.toLowerCase())) {
                result.add(b);
            }
        }
        return result;
    }

    // Getters
    public List<Book> getBookList() { return bookList; }
    public Set<String> getAuthors() { return authors; }
    public Map<String, Book> getBookMap() { return bookMap; }
}
