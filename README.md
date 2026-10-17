# PawHome - Pet Adoption & Foster Management System

PawHome is a full-stack web application designed to connect animal shelters, foster volunteers, and adopters on a single platform.

## Tech Stack
- **Frontend:** React.js, HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Java 17, Spring Boot 3, Spring Data JPA, Spring Security
- **Database:** MySQL 8
- **Containerization:** Docker, Docker Compose

## Project Structure
```text
PawHome/
├── frontend/             # React Frontend Application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js        # Main React Component (Pet Catalog, Adoption/Foster Modals, Admin Dashboard)
│   │   ├── App.css       # Clean Modern Responsive CSS
│   │   └── index.js      # React Entrypoint
│   └── package.json
├── backend/              # Spring Boot 3 REST API
│   ├── pom.xml           # Maven Dependencies
│   └── src/main/
│       ├── java/com/pawhome/
│       │   ├── PawHomeApplication.java
│       │   ├── controller/
│       │   │   ├── AuthController.java
│       │   │   ├── PetController.java
│       │   │   └── AdoptionRequestController.java
│       │   ├── model/
│       │   │   ├── User.java
│       │   │   ├── Pet.java
│       │   │   └── AdoptionRequest.java
│       │   ├── repository/
│       │   │   ├── UserRepository.java
│       │   │   ├── PetRepository.java
│       │   │   └── AdoptionRequestRepository.java
│       │   └── security/
│       │       └── SecurityConfig.java
│       └── resources/
│           └── application.properties
└── docker-compose.yml    # Full-Stack Containerization
```

## Quick Start
1. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```
2. **Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
