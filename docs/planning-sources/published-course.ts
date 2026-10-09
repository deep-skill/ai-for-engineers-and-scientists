/**
 * Cursos de Deep Skill promocionados dentro del sitio del XIX CONEIMIN.
 *
 * Modelo comercial: la beca CONEIMIN cubre el curso —cuyo costo regular es
 * de USD 300— pero la inscripción exige pagar la certificación, S/ 60. No es
 * opcional: sin ese pago no se accede al curso.
 *
 * El sitio no toma datos: el botón lleva directo al producto en la tienda de
 * Odoo, que ya pide nombre, correo y teléfono en su checkout. Un formulario
 * previo duplicaba esos campos y solo añadía pasos.
 *
 * El producto en Odoo es de venta directa: no matricula en eLearning. La
 * logística de las sesiones en vivo va por fuera (correo/WhatsApp).
 */

/** Sesión en vivo del curso. El título de la sesión es también su tema. */
export type SesionCurso = {
	numero: number;
	fecha: string;
	titulo: string;
};

export type Curso = {
	slug: string;
	titulo: string;
	subtitulo: string;
	descripcion: string;
	cronograma: SesionCurso[];
	sesiones: string;
	/** Horario común a todas las sesiones. */
	horario: string;
	/** Días de la semana en que se dicta, para mostrar junto al horario. */
	dias: string;
	/** Qué recibe quien no puede asistir en vivo. */
	grabaciones: string;
	duracion: string;
	modalidad: 'Presencial' | 'Virtual' | 'Híbrido';
	herramientas: string;
	/** Precio de lista del curso, cubierto por la beca. Solo para mostrar el valor. */
	costoRegular: string;
	/** Inversión del participante: la certificación. Obligatoria para inscribirse. */
	precio: number;
	/** Producto del certificado en la tienda de Odoo (producción). */
	urlPago: string;
};

/** WhatsApp de soporte del curso. */
export const WHATSAPP_SOPORTE = '51968274296';

export const cursos: Curso[] = [
	{
		slug: 'ia-generativa-mineria',
		titulo: 'Programación y Análisis de Datos con IA Generativa para Minería',
		subtitulo: 'Curso oficial del XIX CONEIMIN 2026 · para Ingeniería y Ciencias',
		descripcion:
			'Aprende a programar y analizar datos con IA generativa aplicada a minería: de entender qué es realmente un LLM a construir tu primer agente sobre un proyecto real, con un flujo de trabajo riguroso de planificación, depuración y verificación.',
		/**
		 * Martes, jueves y sábados del 6 al 22 de octubre. La sesión 2 cae en
		 * feriado (Combate de Angamos); se dicta igual por ser virtual y de noche.
		 */
		cronograma: [
			{ numero: 1, fecha: 'Martes 6 de Octubre', titulo: '¿Qué es realmente un LLM?' },
			{
				numero: 2,
				fecha: 'Jueves 8 de Octubre',
				titulo: 'Del chat al agente: contexto, RAG, tools y agentes'
			},
			{
				numero: 3,
				fecha: 'Sábado 10 de Octubre',
				titulo: 'Cultura de cómputo: sistema operativo, archivos y terminal'
			},
			{
				numero: 4,
				fecha: 'Martes 13 de Octubre',
				titulo: 'Git y tu primer agente en un proyecto real'
			},
			{
				numero: 5,
				fecha: 'Jueves 15 de Octubre',
				titulo: 'Programación dirigida por IA: fundamentos con rigor'
			},
			{
				numero: 6,
				fecha: 'Sábado 17 de Octubre',
				titulo: 'Flujo de trabajo agéntico: planear, depurar y verificar'
			},
			{
				numero: 7,
				fecha: 'Martes 20 de Octubre',
				titulo: 'Análisis de datos con IA: del dato al insight en minería'
			},
			{
				numero: 8,
				fecha: 'Jueves 22 de Octubre',
				titulo: 'Proyecto integrador de ingeniería/minería'
			}
		],
		sesiones: '8 sesiones en vivo',
		horario: '8:00 p. m. - 10:00 p. m.',
		dias: 'Martes, jueves y sábados',
		grabaciones: 'Acceso a la grabación de cada sesión',
		duracion: '16 horas',
		modalidad: 'Virtual',
		herramientas: 'Python, Git y Claude Code',
		costoRegular: 'USD 300',
		precio: 60,
		urlPago:
			'https://www.deepskill.space/shop/certificado-programacion-y-analisis-de-datos-con-ia-generativa-para-mineria-102'
	}
];

export function getCursoBySlug(slug: string): Curso | undefined {
	return cursos.find((c) => c.slug === slug);
}
