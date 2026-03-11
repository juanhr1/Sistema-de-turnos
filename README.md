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