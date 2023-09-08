 # Use the specified .NET SDK version and OS for the build stage
 FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
 # Set the working directory in the container to /src
 WORKDIR /app
 
 # Copy all files from the current directory to the working directory in the container
 COPY . ./
 ENV DOTNET_GENERATE_ASPNET_CERTIFICATE=false
 # Restore the necessary packages for the application
 RUN dotnet restore
 # Build the application and publish it in release mode, outputting to /app
 RUN dotnet publish -c Release -o /app/publish
 

 # Start the final stage of the build using the specified .NET SDK version
 FROM mcr.microsoft.com/dotnet/aspnet:7.0

 # Set the URLs that the application will be available at
 ENV ASPNETCORE_URLS https://+:7046;http://+:5142
 # Set the environment to Development
 ENV ASPNETCORE_ENVIRONMENT Development

 # Expose ports 7046 and 5142 for the application
 EXPOSE 7046
 EXPOSE 5142

 # Set the working directory in the container to /app
 WORKDIR /app

 # Copy the built application from the build stage to the current stage
# COPY --from=build /app .
# COPY --from=build /root/.dotnet/corefx/cryptography/x509stores/my/* /root/.dotnet/corefx/cryptography/x509stores/my/
COPY --from=build /app/publish .
 
# Set the command to run when the container starts
ENTRYPOINT [ "dotnet", "TodoListApp.dll" ]
