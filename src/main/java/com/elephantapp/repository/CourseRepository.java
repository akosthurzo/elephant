package com.elephantapp.repository;

import com.elephantapp.model.Course;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * @author Akos Thurzo
 */
@RepositoryRestResource
public interface CourseRepository extends CrudRepository<Course, Long> {
}
