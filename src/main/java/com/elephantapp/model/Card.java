package com.elephantapp.model;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.MapKeyColumn;
import java.util.Map;

/**
 * @author Akos Thurzo
 */
@Entity
public class Card {
    @Id
    @GeneratedValue
    private Long id;
    private String side1;
    private String side2;
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "card_attributes", joinColumns = {@JoinColumn(name = "card_id")})
    @MapKeyColumn(name = "attribute_key")
    @Column(name = "attribute_value")
    private Map<String, String> attributes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSide1() {
        return side1;
    }

    public void setSide1(String side1) {
        this.side1 = side1;
    }

    public String getSide2() {
        return side2;
    }

    public void setSide2(String side2) {
        this.side2 = side2;
    }

    public Map<String, String> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, String> attributes) {
        this.attributes = attributes;
    }
}
