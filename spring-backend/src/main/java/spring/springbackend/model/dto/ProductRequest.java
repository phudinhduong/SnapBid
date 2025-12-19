package spring.springbackend.model.dto;


import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record ProductRequest(
        @NotBlank String name,
        @NotNull @PositiveOrZero BigDecimal price
) {}