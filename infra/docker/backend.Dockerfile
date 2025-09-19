# infra/docker/backend.Dockerfile
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Copy Maven build files
COPY ./backend/pom.xml .
COPY ./backend/src ./src

# Build the Spring Boot JAR
RUN ./mvnw clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
