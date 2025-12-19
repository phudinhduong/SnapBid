package spring.springbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import spring.springbackend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {}

