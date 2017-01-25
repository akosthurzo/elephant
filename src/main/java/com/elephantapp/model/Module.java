package com.elephantapp.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderColumn;
import java.util.List;

/**
 * @author Akos Thurzo
 */
@Entity
public class Module {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderColumn(name = "card_index")
    private List<Card> cards;
    @ManyToOne(cascade = CascadeType.ALL)
    private Course course;
    @Column(name = "module_index")
    private Long moduleIndex;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        if (this.cards == null) {
            this.cards = cards;
        } else {
            //this.cards.retainAll(cards);
            this.cards.clear();
            this.cards.addAll(cards);
        }
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Long getModuleIndex() {
        return moduleIndex;
    }

    public void setModuleIndex(Long moduleIndex) {
        this.moduleIndex = moduleIndex;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Module module = (Module) o;

        if (id != null ? !id.equals(module.id) : module.id != null) return false;
        if (name != null ? !name.equals(module.name) : module.name != null) return false;
        if (cards != null ? !cards.equals(module.cards) : module.cards != null) return false;
        return course != null ? course.equals(module.course) : module.course == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (cards != null ? cards.hashCode() : 0);
        result = 31 * result + (course != null ? course.hashCode() : 0);
        return result;
    }
}
