package com.example.mockapi;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpHeaders;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.URI;
import java.util.ArrayList;
import java.util.Objects;

@SpringBootApplication
public class MockApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(MockApiApplication.class, args);
    }

//    @Bean
 /*   CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(100_000);
        return multipartResolver;
    }*/
}

@CrossOrigin(origins = "*")
@Log4j2
@RestController
class ApiHttpController {

    private final File file;

    ApiHttpController(@Value("file://${user.home}/Desktop/uploads") File file) {
        this.file = file;
    }

    @PostMapping("/podcasts/{uid}")
    ResponseEntity<?> beginProduction(
            @RequestParam("file") MultipartFile file,
            @PathVariable("uid") String uid
    ) throws Exception {
        var newFile = new File(this.file, uid);


        Assert.state(newFile.getParentFile().exists() || newFile.getParentFile().isDirectory() && newFile.getParentFile().mkdirs(),
                () -> "the upload directory for the new file, " + newFile.getParentFile().getAbsolutePath() + ", must exist");

        file.transferTo(newFile);
        Assert.isTrue(newFile.exists(), () -> "the file " + newFile.getAbsolutePath() + " does not exist");
        log.info("the newly POST'd file lives at " + newFile.getAbsolutePath() + '.');
        Assert.isTrue(this.launchProcessorPipeline(uid, newFile), "the pipeline says no.");
        var location = URI.create("/podcasts/" + uid + "/status");
        log.info("sending status location as : '" + location + "'");
//        String corsHeader = buildCorsHeader();
//        log.info("CORS response: " + corsHeader);
        return ResponseEntity
                .accepted()
              //  .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, corsHeader)
                .location(location).build();
    }

    private boolean launchProcessorPipeline(String uid, File newFile) {
        return true;
    }


    private final String accessControlAllowOriginHeaderValue = "https://bootifulpodcast.fm";

    private String buildCorsHeader() {
        return "http://localhost:8080";
    }

    private String buildAccessControlAllowOriginHeader(RequestEntity<?> requestEntity) {
        var localhost = "localhost:8080";
        var bootifulPodcastFmHost = "bootifulpodcast.fm";
        var list = new ArrayList<>(
                requestEntity.getHeaders().getOrDefault(HttpHeaders.REFERER.toLowerCase(), new ArrayList<>()));
        list.add(requestEntity.getHeaders().getOrigin());

        return list//
                .stream()//
                .filter(Objects::nonNull)//
                .map(String::toLowerCase)//
                .filter(host -> host.contains(localhost) || host.contains(bootifulPodcastFmHost))//
                .map(host -> (host.contains(localhost)) ? "http://" + localhost
                        : this.accessControlAllowOriginHeaderValue)//
                .findFirst()//
                .orElse(this.accessControlAllowOriginHeaderValue);
    }
}