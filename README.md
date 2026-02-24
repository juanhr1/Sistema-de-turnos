# Arquitectura del sistema:Turno Bank
Ingeniería de sistemas

# Roles dentro del equipo asignados:
Líder del proyecto: Valentina Samboni 
Encargado de documentación: Kenny Quiñonez 
Encargado técnico: Juan Camilo Herrera 
Encargado de presentación: Stefania Collazos

# Descripción del proyecto:
Será una plataforma diseñada para gestionar la asignación de turnos en un punto bancario, organizando los requerimientos de los usuarios en 3 tipos de atención: preferencial, asesoría y servicios generales.Teniendo como objetivo disminuir los tiempos de espera y mejorar la organización de la empresa.

# Problema que resuelve
El sistema resolvería varios problemas, entre ellos las largas filas y tiempo de espera que genera a los clientes esperar para asignar un turno, además serviría para priorizar casos especiales como personas de la tercera edad, embarazadas y trámites rápidos, mejorando así, la mala organización de la atención en un banco.

- ¿Quién lo usará?
Habrá 3 tipos de usuario: Clientes del banco: Quienes podrán ingresar desde algún dispositivo para solicitar su turno en línea, consultar el tiempo estimado de espera sin necesidad de consultar presencialmente en largas filas Personal del banco: Cajeros o asesores quienes visualizarán turnos asignados y podrán gestionar la atención de manera organizada Administradores y gerentes: Quienes tendrán un rol de control y supervisión

- ¿Qué pasaría si no existiera?
Las sucursales de bancos seguirán utilizando la asignación de turnos manual o con sistemas aislados, que implicaría desorganización y mayores tiempos de espera lo que genera para los clientes hacer filas físicas consumiéndose mayor parte de tiempo esperando por asignación de turnos y esperando el momento que lo atiendan sin conocer el estado de su turno.

# Servicios del sistema
- ¿Qué funciones principales tiene el sistema?
Registro y autenticación de clientes-usuarios. Solicitud de turnos. Servicio encargado de la asignación automática de turnos. Notificaciones en torno al estado del turno. Administración del sistema y gestión de usuario. Historial de atención y turnos.

- ¿Qué partes pueden trabajar por separado?
Al ser este un sistema de asignación de turnos distribuido, todas las ramas o partes pueden funcionar y trabajar por separado, los procesos pueden llevarse a cabo sin depender del funcionamiento interno de otros, solo intercambiando información cuando sea necesario:

Servicio de autenticación. 
Servicio de turnos. 
Servicio de notificaciones. 
Servicio de administración.

- ¿Qué procesos son independientes?
Registrar un nuevo usuario Inicio de sesión o validación de credenciales. Solicitud de turno. Asignación automática de un turno disponible. Notificar al cliente sobre su turno y su estado. CRUD Administrativo de gestión de usuarios del sistema. Registrar turno ya atendido. Historial de turnos (almacenamiento y consulta de turnos y atenciones brindadas).

# Comunicación entre servicios
- ¿Qué servicio necesita información de otro?
Para registrar un nuevo turno, la solicitud de turnos se comunica con el servidor de gestión de turnos. Para llamar al siguiente turno, el empleado necesita información del servidor gestión de información de los usuarios. Para mostrar en tiempo real qué turno está siendo atendido, la pantalla de visualización o el dispositivo necesita consultar al servidor de gestión. Para almacenar y consultar información de turnos el servidor de gestión accede a la base de datos.

- ¿Quién solicita datos?
El servicio de turnos es quien solicita usuarios. El servicio de atención se encarga de solicitar y recibir los turnos para asignarlos. El servicio que corresponde a notificaciones solicita turnos pero también usuarios mediante su identificador, número de turno y asignaciones a dicho usuario para hacer envío de la información. El servicio de autenticación es encargado de solicitar datos a la base de datos de usuarios para verificar información personal como credenciales de usuario, consulta de esa información y confirmación de identidad. El servicio de administración solicita datos a diversos otros servicios para gestionar el sistema y precisamente administrarlo, este servicio tiene grandes permisos. Al servicio de usuarios le solicita datos para hacer consulta, cambios o eliminación de cuentas, al servicio de turnos e al historial para hacer verificación, supervisión y gestión del sistema y funcionalidades.

- ¿Quién responde?
La base de datos de usuarios o ese servicio es quien responde al servicio de turnos que está solicitando (brinda la información del cliente que pide un turno). El servicio de turnos responde y entrega los turnos aún no atendidos o disponibles para su atención. El servicio de turnos responde al servicio de notificaciones entregando información acerca del turno como notificación (estado, hora, número de turno) y el servicio de usuarios brinda información de contacto del usuario para poder contactar con él, enviando el aviso. La base de datos responde al servicio de autenticación devolviendo credenciales y datos personales. La base de datos o servicio encargado de almacenar los usuarios entrega datos de cuenta al servicio de administración, el servicio de turnos brinda información acerca del estado de los turnos e información acerca de estos y asignaciones; Por último el historial le brinda los registros de atención brindada. Todo para el control adecuado del sistema.

# Tipo de Arquitectura
Se decidió emplear la arquitectura de microservicios o sistemas distribuidos debido a que permite dividir el sistema en varios servicios independientes que permiten llevar a cabo varios elementos necesarios como la escalabilidad, evitando que cada parte del sistema o los servicios en módulos se caigan todos juntos, así se mantiene el sistema funcional en sus módulos sin que se caiga una parte al hacerle mejoras o cambios.

- ¿Cuántos usuarios tendrá el sistema? El sistema podrá tener una cantidad variable de usuarios dependiendo del tamaño del Banco, inicialmente puede usar cien usuarios diarios en la sucursal como clientes solicitando turnos, empleados gestionando atención y administradores supervisando

- ¿Necesita escalar? Sí, el sistema necesita escalar debido a que debe soportar un número creciente de usuarios y solicitudes simultáneas, especialmente en horarios de alta demanda como fechas de pago o jornadas especiales. Al ser una plataforma que en un tiempo puede implementarse en múltiples sucursales, el volumen de clientes, empleados y administradores conectados al mismo tiempo puede aumentar. Por eso el sistema debe ser capaz de incrementar su capacidad de procesamiento, almacenamiento y manejo de peticiones sin afectar el rendimiento, la disponibilidad ni los tiempos de respuesta.
