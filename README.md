# Sistema-de-turnos
Ingeniería de sistemas

# Arquitectura del Sistema: BankFlow Manager
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
