@echo off
REM Capafest Development Container Manager - Windows Version

:menu
cls
echo ╔═══════════════════════════════════════╗
echo ║   Capafest - Docker Dev Manager      ║
echo ╚═══════════════════════════════════════╝
echo.
echo ¿Que quieres hacer?
echo.
echo 1) Iniciar contenedor (primera vez)
echo 2) Iniciar contenedor existente
echo 3) Detener contenedor
echo 4) Reiniciar contenedor
echo 5) Reconstruir contenedor
echo 6) Ver logs
echo 7) Acceder al shell del contenedor
echo 8) Instalar nueva dependencia npm
echo 9) Limpiar todo
echo 0) Salir
echo.

set /p choice="Selecciona una opcion: "

if "%choice%"=="1" goto first_start
if "%choice%"=="2" goto start
if "%choice%"=="3" goto stop
if "%choice%"=="4" goto restart
if "%choice%"=="5" goto rebuild
if "%choice%"=="6" goto logs
if "%choice%"=="7" goto shell
if "%choice%"=="8" goto install
if "%choice%"=="9" goto clean
if "%choice%"=="0" goto exit

echo Opcion invalida
pause
goto menu

:first_start
echo.
echo Construyendo e iniciando contenedor...
docker-compose build
docker-compose up
goto menu

:start
echo.
echo Iniciando contenedor...
docker-compose up
goto menu

:stop
echo.
echo Deteniendo contenedor...
docker-compose down
echo Contenedor detenido
pause
goto menu

:restart
echo.
echo Reiniciando contenedor...
docker-compose restart
echo Contenedor reiniciado
pause
goto menu

:rebuild
echo.
echo Reconstruyendo contenedor...
docker-compose down
docker-compose build --no-cache
docker-compose up
goto menu

:logs
echo.
echo Mostrando logs (Ctrl+C para salir)...
docker-compose logs -f capafest-dev
goto menu

:shell
echo.
echo Accediendo al shell del contenedor...
docker-compose exec capafest-dev sh
goto menu

:install
echo.
set /p package="Nombre del paquete a instalar: "
echo Instalando %package%...
docker-compose exec capafest-dev npm install %package%
echo Paquete instalado
pause
goto menu

:clean
echo.
echo ADVERTENCIA: Esto eliminara todos los contenedores y volumenes
set /p confirm="Estas seguro? (s/n): "
if "%confirm%"=="s" (
    docker-compose down -v
    echo Todo limpiado
    pause
)
goto menu

:exit
echo.
echo Hasta luego!
exit
