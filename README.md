# 🌍 GeoNaval - Batalla Naval Educativa

Una versión educativa del clásico juego Batalla Naval donde cada casilla corresponde a un país del mundo. Los jugadores deben identificar correctamente las capitales o responder preguntas geográficas para "atacar" exitosamente.

## 🎯 Características Principales

### 🎮 Mecánica de Juego
- **Tablero 10x10** con países ocultos distribuidos aleatoriamente
- **Sistema de preguntas** sobre capitales y geografía general
- **Múltiples niveles de dificultad**: Fácil, Medio, Difícil
- **Filtros por continente**: América, Europa, Asia, África, Oceanía
- **Progresión educativa** que combina diversión con aprendizaje

### 📱 Experiencia de Usuario
- **Diseño responsivo** optimizado para móviles y tablets
- **Interfaz moderna** con efectos glassmorphism y animaciones suaves
- **Controles táctiles** intuitivos para dispositivos móviles
- **Feedback visual** inmediato con animaciones y efectos sonoros
- **Modo oscuro** automático según preferencias del sistema

### 🔊 Audio y Efectos
- **Sonidos dinámicos** generados por Web Audio API
- **Efectos diferenciados** para aciertos, fallos y victoria
- **Control de audio** con botón flotante para alternar sonido
- **Compatibilidad total** sin dependencias externas

### 💾 Persistencia de Datos
- **Almacenamiento local** de puntuaciones y estadísticas
- **Historial de partidas** con seguimiento de progreso
- **Mejor precisión** registrada automáticamente
- **Estado del juego** guardado para continuar más tarde

## 🚀 Tecnologías Utilizadas

- **Vanilla JavaScript** (ES6+) para máximo rendimiento
- **CSS3** con variables personalizadas y animaciones avanzadas
- **Vite** como bundler y servidor de desarrollo
- **Web Audio API** para efectos sonoros
- **LocalStorage API** para persistencia de datos
- **Responsive Design** con CSS Grid y Flexbox

## 📋 Instalación y Uso

### Requisitos Previos
- Node.js (versión 16 o superior)
- Navegador web moderno

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Navegar al directorio
cd geonaval

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Construcción para Producción
```bash
# Generar build optimizado
npm run build

# Previsualizar build
npm run preview
```

## 🎲 Cómo Jugar

1. **Iniciar**: Haz clic en "🚀 Comenzar Juego" para inicializar el tablero
2. **Configurar**: Selecciona dificultad y continente según tu preferencia
3. **Atacar**: Haz clic en las casillas del tablero para buscar países
4. **Responder**: Si encuentras un país, responde la pregunta geográfica
5. **Ganar**: Descubre todos los países del mapa para completar la misión

### Niveles de Dificultad
- **🟢 Fácil**: Países y capitales conocidos mundialmente
- **🟡 Medio**: Países con capitales menos conocidas
- **🔴 Difícil**: Países pequeños y capitales complejas

### Continentes Disponibles
- **🌎 América**: 15 países desde Canadá hasta Argentina
- **🌍 Europa**: 15 países con sus capitales históricas
- **🌏 Asia**: 15 países del continente más grande
- **🌍 África**: 15 países del continente africano
- **🌊 Oceanía**: 10 países e islas del Pacífico

## 📊 Sistema de Puntuación

- **Aciertos**: +1 punto por respuesta correcta
- **Precisión**: Porcentaje de aciertos vs total de intentos
- **Estadísticas**: Seguimiento de todas las partidas jugadas
- **Récords**: Mejor precisión alcanzada guardada automáticamente

## 🎨 Características de Diseño

### Paleta de Colores
- **Azul Primario**: #3b82f6 (Confianza y aprendizaje)
- **Verde Teal**: #14b8a6 (Éxito y naturaleza)
- **Púrpura Acento**: #8b5cf6 (Creatividad)
- **Verde Éxito**: #22c55e (Aciertos)
- **Rojo Error**: #ef4444 (Fallos)

### Tipografía
- **Fuente Principal**: Nunito (Google Fonts)
- **Peso**: 400 (normal), 600 (semi-bold), 700 (bold)
- **Escalado**: Responsive con clamp() para todos los dispositivos

