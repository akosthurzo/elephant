package com.elephantapp.repository;

import com.elephantapp.model.Card;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * @author Akos Thurzo
 */
@RepositoryRestResource
public interface CardRepository extends CrudRepository<Card, Long> {
}
