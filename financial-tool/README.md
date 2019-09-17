# 1. Backend

## 1.1 Creare proiect initial npm 
Pentru a crea un proiect cu NodeJS si NPM se ruleaza comanda: <br />
***npm init*** <br />
Aceasta comanda creaza un fisier **_package.json_**  care are urmatoarele elemente:
- **_name_**: seteaza numele aplicatiei/pachetului
- **_version_**: indica versiunea curenta
- **_description_**: o scurta descriere a aplicatiei
- **_main_**: seteaza *entry point-ul* aplicatiei = unde se executa primele instructiuni ale programului
- **_private_**: daca e setat **_true_** previne ca aplicatia/pachetul sa fie publicate acccidental pe npm
- **_scripts_**: defineste un set de instructiuni care pot fi executate cu comanda **_npm start_**
- **_dependencies_**: o lista cu pachete npm care sunt instalate ca dependinte
- **_devDependencies_**: o lista cu pachete npm care sunt instalate ca dependinte de development


## 1.2 Instalare Sequelize si generare model
Pentru  a instala pachete cu npm se executa: 
```node
npm install <package_name>
```
Se instaleaza pachetul *sequelize si sequelize-cli*:
```node
npm install --save sequelize
npm install --save-dev sequelize-cli
npm install --save mysql2
```
Se testeaza instalarea sequelize-cli:
```node
npx sequelize --help
```
Se foloseste comanda:
```node
npx sequelize init
```
Creare model *Users*:
```node
npx sequelize model:generate --name Users --attributes first_name:String,last_name:String,username:String,email:String,password:String
```
Creare baza de date *agilehub*
Editare *config.json*
