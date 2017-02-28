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
import javax.persistence.ManyToOne;
import javax.persistence.MapKeyColumn;
import java.util.Date;
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
    @ManyToOne(cascade = CascadeType.ALL)
    private Module module;
    @Column(name = "card_index")
    private Long cardIndex;

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

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public Long getCardIndex() {
        return cardIndex;
    }

    public void setCardIndex(Long cardIndex) {
        this.cardIndex = cardIndex;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Card card = (Card) o;

        if (id != null ? !id.equals(card.id) : card.id != null) return false;
        if (side1 != null ? !side1.equals(card.side1) : card.side1 != null) return false;
        if (side2 != null ? !side2.equals(card.side2) : card.side2 != null) return false;
        if (attributes != null ? !attributes.equals(card.attributes) : card.attributes != null) return false;
        if (module != null ? !module.equals(card.module) : card.module != null) return false;
        return cardIndex != null ? cardIndex.equals(card.cardIndex) : card.cardIndex == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (side1 != null ? side1.hashCode() : 0);
        result = 31 * result + (side2 != null ? side2.hashCode() : 0);
        result = 31 * result + (attributes != null ? attributes.hashCode() : 0);
        result = 31 * result + (module != null ? module.hashCode() : 0);
        result = 31 * result + (cardIndex != null ? cardIndex.hashCode() : 0);
        return result;
    }
}
