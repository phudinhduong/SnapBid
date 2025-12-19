package spring.springbackend;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import spring.springbackend.model.Product;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173") // dev React
public class ProductController {
    private final ProductRepository repo;

    public ProductController(ProductRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Product> getAll() { return repo.findAll(); }

    @PostMapping
    public Product create(@RequestBody Product p) { return repo.save(p); }
}

