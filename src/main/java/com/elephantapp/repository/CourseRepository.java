package com.elephantapp.repository;

import com.elephantapp.model.Course;
import org.springframework.data.repository.CrudRepository;

/**
 * @author Akos Thurzo
 */
public interface CourseRepository extends CrudRepository<Course, Long> {
}
