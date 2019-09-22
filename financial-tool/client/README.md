# 1. Creare aplicatie React
## 1.1 Creare aplicatie *client*
```node
npx create-react-app client
```

## 1.2 Testare aplicatie
```node
npm start
```

## 1.3 Stergere fisiere, vor ramane doar
- App.js
- index.js
- serviceWorker.js

## 1.4 Stergere yarn.lock

## 1.5 Creare schelet aplicatie
- **_components_**: va contine componentele comune aplicatiei
- **_layouts_**: va contine layout-ul pentru rutare
- **_views_**: va contine paginile in sine

## 1.6 Stergere
- public/logo192.png
- public/logo512.png

# 2.0 Instalare si Configurare React Material
## 2.1 Instalare React Material
```node
npm install --save @material-ui/core @material-ui/icons
```
## 2.2 Modificare public/index.html
```HTML
<body>
    <!-- Material Design Font Icons -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <!-- Material Design Roboto Font -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
```

## 2.3 Stergere importuri extra din App.js si index.js
- import logo from './logo.svg';
- import './App.css';
- import './index.css';

## 2.3 Testare React Material (App.js)
```JS
import Button from '@material-ui/core/Button';
<Button variant="contained" color="primary">
      Hello World
</Button>
```
