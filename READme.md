### Учебный проект react-intensive Aston

Учебный проект выполнен в рамках React-интенсива компании Aston.  
Проект создан для просмотра и доступа к данным о более чем 470 000 произведений искусстваThe Metropolitan Museum of Art Collection API

## React

- функциональные компоненты c хуками в приоритете над классовыми. ☑️

- разделение компонентов на [умные](src\components\MuseumView.tsx https://github.com/Exsellent/Metropolitan-Museum/blob/master/src/components/MuseumView.tsx  src\components\MuseumText.tsx https://github.com/Exsellent/Metropolitan-Museum/blob/master/src/components/MuseumText.tsx) - и [глупые] (src\components\Spinner.tsx https://github.com/Exsellent/Metropolitan-Museum/blob/master/src/components/Spinner.tsx) ☑️

- рендеринг списков (src\components\MuseumView.tsx https://github.com/Exsellent/Metropolitan-Museum/blob/master/src/components/MuseumView.tsx) ☑️

- реализована [формs](src\Forms\LoginForm.tsx. https://github.com/Exsellent/Metropolitan-Museum/blob/master/src/Forms/LoginForm.tsx , src\Forms\RegistrationForm.tsx https://github.com/Exsellent/Metropolitan-Museum/blob/master/src/Forms/RegistrationForm.tsx) ☑️

- применение Контекст API [src\ApiContext https://github.com/Exsellent/Metropolitan-Museum/tree/master/src/ApiContext) ☑️

- применение предохранителя (src\ErrorBoundary\ErrorBoundary.tsx https://github.com/Exsellent/Metropolitan-Museum/tree/master/src/ErrorBoundary) ☑️

- написан кастомный хук [src\hooks\useAuth.tsx (https://github.com/Exsellent/Metropolitan-Museum/blob/master/src/hooks/useAuth.tsx)) ☑️

- используется PropTypes (src\components\MuseumView.tsx https://github.com/Exsellent/Metropolitan-Museum/blob/master/src/components/MuseumView.tsx) ☑️

- поиск не должен триггерить много запросов к серверу. Debounce (src\hooks\useDebounce.ts https://github.com/Exsellent/Metropolitan-Museum/blob/master/src/hooks/useDebounce.ts) ☑️

- используется lazy + Suspense(src\components\Routing.tsx https://github.com/Exsellent/Metropolitan-Museum/blob/master/src/components/Routing.tsx) ☑️


## Redux

- используется Modern Redux with Redux Toolkit https://github.com/Exsellent/Metropolitan-Museum/tree/master/src/redux ☑️

- используется [слайсы] src\features https://github.com/Exsellent/Metropolitan-Museum/tree/master/src/features) ☑️

- есть кастомная [мидлвары](src\middleware\authMiddleware.tsx, src\middleware\loggerMiddleware.tsx https://github.com/Exsellent/Metropolitan-Museum/tree/master/src/middleware)  ☑️

- используется [RTK Query](src\redux\RTKapi.ts., src\redux\UsersList.tsx https://github.com/Exsellent/Metropolitan-Museum/tree/master/src/redux) ☑️

2 уровень (необязательный)
  - Использование TypeScript  ☑️
  - Настроен CI/CD https://github.com/Exsellent/Metropolitan-Museum/tree/master/.github/workflows  ☑️
  

  

