# שלב 1: בניית האפליקציה
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# העתקת קובץ הפרויקט והורדת ספריות
COPY ["TodoApi.csproj", "."]
RUN dotnet restore "TodoApi.csproj"

# העתקת שאר הקבצים ובנייה בגרסת Release
COPY . .
RUN dotnet publish "TodoApi.csproj" -c Release -o /app/publish

# שלב 2: יצירת התמונה הסופית להרצה
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# הגדרת הפורט ש-Render דורש
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "TodoApi.dll"]