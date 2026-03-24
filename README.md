# Semantic IoT Search Engine (OpenHAB + SSN/SOSA)

## Опис проєкту
Цей проєкт реалізує семантичний пошуковий рушій для IoT-пристроїв на основі онтологій SSN/SOSA та семантичної моделі OpenHAB.

Система дозволяє знаходити пристрої не за простими ключовими словами, а за:
- їхніми можливостями (sensor / actuator)
- фізичними властивостями (temperature, humidity тощо)
- контекстом (location)
- семантичними зв’язками

### Архітектура системи
Проєкт складається з 4 основних шарів:

### OpenHAB Semantic Model
- items (пристрої)
- metadata (SSN/SOSA анотації)

### Semantic Engine (Node.js)
- обробка запитів
- семантичне зіставлення
- ранжування результатів

### Reasoning Layer
- визначення типу пристрою (Sensor / Actuator)
- інференс можливостей

### Web Dashboard
- інтерфейс пошуку
- відображення результатів

## Онтологія (SSN/SOSA)
![Ontology Diagram](https://github.com/user-attachments/assets/c3143b29-3bf8-4c08-b879-f930d4737d35)

## Мова запитів (SPARQL-like)
Система підтримує спрощену семантичну мову запитів:

### Приклади:
```bash
FIND devices WHERE observes="temperature"
FIND devices WHERE location="LivingRoom"
FIND actuator WHERE observes="light"
```
## Алгоритм пошуку
Результати ранжуються за формулою:
score = 0.6 × збіг властивості (observes) + 0.3 × збіг локації (location) + 0.1 × контекстна релевантність

## Семантичні можливості
- Визначення типу пристрою (Sensor / Actuator)
- Контекстно-залежний пошук
- Семантичне ранжування результатів
- Інференс можливостей пристроїв

## Запуск проєкту

### 1. Запустити сервер
```bash
cd services
node server.js
```
### 2. Відкрити інтерфейс
Відкрити файл: ui/dashboard.html або через Live Server у VS Code

### Приклад використання
Запит:
```bash
FIND devices WHERE observes="temperature"
```
Результат:
```bash
LivingRoom_Temperature (score 0.9)
Kitchen_Temperature (score 0.6)
```
### Інтеграція з OpenHAB
Система використовує:
- semantic.items — опис пристроїв
- semantic.metadata — SSN/SOSA анотації
- rules — базові правила інференсу
- transform JSON-LD контекст

### Структура проєкту
openhab/
├── conf/
│   ├── items/
│   ├── metadata/
│   ├── rules/
│   └── transform/

services/
├── query-engine.js
├── similarity.js
├── semantic-reasoner.js
└── server.js

ui/
├── dashboard.html
└── app.js

### Результат
Проєкт демонструє:
- використання онтологій SSN/SOSA
- семантичний пошук IoT пристроїв
- ранжування результатів
- просту реалізацію SPARQL-like мови
- інтеграцію з OpenHAB концепцією
