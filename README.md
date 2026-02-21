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
Se decidió emplear la arquitectura de microservicios o una arquitectura de sistemas distribuidos debido a que permite dividir el sistema en varios servicios independientes que llevan a cabo varios elementos necesarios como la escalabilidad, evitando que cada módulo se caiga y poder mantener el sistema funcional.












