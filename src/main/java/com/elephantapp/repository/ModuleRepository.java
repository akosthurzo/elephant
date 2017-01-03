package com.elephantapp.repository;

import com.elephantapp.model.Module;
import org.springframework.data.repository.CrudRepository;

/**
 * @author Akos Thurzo
 */
public interface ModuleRepository extends CrudRepository<Module, Long> {
}
