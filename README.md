# Sistema de turnos
Ingeniería de sistemas

# Nombre: 
Turno Bank

# Problema que resuelve:
La desorganización y largo tiempo de espera en la atención al cliente en un banco

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
  
- Servicio de notificación
      -Envío de alertas.
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
Se implementan dos tipos de comunicación:
- Comunicación Síncrona (REST API)
Usada cuando se requiere respuesta inmediata, como por ejemplo:
Cliente > servicio de turnos > Respuesta inmediata con número de turno

- Comunicación Asíncrona (EVENTOS)
Se usa mensajería basada en eventos para desacoplar servicios, como por ejemplo el siguiente flujo:
1. Servicio de turnos
2. Publica evento “TurnoCreado”
3. Servicio de notificaciones escucha el evento
4. Envía alerta al cliente.
Esto permite que si NOTIFICACIONES falla, TURNOS siga funcionando

Respondan:

1. ¿Qué servicio necesita información de otro?

El servicio de turnos necesita validar la identidad del cliente a través del servicio de autenticación antes de generar un turno.
El servicio de turnos publica un evento cuando se crea un turno, el cual es consumido por el servicio de notificaciones.
El servicio de gestión de filas necesita consultar el estado de los turnos al servicio de turnos para organizar la prioridad.
El servicio de reportes consume información del servicio de turnos mediante eventos o consultas internas controladas

2. ¿Quién solicita datos?

El servicio de turnos solicita validación de usuario al servicio de autentificación mediante comunicación REST
El servicio de Gestión de filas solicita al servicio de turnos, la lista de turnos pendientes
El servicio de notificaciones escucha eventos generados por el servicio de turnos (asíncrona)
El servicio de administración solicita métricas al servicio de reportes

Cada servicio solicita información exclusivamente a través de APIs públicas definidas, nunca accediendo directamente a bases de datos externas.

3. ¿Quién responde?
Ejemplo:
Solicita turno → Verifica información → Atención de turno

El servicio de autenticación responde a las solicitudes del servicio de turnos validando credenciales.
El servicio de turnos responde a las solicitudes del servicio de gestión de filas enviando la lista actualizada de turnos.
El servicio de notificaciones responde a eventos generados por el servicio de turnos enviando alertas al cliente
El servicio de reportes responde a solicitudes del servicio de administración proporcionando estadísticas.

# Tipo de arquitectura
Se decidió emplear la arquitectura de microservicios porque permite dividir el sistema en varios servicios independientes que permitan escalabilidad, aísla fallos y permite el mantenimiento sin detener todo el sistema.

# Base de datos
Cada servicio tiene su propia base de datos
- BD Autentificación
      Usuarios
      Roles
      Credenciales cifradas
- BD Turnos
      Número de turno
      Categoría
      Estado
      Fecha y hora
- BD Filas
      Orden de atención
      Prioridades
- BD Reportes
      Historial
  
Se debe tener en cuenta los datos críticos (Turnos activos, Estados de atención, Credenciales de acceso, Historial) para no perder la información, tener un control de todos los clientes y no presentar incomodidades operativas con el banco.

# Usuarios del sistema
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

# Riesgos y fallas

Si falla el servicio:
No se generan nuevos turnos

Si falla la base de datos:
No se pueden consultar ni registrar datos

Si falla el servidor principal:
El sistema no estaría disponible
