package com.example.mockapi;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.URI;

@SpringBootApplication
public class MockApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(MockApiApplication.class, args);
    }

}

@Log4j2
@RestController
class ApiHttpController {

    private final File file;

    ApiHttpController(@Value("file://${user.home}/Desktop/uploads") File file) {
        this.file = file;
    }

    @PostMapping("/podcasts/{uid}")
    ResponseEntity<?> beginProduction(@PathVariable("uid") String uid, @RequestParam("file") MultipartFile file) throws Exception {
        var newFile = new File(this.file, uid);
        file.transferTo(newFile);
        Assert.isTrue(newFile.exists(), () -> "the file " + newFile.getAbsolutePath() + " does not exist");
        log.info("the newly POST'd file lives at " + newFile.getAbsolutePath() + '.');
        Assert.isTrue(this.launchProcessorPipeline(uid, newFile), "the pipeline says no.");
        var location = URI.create("/podcasts/" + uid + "/status");
        log.info("sending status location as : '" + location + "'");
        return ResponseEntity.accepted().location(location).build();
    }

    private boolean launchProcessorPipeline(String uid, File newFile) {
        return true;
    }

}