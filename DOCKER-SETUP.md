# 🐳 Docker Development Environment - Capafest

## Requisitos Previos

1. **Docker Desktop** instalado
   - Windows/Mac: [Descargar Docker Desktop](https://www.docker.com/products/docker-desktop)
   - Linux: `sudo apt install docker.io docker-compose`

2. **Git** configurado con tu GitHub

## 📋 Setup Inicial

### 1. Clonar tu repositorio (si no lo has hecho)
```bash
git clone https://github.com/tu-usuario/capafest-offline.git
cd capafest-offline
```

### 2. Copiar archivos de Docker
Copia estos archivos a la raíz de tu proyecto:
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`

### 3. Asegurar que tienes .env.local
```bash
# Si no existe, créalo
cp .env.local.example .env.local
# Edita con tus credenciales de Supabase
```

### 4. Construir y ejecutar el contenedor
```bash
# Construir la imagen
docker-compose build

# Iniciar el contenedor
docker-compose up
```

La aplicación estará disponible en: **http://localhost:3000**

## 🚀 Comandos Útiles

### Gestión del Contenedor
```bash
# Iniciar contenedor (en background)
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Detener contenedor
docker-compose down

# Reconstruir después de cambios en package.json
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Acceso al Contenedor
```bash
# Abrir shell dentro del contenedor
docker-compose exec capafest-dev sh

# Ejecutar comandos npm dentro del contenedor
docker-compose exec capafest-dev npm install nueva-dependencia
docker-compose exec capafest-dev npm run build
```

### Limpieza
```bash
# Eliminar contenedor y volúmenes
docker-compose down -v

# Limpiar todo Docker (cuidado!)
docker system prune -a
```

## 📁 Estructura de Volúmenes

Los siguientes directorios están **montados** (cambios en tiempo real):
- `/src` - Código fuente
- `/public` - Assets estáticos
- Archivos de configuración (tsconfig, tailwind, etc.)

Los siguientes están **aislados** en el contenedor:
- `node_modules` - Dependencias
- `.next` - Build de Next.js

## 🔄 Workflow de Desarrollo

### Desarrollo Normal
1. Inicia el contenedor: `docker-compose up`
2. Edita archivos en tu editor local (VSCode, etc.)
3. Los cambios se reflejan automáticamente en http://localhost:3000
4. Hot reload funciona normalmente

### Trabajar con Claude Code
1. Claude Code puede acceder al código dentro del contenedor
2. Tú haces los commits y push desde tu máquina local:
   ```bash
   git add .
   git commit -m "Mensaje"
   git push origin main
   ```

### Instalar Nuevas Dependencias
```bash
# Dentro del contenedor
docker-compose exec capafest-dev npm install nombre-paquete

# Reconstruir si es necesario
docker-compose down
docker-compose build
docker-compose up
```

## 🐛 Troubleshooting

### El puerto 3000 ya está en uso
```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "3001:3000"  # Usar 3001 en tu máquina
```

### Los cambios no se reflejan
```bash
# Reiniciar contenedor
docker-compose restart

# O reconstruir
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Problemas con node_modules
```bash
# Eliminar y reconstruir
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### Ver logs de errores
```bash
# Logs en tiempo real
docker-compose logs -f capafest-dev
```

## 🔒 Seguridad

- Claude Code solo tiene acceso al contenedor
- Tu sistema host está protegido
- `.env.local` se monta de forma segura
- `node_modules` aislado en el contenedor

## 📊 Recursos del Contenedor

El contenedor usa:
- **CPU**: Límite automático según Docker Desktop
- **RAM**: ~512MB en idle, ~1GB durante desarrollo
- **Disco**: ~500MB (imagen + node_modules)

## 🎯 Ventajas de este Setup

✅ Entorno aislado y reproducible
✅ Misma versión de Node.js siempre (20.x)
✅ No contamina tu sistema local
✅ Fácil de compartir con equipo
✅ Hot reload funciona perfecto
✅ Claude Code puede modificar código de forma segura

## 📝 Notas Importantes

1. **No commites** `node_modules` ni `.next` (ya están en .gitignore)
2. **Sí commiteas** los archivos Docker (Dockerfile, docker-compose.yml)
3. **Nunca commitees** `.env.local` (datos sensibles)
4. Los cambios en archivos de configuración requieren rebuild
5. Los cambios en código fuente se reflejan inmediatamente

## 🎉 ¡Listo!

Ahora tienes un entorno profesional de desarrollo. Cualquier cambio que hagas se verá en tiempo real en http://localhost:3000
