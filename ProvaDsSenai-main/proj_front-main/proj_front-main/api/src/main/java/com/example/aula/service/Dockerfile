# Etapa de build
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

COPY . .
RUN ./gradlew build --no-daemon

# Etapa de runtime
FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
