package com.elephantapp;

import com.elephantapp.model.Course;
import com.elephantapp.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import spark.Request;
import spark.Response;

import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletException;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Scanner;

/**
 * @author Akos Thurzo
 */
@Controller
public class Upload {
    public Object upload(Request request, Response response) throws IOException, ServletException {
        String location = "image";          // the directory location where files will be stored
        long maxFileSize = 100000000;       // the maximum size allowed for uploaded files
        long maxRequestSize = 100000000;    // the maximum size allowed for multipart/form-data requests
        int fileSizeThreshold = 1024;       // the size threshold after which files will be written to disk

        MultipartConfigElement multipartConfigElement = new MultipartConfigElement(
                location, maxFileSize, maxRequestSize, fileSizeThreshold);
        request.raw().setAttribute("org.eclipse.jetty.multipartConfig",
                multipartConfigElement);

        /*Collection<Part> parts = request.raw().getParts();
        for (Part part : parts) {
            System.out.println("Name: " + part.getName());
            System.out.println("Size: " + part.getSize());
            System.out.println("Filename: " + part.getSubmittedFileName());
        }

        String fName = request.raw().getPart("upfile").getSubmittedFileName();
        System.out.println("Title: " + request.raw().getParameter("title"));
        System.out.println("File: " + fName);*/

        Part uploadedFile = request.raw().getPart("upfile");
        //Path out = Paths.get("image/" + fName);
        try (final InputStream in = uploadedFile.getInputStream()) {
            //Files.copy(in, out);
            System.out.println(convertStreamToString(in));
            uploadedFile.delete();
        }
        // cleanup
        /*multipartConfigElement = null;
        parts = null;
        uploadedFile = null;*/

        Course c = new Course();
        c.setName("testName");
        if(courseRepository == null) System.out.println("repo is null!!!!!!!!!!!!!!!!!!!"); else
        courseRepository.save(c);

        return "OK";
    }

    @Autowired
    private CourseRepository courseRepository;

    static String convertStreamToString(InputStream is) {
        Scanner s = new Scanner(is).useDelimiter("\\A");
        return s.hasNext() ? s.next() : "";
    }
}
