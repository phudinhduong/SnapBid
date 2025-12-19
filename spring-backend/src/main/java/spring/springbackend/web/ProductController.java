package spring.springbackend.web;

import org.springframework.web.bind.annotation.*;
import spring.springbackend.model.Product;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import spring.springbackend.model.dto.ProductRequest;
import spring.springbackend.repository.ProductRepository;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductRepository repo;

    public ProductController(ProductRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Product> all() {
        return repo.findAll();
    }

    @PostMapping
    public Product create(@RequestBody @Valid ProductRequest req) {
        return repo.save(new Product(null, req.name(), req.price()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody @Valid ProductRequest req) {
        return repo.findById(id)
                .map(p -> {
                    p.setName(req.name());
                    p.setPrice(req.price());
                    return ResponseEntity.ok(repo.save(p));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}


