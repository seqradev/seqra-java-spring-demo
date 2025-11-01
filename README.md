# Static Analysis Showcase: Java Spring Demo

A comprehensive Spring Boot demonstration application designed to test and compare static analysis tools' capabilities in detecting XSS (Cross-Site Scripting) vulnerabilities across different complexity levels.

## Test Cases Overview

The application includes five progressively complex XSS vulnerability patterns:

1. **Direct user input return**
2. **Local variable assignment**
3. **Inter-procedural flow**
4. **Constructor chains and field sensitivity**
5. **Builder pattern and virtual method calls**

## Security Analysis Rules

The project includes `xss.yaml` with Semgrep rules:

- **pattern-concat.xss**: Detects string concatenation with user parameters in controller methods without proper escaping
- **pattern.xss**: Identifies direct return of user parameters from controller methods without sanitization
- **taint.xss**: Performs taint analysis tracking data flow from controller parameters to return statements, recognizing `HtmlUtils.htmlEscape()` as a sanitizer

## Testing XSS Vulnerabilities

⚠️ **Warning**: This application contains intentional security vulnerabilities for educational and testing purposes. **Never deploy to production.**
