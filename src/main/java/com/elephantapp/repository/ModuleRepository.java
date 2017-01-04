package com.elephantapp.repository;

import com.elephantapp.model.Module;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * @author Akos Thurzo
 */
@RepositoryRestResource
public interface ModuleRepository extends CrudRepository<Module, Long> {
}
