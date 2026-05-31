@echo off
echo ==============================================
echo      BUDGETMITRA DEMO RUNNER
echo ==============================================

echo [1/3] Starting ML Service (Python/FastAPI)...
cd ml
start "BudgetMitra - ML Service" cmd /k "echo Installing ML dependencies... & pip install -r requirements.txt & echo Starting ML Server on port 8000... & uvicorn main:app --reload --port 8000"
cd ..

echo [2/3] Starting Backend API (Node.js/Express)...
cd backend
start "BudgetMitra - Backend API" cmd /k "echo Installing Backend dependencies... & npm install & echo Starting Express Server on port 5000... & npm run dev"
cd ..

echo [3/3] Starting Frontend (Next.js)...
cd frontend
start "BudgetMitra - Frontend UI" cmd /k "echo Installing Frontend dependencies... & npm install & echo Starting Next.js Server on port 3000... & npm run dev"
cd ..

echo.
echo ==============================================
echo All services have been launched in new windows!
echo.
echo IMPORTANT: If the Backend window crashes, it means you need to:
echo 1. Start your local MySQL server.
echo 2. Run the db/create_tables.sql and db/seed_data.sql scripts.
echo 3. Update the DATABASE_URL in backend/.env with your password.
echo.
echo Access the app at: http://localhost:3000
echo ==============================================
pause
