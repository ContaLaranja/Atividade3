FROM eclipse-temurin:17-jdk AS build

# Define o diretório de trabalho correto (ajuste o caminho conforme a estrutura do repositório clonado no Render)
WORKDIR /app

# Copia somente a pasta do projeto Gradle (api/)
 COPY . .

# Dá permissão ao wrapper (importante em ambientes Linux)
RUN chmod +x ./gradlew

# Executa o build com Gradle
RUN ./gradlew build --no-daemon

# Etapa de execução da aplicação
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copia o .jar gerado na etapa anterior
COPY --from=build /app/build/libs/*.jar app.jar

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
