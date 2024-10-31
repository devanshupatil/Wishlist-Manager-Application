package com.devanshu.WishlistManagerApplication.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int id;
    private String product_URL;
    private Double price;
    private String product_name;
    private Double target_price;
    private String category;
    private String notes;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Date getProduct_date() {
        return product_date;
    }

    public void setProduct_date(Date product_date) {
        this.product_date = product_date;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public String getProduct_URL() {
        return product_URL;
    }

    public void setProduct_URL(String product_URL) {
        this.product_URL = product_URL;
    }

    public Double getTarget_price() {
        return target_price;
    }

    public void setTarget_price(Double target_price) {
        this.target_price = target_price;
    }

    Date product_date;

    @Override
    public String toString() {
        return "products{" +
                "category='" + category + '\'' +
                ", product_URL='" + product_URL + '\'' +
                ", price=" + price +
                ", product_name='" + product_name + '\'' +
                ", target_price=" + target_price +
                ", notes='" + notes + '\'' +
                ", product_date=" + product_date +
                '}';
    }
}
