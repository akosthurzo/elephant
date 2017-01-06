package com.elephantapp.config;

import com.elephantapp.model.Card;
import com.elephantapp.model.Course;
import com.elephantapp.model.Module;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

/**
 * @author Akos Thurzo
 */
@Configuration
@Import(RepositoryRestMvcConfiguration.class)
public class SpringDataRestConfiguration extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Card.class);
        config.exposeIdsFor(Course.class);
        config.exposeIdsFor(Module.class);
    }
}