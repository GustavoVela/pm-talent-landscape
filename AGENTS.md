# Instrucciones de Comportamiento para Agentes

Este archivo define las reglas de operación y los estándares de calidad obligatorios para este repositorio. Todos los agentes deben adherirse a estos protocolos sin excepción.


## 📝 Protocolo de Commits y Documentación

**Regla de Oro:** Ningún cambio en el código está completo si no existe en la documentación.

1.  **Actualización del README:** Es obligatorio actualizar el archivo `README.md` en **cada commit**. 
2.  **Detalle Exhaustivo:** No se aceptan descripciones genéricas. Se debe documentar:
    * Cambios en la lógica de negocio.
    * Nuevas dependencias o variables de entorno.
    * Impacto en la arquitectura del sistema.
    * Instrucciones actualizadas para el despliegue o ejecución.
3.  **Trazabilidad:** El README debe ser la fuente de verdad absoluta sobre el estado actual del proyecto.

## 🛠️ Versiones de Prueba y Compilación

Para asegurar la estabilidad del sistema, el flujo de trabajo debe incluir:

* **Generación de Build:** Tras implementar cambios significativos, el agente debe generar una **versión compilada** específica para pruebas.
* **Validación de Artefactos:** Antes de finalizar la tarea, se debe verificar que los archivos compilados son funcionales y están listos para ser testeados en un entorno controlado.

## 🎨 Dirección de Diseño Gráfico

El diseño no es un añadido, es un requisito estructural.

* **Revisión Paso a Paso:** Es **imperativo** realizar revisiones del diseño gráfico de manera incremental. 
* **Validación Visual:** El agente tiene prohibido avanzar en implementaciones visuales de gran escala sin antes validar el diseño paso a paso. Se deben presentar propuestas de componentes, paletas y layouts para su aprobación antes de proceder con la lógica pesada del frontend.