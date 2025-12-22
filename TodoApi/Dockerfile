# שלב 1: שימוש ב-SDK של .NET 9 לבניית הפרויקט
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# העתקת קובץ הפרויקט והורדת ספריות
COPY ["TodoApi.csproj", "."]
RUN dotnet restore "TodoApi.csproj"

# העתקת שאר הקבצים ובניית הפרויקט
COPY . .
RUN dotnet publish "TodoApi.csproj" -c Release -o /app/publish

# שלב 2: יצירת תמונה קלה להרצה (Runtime)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# הגדרת פורט עבור Render
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

ENTRYPOINT ["dotnet", "TodoApi.dll"]
