package com.elephantapp.repository;

import com.elephantapp.model.Card;
import com.elephantapp.model.Module;
import org.springframework.data.domain.Pageable;
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
            "where c.module.id = :module_id and c.dueDate between :min and :max " +
            "order by c.dueDate, c.id")
    List<Card> findByModuleAndDueDateBetween(@Param("module_id") Long module_id, @DateTimeFormat(pattern = "yyyy-MM-dd") @Param("min") Date date1, @DateTimeFormat(pattern = "yyyy-MM-dd") @Param("max") Date date2);

    @Query("select c from Card c " +
            "where c.module.course.id = :course_id and c.dueDate between :min and :max " +
            "order by c.module.moduleIndex, c.dueDate, c.cardIndex")
    List<Card> findByCourseAndDueDateBetween(@Param("course_id") Long module_id, @DateTimeFormat(pattern = "yyyy-MM-dd") @Param("min") Date date1, @DateTimeFormat(pattern = "yyyy-MM-dd") @Param("max") Date date2, Pageable pageable);

    @Query("select c from Card c " +
            "where c.module.id = :module_id and c.dueDate2 between :min and :max " +
            "order by c.dueDate2, c.id")
    List<Card> findByModuleAndDueDate2Between(@Param("module_id") Long module_id, @DateTimeFormat(pattern = "yyyy-MM-dd") @Param("min") Date date1, @DateTimeFormat(pattern = "yyyy-MM-dd") @Param("max") Date date2);

    @Query("select c from Card c " +
            "where c.module.course.id = :course_id and c.dueDate2 between :min and :max " +
            "order by c.module.moduleIndex, c.dueDate2, c.cardIndex")
    List<Card> findByCourseAndDueDate2Between(@Param("course_id") Long module_id, @DateTimeFormat(pattern = "yyyy-MM-dd") @Param("min") Date date1, @DateTimeFormat(pattern = "yyyy-MM-dd") @Param("max") Date date2, Pageable pageable);
}
