# Sistema de turnos
Ingeniería de sistemas

# Arquitectura del sistema: Nombre: 
Turno Bank

# Problema que resuelve:
La desorganización y largo tiempo de espera en la atención al cliente en un banco

# Usuarios
- Clientes:
    - Solicita turnos en línea
    - Consulta tiempo estimado
    - Recibe notificaciones
- Empleado:
    - Visualiza cola de turnos
    - Llama siguiente turno
    - Registra atención realizada
 - Administrador:
    - Configura tipos de servicios
    - Supervisa
    - Consulta reportes

# Servicios del sistema:
¿Qué funciones principales tiene el sistema?
- Servicio de autenticación
      -Riesgo de usuarios.
      -Inicio de sesión.
      -Validación de credenciales.
      -Gestión de roles.
  
- Servicio de turnos
      -Generación de turnos.
      -Asignación automática por categoría.
      -Cambio de estado de turno.
      -Validación de disponibilidad.
  
- Servicio de gestión de filas
      -Organización por prioridad.
      -Manejo de atención preferencial.
      -Control de concurrencia.
      -Ordenamiento dinámico.
  
- Servicio de notificación
      - Envío de correos o alertas.
      -Avisa proximidad de turno.
      -Confirmación de turno generado.
  
- Servicio de reportes
      -Historial de atención.
      -Estadísticas de tiempos promedio.
      -Reportes por categoría.

¿Qué partes pueden trabajar por separado?
- Servicio de autenticación.
- Servicio de turnos.
- Servicio de gestión de filas.
- Servicio de notificaciones.
- Servicio de reportes.

Cada servicio se ejecuta en un contenedor independiente, tiene su propia base de datos y puede desplegarse sin afectar a los demás.

¿Qué procesos son independientes?
- Registro de usuario.
- Inicio de sesión o validación de credenciales.
- Solicitud de turno.
- Asignación automática de un turno disponible.
- Notificar al cliente sobre su turno y su estado.
- CRUD Administrativo de gestión de usuarios del sistema.
- Registrar turno ya atendido.
- Historial de turnos.

Cada proceso se comunica mediante APIs REST o eventos.

# Comunicación entre servicios
Los servicios se comunican mediante solicitudes y respuestas entre sí, siguen la lógica de cliente-servidor, cuando se registra un nuevo turno el servicio de turnos solicita información al servicio de usuarios y este responde con datos del cliente.
Cada servidor responde devolviendo la informsación requerida para que el sistema funcione de manera integrada.

# Tipo de arquitectura
Se decidió emplear la arquitectura de microservicios o una arquitectura de sistemas
distribuidos debido a que permite dividir el sistema en varios servicios independientes que
llevan a cabo varios elementos necesarios como la escalabilidad, evitando que cada módulo se
caiga y poder mantener el sistema funcional.

# Base de datos
En la base de datos del sistema deben almacenarse los usuarios (clientes, empleados y administrador), los turnos generados (número, fecha, hora y estado) y los tipos de servicio (asesoría, preferencial, servicios generales).
Se debe tener en cuenta los datos críticos para no peder la información y tener un control de todos los clientes para no presentar incomodidades operativas con el banco.

# Usuarios del sistema
El sistema será utilizado por 3 tipos de usuario y cada uno tiene unas funciones y permisos diferentes.
el administrador: se encarga de configurar el sistema, definir los tipos de servicios, revisar reportes y supervisar el funcionamiento general.
el empleado: visualiza la lista de turnos, llama al siguiente cliente y registra las atenciones realizadas
el cliente: solicita su turno desde el aplicativo, consulta el estado y tiempo de estimado de espera.

# Riesgos y fallas
Si el servicio de gestión de turnos, no se pueden generar nuevos turnos afectando directamente la atención de los clientes, por lo que se pueden implementar reintentos automáticos y notificaciones internas al personal
Si falla la base de datos, se perdería el acceso a los usuarios, los turnos activos y desorganizaría la operación diaria

por eso es fundamental contar con respaldos periodicos y mecanismos de recuperación.










