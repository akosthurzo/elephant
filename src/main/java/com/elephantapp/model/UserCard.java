package com.elephantapp.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Date;

/**
 * @author Akos Thurzo
 */
@Entity
public class UserCard {
    @Id
    @GeneratedValue
    private Long userCardId;

    @ManyToOne(cascade = CascadeType.ALL)
    private User user;
    @ManyToOne(cascade = CascadeType.ALL)
    private Card card;

    private Long interval;
    private Double eFactor;
    private Long repetitionCount;
    private Date dueDate;
    private boolean inverse;

    public Long getUserCardId() {
        return userCardId;
    }

    public void setUserCardId(Long userCardId) {
        this.userCardId = userCardId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public Long getInterval() {
        return interval;
    }

    public void setInterval(Long interval) {
        this.interval = interval;
    }

    public Double geteFactor() {
        return eFactor;
    }

    public void seteFactor(Double eFactor) {
        this.eFactor = eFactor;
    }

    public Long getRepetitionCount() {
        return repetitionCount;
    }

    public void setRepetitionCount(Long repetitionCount) {
        this.repetitionCount = repetitionCount;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isInverse() {
        return inverse;
    }

    public void setInverse(boolean inverse) {
        this.inverse = inverse;
    }
}
