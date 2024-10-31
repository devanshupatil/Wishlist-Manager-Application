package com.devanshu.WishlistManagerApplication.service;

import com.devanshu.WishlistManagerApplication.model.products;
import com.devanshu.WishlistManagerApplication.repository.productsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class productsService {

    /*
     * add items
     * update item details
     * delete item
     * list all items
     * */

    @Autowired
    private productsRepo repo;

    public ResponseEntity<products>addItems(products product)
    {
        products products = repo.findById(product.getId());

        if(products == null)
        {
            return (ResponseEntity<products>) ResponseEntity.status(401);
        }

        product.setProduct_name(product.getProduct_name());
        product.setProduct_URL(product.getProduct_URL());
        product.setCategory(product.getCategory());
        product.setNotes(product.getNotes());
        product.setProduct_date(product.getProduct_date());
        product.setPrice(product.getPrice());
        product.setTarget_price(product.getTarget_price());

        repo.save(product);
        return ResponseEntity.ok(product);
    }


    public ResponseEntity<products>updateItemsDetails(products product)
    {
        products products = repo.findById(product.getId());

        if(products == null)
        {
            return (ResponseEntity<products>) ResponseEntity.status(401);
        }

        product.setProduct_name(product.getProduct_name());
        product.setProduct_URL(product.getProduct_URL());
        product.setCategory(product.getCategory());
        product.setNotes(product.getNotes());
        product.setProduct_date(product.getProduct_date());
        product.setPrice(product.getPrice());
        product.setTarget_price(product.getTarget_price());

        repo.save(product);
        return ResponseEntity.ok(product);
    }


    public ResponseEntity<products>deleteItems(products product)
    {
        products products = repo.findById(product.getId());

        if(products == null)
        {
            return (ResponseEntity<products>) ResponseEntity.status(401);
        }

        repo.delete(product);
        return ResponseEntity.ok(product);
    }


    public ResponseEntity<products>listAllItems(products product)
    {
        products products = repo.findById(product.getId());

        if(products == null)
        {
            return (ResponseEntity<products>) ResponseEntity.status(401);
        }


        return ResponseEntity.ok(product);
    }
}
