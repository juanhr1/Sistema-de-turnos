# Sistema-de-turnos
Ingeniería de sistemas

# Arquitectura del sistema: Nombre: 
Turno Bank

# Problema que resuelve:
La desorganización y largo tiempo de espera en la atención al cliente en un banco

# Servicios del sistema:
¿Qué funciones principales tiene el sistema?
- Registro y autenticación de clientes-usuarios.
- Solicitud de turnos.
- Servicio encargado de la asignación automática de turnos.
- Notificaciones en torno al estado del turno.
- Administración del sistema y gestión de usuario.
- Historial de atención y turnos.

¿Qué partes pueden trabajar por separado?
- Servicio de autenticación.
- Servicio de turnos.
- Servicio de notificaciones.
- Servicio de administración.

¿Qué procesos son independientes?
- Registrar un nuevo usuario
- Inicio de sesión o validación de credenciales.
- Solicitud de turno.
- Asignación automática de un turno disponible.
- Notificar al cliente sobre su turno y su estado.
- CRUD Administrativo de gestión de usuarios del sistema.
- Registrar turno ya atendido.
- Historial de turnos (almacenamiento y consulta de turnos y atenciones brindadas)

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












