# Architecture Diagrams - UniKalkulus Mobile App

This directory contains automatically generated architecture diagrams created using **Arkit**.

## 📊 Generated Diagrams

### 1. **architecture-diagram.svg**
- **Full application architecture** showing all components and dependencies
- Includes all app screens, config files, and data files
- Shows relationships between different modules
- **View this file** to see the complete system structure

### 2. **app-components-diagram.svg**
- **Focused view** of app components (screens) and config
- Cleaner diagram showing only the main application logic
- Excludes external dependencies for clarity
- **Best for understanding** the core app structure

### 3. **architecture-diagram.puml**
- **PlantUML source file** for the architecture diagram
- Can be customized and edited
- Can be converted to other formats (PNG, SVG, etc.)

---

## 🔍 How to View the Diagrams

### Option 1: Open SVG files directly
- Double-click on `architecture-diagram.svg` or `app-components-diagram.svg`
- Opens in your default browser
- Can zoom in/out for details

### Option 2: View in VS Code
- Install **"SVG Viewer"** extension
- Right-click on SVG file → "Open with SVG Viewer"

### Option 3: Convert PlantUML to other formats
- Visit: https://www.plantuml.com/plantuml/uml/
- Copy contents of `architecture-diagram.puml`
- Paste and generate PNG/SVG

---

## 📁 Architecture Overview

The diagrams show:

### App Components (Blue/Green boxes):
- **app/_layout.js** - Root layout with routing
- **app/index.js** - Home screen with material sections
- **app/login.js** - Authentication screen (Email + Google)
- **app/profile.js** - User profile and quiz history
- **app/quiz.js** - Quiz interface and scoring
- **app/material.js** - Learning material WebView

### Configuration (Yellow boxes):
- **config/firebase.js** - Firebase initialization and auth

### Data (Purple boxes):
- **data/quizData.js** - Quiz questions and answers

### Dependencies (Gray boxes):
- Shows external npm packages used (Firebase, Expo Router, etc.)

---

## 🔄 Regenerating Diagrams

If you make changes to the code and want to update the diagrams:

### Full architecture diagram:
```bash
npx arkit -o architecture-diagram.svg
```

### App components only:
```bash
npx arkit app/ config/ -o app-components-diagram.svg
```

### PlantUML format:
```bash
npx arkit -f puml -o architecture-diagram.puml
```

---

## 🎨 Understanding the Diagram

### Box Colors:
- 🟦 **Blue** - Main application components
- 🟩 **Green** - Configuration files
- 🟪 **Purple** - Data/Constants
- ⬜ **Gray** - External dependencies

### Arrows:
- **→** Solid arrow = Direct import/dependency
- **-->** Dashed arrow = Indirect/dynamic dependency

### Component Labels:
- Format: `path/to/file.js`
- Grouped by directory structure

---

## 📦 Component Relationships

```
_layout.js (Root)
    ├── index.js (Home)
    │   ├── material.js (Learning)
    │   └── quiz.js (Assessment)
    │       └── quizData.js
    ├── login.js (Auth)
    │   └── firebase.js
    └── profile.js (User Info)
        └── firebase.js
```

---

## 🛠️ Tools Used

- **Arkit** v1.6.x - Architecture visualization
- **PlantUML** - Diagram generation
- **SVG** - Scalable Vector Graphics output

---

## 📝 Notes

- Diagrams are auto-generated from code analysis
- May not show dynamic imports or runtime dependencies
- Best used alongside ERD_UML_DIAGRAM.md for complete understanding
- Diagrams update automatically when you regenerate them

---

## 🎯 Next Steps

1. **View the diagrams** to understand the app structure
2. **Compare with ERD_UML_DIAGRAM.md** for data model details
3. **Use diagrams in documentation** or presentations
4. **Regenerate after major code changes**

Enjoy exploring the architecture! 🚀
