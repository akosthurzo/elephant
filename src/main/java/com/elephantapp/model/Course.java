package com.elephantapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OrderColumn;
import java.util.List;

/**
 * @author Akos Thurzo
 */
@Entity
public class Course {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    @OneToMany
    @OrderColumn(name = "module_index")
    private List<Module> modules;
}