### Animaciones
- **Micro-interacciones** en botones y casillas
- **Transiciones suaves** con cubic-bezier
- **Efectos de hover** y estados activos
- **Animaciones de feedback** para aciertos y fallos

## 📱 Compatibilidad Móvil

### Optimizaciones Táctiles
- **Área mínima de toque**: 44px según estándares de accesibilidad
- **Prevención de zoom**: Configuración de viewport optimizada
- **Gestos intuitivos**: Toques simples sin gestos complejos
- **Feedback háptico**: Visual inmediato al tocar elementos

### Breakpoints Responsivos
- **Móvil**: < 480px (diseño compacto)
- **Tablet**: 481px - 768px (diseño intermedio)
- **Desktop**: > 768px (diseño completo)

## 🔧 Arquitectura del Código

### Estructura Modular
```
src/
├── main.js              # Punto de entrada principal
├── style.css            # Estilos globales y responsive
├── data/
│   └── geography.js     # Base de datos de países y preguntas
├── game/
│   └── GameController.js # Lógica principal del juego
├── ui/
│   └── UIManager.js     # Gestión de interfaz y eventos
├── audio/
│   └── SoundManager.js  # Sistema de audio dinámico
└── utils/
    └── StorageManager.js # Persistencia de datos
```

### Principios de Desarrollo
- **Separación de responsabilidades** entre módulos
- **Código limpio** y bien documentado
- **Gestión de errores** robusta
- **Optimización de rendimiento** para dispositivos móviles

## 🎓 Valor Educativo

### Contenido Geográfico
- **75 países** distribuidos por continentes
- **Capitales oficiales** actualizadas
- **Preguntas bonus** sobre geografía física y cultural
- **Clasificación por dificultad** según reconocimiento mundial

### Beneficios Pedagógicos
- **Aprendizaje activo** mediante gamificación
- **Refuerzo positivo** con sonidos y animaciones
- **Progresión gradual** de fácil a difícil
- **Retención mejorada** a través de la repetición lúdica

## 🌟 Características Técnicas Avanzadas

### Rendimiento
- **Vanilla JavaScript** para máxima velocidad
- **CSS optimizado** con variables personalizadas
- **Lazy loading** de recursos no críticos
- **Compresión automática** en build de producción

### Accesibilidad
- **Soporte completo de teclado** para navegación
- **Etiquetas ARIA** para lectores de pantalla
- **Contraste alto** opcional para visibilidad mejorada
- **Reducción de movimiento** respetando preferencias del usuario

### Compatibilidad
- **Navegadores modernos** (Chrome, Firefox, Safari, Edge)
- **Progressive Web App** ready
- **Offline capable** con service workers (futuro)
- **Cross-platform** funcionamiento uniforme

## 📈 Métricas y Analytics

### Estadísticas Locales
- Total de partidas jugadas
- Mejor precisión alcanzada
- Países descubiertos por continente
- Tiempo promedio por partida

### Datos Educativos
- Preguntas más difíciles identificadas
- Continentes con mayor dificultad
- Progreso de aprendizaje individual

## 🔮 Roadmap Futuro

### Próximas Características
- [ ] Modo multijugador local
- [ ] Más tipos de preguntas (banderas, ubicación)
- [ ] Sistema de logros y medallas
- [ ] Exportación de estadísticas
- [ ] Modo sin conexión completo

### Mejoras Técnicas
- [ ] Service Worker para cache
- [ ] Optimización de imágenes
- [ ] Análisis de rendimiento
- [ ] Tests automatizados

## 👨‍💻 Información del Desarrollador

**César Eduardo González**  
*Analista en Sistemas*

📞 **Teléfono**: +5493884 858 907  
📧 **Email**: gonzalezeduardo_31@hotmail.com

### Experiencia
Especialista en desarrollo de aplicaciones web educativas con enfoque en experiencia de usuario y diseño responsivo. Experiencia en JavaScript moderno, CSS avanzado y arquitecturas escalables.

### Filosofía de Desarrollo
Crear aplicaciones que no solo funcionen perfectamente, sino que también proporcionen experiencias de usuario excepcionales y valor educativo real.

---

## 📄 Licencia

Este proyecto está desarrollado con fines educativos y demostrativos. 

**© 2025 César Eduardo González - Todos los derechos reservados**

---

*GeoNaval - Donde la geografía se convierte en aventura* 🗺️✨