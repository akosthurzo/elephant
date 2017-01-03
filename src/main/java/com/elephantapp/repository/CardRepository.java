package com.elephantapp.repository;

import com.elephantapp.model.Card;
import org.springframework.data.repository.CrudRepository;

/**
 * @author Akos Thurzo
 */
public interface CardRepository extends CrudRepository<Card, Long> {
}
