FROM openjdk:17
COPY ./target/api-0.0.1.jar /api.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "/api.jar" ]