package com.devanshu.WishlistManagerApplication.repository;

import com.devanshu.WishlistManagerApplication.model.products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface productsRepo extends JpaRepository<products,Integer> {

    products findById(int id);
}
