<<<<<<< HEAD
# ¿CÓMO EJECUTAR EL ESTE PROYECTO?

1. REQUISITOS:
    - Instalar Dockerdesktop en el computador.
    - Tener en tu computador un editor de código fuente como Visual Studio Code

2. INSTRUCCIONES PARA EJECUTAR EL PROYECTO

Luego de tener descargada la carpeta principal donde está alojado el proyecto SERVICIOS_TURNOBANK o bien crear todos los archivos con su respectiva información:

    - Abre el proyecto (carpeta) en el editor de código fuente (VScode).
    - Abre una terminal en la carperta principal.
    - Asegurate que estés en la ruta indicada (ubicación de la carpeta).
    - Ejecuta el siguiente comando:
        docker-compose up --build 
        
        * Este comando realiza varias acciones en secuencia:

            - Lee el archivo docker-compose.yml del directorio actual.
            - Construye las imágenes Docker de los servicios que tengan una sección build.
            - Crea los contenedores si todavía no existen.
            - Inicia todos los servicios definidos.
            - Muestra los logs en la terminal
    
3. PRUEBA DE LOS SERVICIOS

Luego de que Docker haya construido y levantado los servicios sin errores:

    - Ingresa a la URL que muestra los logs de la terminal, por ejemplo:
            *Para el servicio de Turnos, deberás observar la URL
                        http://localhost:5002/turns
            *Para el servicio de Usuarios, deberás observar la URL
                        http://localhost:5001/users
        Verás las peticiones GET, mostrando un mensaje que cada servicio está funcionando.

A medida que vas realizando el paso a paso puedes ir comprobando u observando en Dockerdesktop la creación de las imagenes, contenedores, levantamientos de los servicios entre otros.
=======
# Sistema-de-turnos
Ingeniería de sistemas

# Arquitectura del Sistema: Turn Bank
# Problema que resuelve
Optimiza la atención al cliente eliminando las filas físicas desorganizadas. Resuelve la ineficiencia en la asignación de personal, reduce el tiempo de espera percibido y permite priorizar clientes según su perfil (ej. clientes VIP, adultos mayores o trámites específicos).

# Servicios del sistema
Servicio de Emisión de Turnos (Kiosko): Interfaz para que el cliente elija su trámite y obtenga un identificador.

Servicio de Notificación (Pantallas/SMS): Gestiona la visualización de turnos en salas de espera y alertas al móvil.

Servicio de Atención (Módulo Ejecutivo): Herramienta para que el empleado llame al siguiente cliente o derive el turno.

Servicio de Administración y Analítica: Panel de control para ver estadísticas en tiempo real y reportes históricos.

# Comunicación entre servicios
Un modelo híbrido:

REST API: Para acciones sincrónicas (configuración, login de empleados).

WebSockets (SignalR o Socket.io): Crucial para la actualización en tiempo real de las pantallas de la sala de espera cuando un ejecutivo presiona "Siguiente".

Message Broker (opcional): Para registrar eventos de auditoría sin bloquear la interfaz.

# Tipo de arquitectura
Microservicios orientada a eventos. Esto permite que, si el servicio de notificaciones por SMS falla, el kiosko de turnos y las pantallas sigan funcionando de forma independiente.

# Base de datos
Relacional (PostgreSQL / SQL Server): Para garantizar la integridad de los datos de los turnos, usuarios y configuraciones de las sucursales.

Cache (Redis): Para mantener la cola de turnos activa en memoria y asegurar una respuesta instantánea.

# Usuarios del sistema
Clientes: Usuarios finales que solicitan el servicio.

Cajeros/Ejecutivos: Personal que atiende y gestiona el flujo de personas.

Gerentes de Sucursal: Supervisan la operación y tiempos de espera.

Administradores IT: Gestionan la configuración técnica y accesos.

# Riesgos y fallas posibles
Pérdida de conectividad: Si la red cae, el sistema debe poder operar en modo "Local" o manual.

Saturación del sistema: Picos inesperados de clientes que degraden el rendimiento de la base de datos.

Desincronización de pantallas: Que un turno aparezca en la pantalla pero el ejecutivo vea a otro cliente en su sistema (se mitiga con protocolos de comunicación robustos).
>>>>>>> e19f1d4a47f1864185c62a227b7a5901b59523e9
