package org.example.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/redirect")
@Tag(name = "Redirect", description = "URL redirection and response management")
public class RedirectController {

    @GetMapping("/external")
    @Operation(summary = "Redirect to external URL", description = "Redirects to an external URL with custom headers")
    public void redirectExternal(
            @Parameter(description = "Target URL") @RequestParam String url,
            @Parameter(description = "Custom header value") @RequestParam(required = false) String headerValue,
            HttpServletResponse response) throws IOException {

        if (headerValue != null && !headerValue.isEmpty()) {
            response.setHeader("X-Custom-Header", headerValue);
        }

        response.setHeader("Location", url);
        response.setStatus(HttpServletResponse.SC_MOVED_TEMPORARILY);
    }

    @PostMapping("/custom-response")
    @Operation(summary = "Custom response headers", description = "Returns response with custom headers")
    public ResponseEntity<Map<String, Object>> customResponse(
            @Parameter(description = "Custom header name") @RequestParam String headerName,
            @Parameter(description = "Custom header value") @RequestParam String headerValue,
            @RequestBody(required = false) Map<String, Object> body) {

        HttpHeaders headers = new HttpHeaders();
        headers.add(headerName, headerValue);

        Map<String, Object> responseBody = body != null ? body : Map.of(
            "status", "success",
            "message", "Custom headers applied"
        );

        return new ResponseEntity<>(responseBody, headers, HttpStatus.OK);
    }

    @GetMapping("/content-disposition")
    @Operation(summary = "Set content disposition", description = "Returns response with content disposition header")
    public void setContentDisposition(
            @Parameter(description = "Filename") @RequestParam String filename,
            @Parameter(description = "Disposition type") @RequestParam(required = false, defaultValue = "attachment") String disposition,
            HttpServletResponse response) throws IOException {

        String dispositionHeader = disposition + "; filename=" + filename;
        response.setHeader("Content-Disposition", dispositionHeader);
        response.setContentType("application/octet-stream");
        response.getWriter().write("File content for: " + filename);
    }
}
