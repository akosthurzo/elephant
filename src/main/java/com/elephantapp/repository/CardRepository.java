package com.elephantapp.repository;

import com.elephantapp.model.Card;
import com.elephantapp.model.Module;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

/**
 * @author Akos Thurzo
 */
@RepositoryRestResource
public interface CardRepository extends CrudRepository<Card, Long> {

    @Query("select c from Card c " +
            "where c.module.id = ?1 and c.dueDate between ?2 and ?3")
    List<Card> findByModuleAndDueDateBetween(@Param("module_id") Long module_id, @DateTimeFormat(pattern = "yyyy-MM-dd") @Param("min") Date date1, @DateTimeFormat(pattern = "yyyy-MM-dd") @Param("max") Date date2);
}
