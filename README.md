# PERSONAL FINANCE TRACKER
- Manage daily transactions:
  - Create new income or expense records
  - Update transaction details directly on the table (Inline Edit)
  - Delete transaction records with confirmation
- Dynamic filtering and tracking:
  - Filter transactions by start date and end date
  - Search records by specific categories or transaction types
  - Automatically calculate the global total balance
  - Dynamically calculate the total amount of the currently filtered list
- Category management:
  - Add new categories on the fly while creating a transaction
  - Separate categories into Income or Expense types
## Technologies Used
  - Spring Boot (v3.x): Simplifies the development of the backend RESTful APIs.
  - Spring Data JPA: Provides easy integration with relational databases using JPA.
  - Spring Validation: Handles data validation for inputs (e.g., preventing negative amounts).
  - MySQL: A powerful, open-source object-relational database system.
  - Lombok: Reduces boilerplate code for model objects by generating getters and setters.
  - ReactJS (Vite): A fast and modern frontend library for building the user interface.
  - Axios: Handles HTTP requests from the frontend to the backend.
## Customization
### Database Connection
- You can customize the database connection information in the src/main/resources/application.properties file.

<img width="824" height="208" alt="image" src="https://github.com/user-attachments/assets/e7dc589b-cf36-4a8a-9dc5-ab6f9b2a7166" />

## Running the Application
  ### Prerequisites
    - Java: Ensure you have Java 17 or higher installed.
    - MySQL: Ensure your local database server is running.
    - Maven: Make sure Maven is installed.
  ### Build and Run the Backend
    1. Open the backend project in your IDE (e.g., IntelliJ IDEA).
    2. Set your environment variables (DB_USERNAME and DB_PASSWORD) in the Run/Debug Configurations.
    3. Run the FinanceApplication.java main class.
    4. The API will start at: http://localhost:8080
  ### Build and Run the Frontend
   Run the following command to install dependencies:
   
  ``` npm install ```
  
   Start the React application:
   
  ``` npm run dev ```    
  
  The web interface will be available at: 
  
  ``` http://localhost:5173 ```
  
## Using the Dashboard
Once both servers are running, access the web interface to start tracking your finances:
  - Add Records: Fill in the form on the left. Click the + Mới button next to the category dropdown to quickly add a new category.
  - Edit Records: Click the ✏️ icon on any row to turn the row into input fields. Make your changes and click ✅ to save.
  - Filter Data: Use the date pickers and dropdowns above the table. The "Tổng khoản đang lọc" (Filtered Total) will update instantly based on your conditions.
