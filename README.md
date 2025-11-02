# lexartApp


Para este caso adjunte .env

## Backend
BASE_URL=http://localhost:3000
DATABASE_URL=postgres://postgres:Asd1234!@localhost:5432/Lexart
AUTH_TOKEN=mentagranizada
API_KEY=elmateconbaldo


## Frontend 
VITE_API_BASE_URL=http://localhost:3000      # backend
VITE_EXTERNAL_API_KEY=elmateconbaldo          # la misma del backend



# Estructura
frontend/
  src/
    main.tsx __listo__
    App.tsx __listo__
    index.css __listo__
    routes/
      router.tsx
      ProtectedRoute.tsx
    pages/
      Login.tsx
      Register.tsx
      ProductsList.tsx
      ProductCreate.tsx
      ProductEdit.tsx
      ExternalApis.tsx
    components/
      Layout.tsx
      Navbar.tsx
      ProductCard.tsx
      ProductForm.tsx
      SearchBar.tsx
      Spinner.tsx
      EmptyState.tsx
    services/
      api.ts  __listo__
      auth.service.ts __listo__
      products.service.ts
      external.service.ts
    context/
      AuthContext.tsx
    types/
      index.ts  __listo__
