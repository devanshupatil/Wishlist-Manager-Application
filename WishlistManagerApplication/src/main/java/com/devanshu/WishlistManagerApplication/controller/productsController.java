package com.devanshu.WishlistManagerApplication.controller;

import com.devanshu.WishlistManagerApplication.model.products;
import com.devanshu.WishlistManagerApplication.service.productsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product")
public class productsController {

    @Autowired
    private productsService pService;

    @GetMapping("/hello")
    public String Home() {
        return "Hello WebSecurity";
    }

    @GetMapping("/")
    public String index() {
        return "index"; // This corresponds to index.html in the templates folder
    }

    @PostMapping("/{productId}")
    public ResponseEntity<products> addItems(@RequestBody products product,
            @PathVariable(value = "productId") int productId) {
        product.setId(productId);
        return pService.addItems(product);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<products> updateItemsDetails(@RequestBody products product,
            @PathVariable(value = "productId") int productId) {

        return pService.updateItemsDetails(product);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<products> deleteItems(@RequestBody products product,
            @PathVariable(value = "productId") int productId) {

        return pService.deleteItems(product);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<products> listAllItems(@RequestBody products product,
            @PathVariable(value = "productId") int productId) {
        return pService.listAllItems(product);
    }
}
