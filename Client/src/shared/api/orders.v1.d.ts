/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
	'/api/v1/orders/{id}': {
		parameters: {
			query?: never
			header?: never
			path?: never
			cookie?: never
		}
		/** Получение информации о заказе по его идентификатору */
		get: {
			parameters: {
				query?: never
				header?: never
				path: {
					id: number
				}
				cookie?: never
			}
			requestBody?: never
			responses: {
				/** @description OK */
				200: {
					headers: {
						[name: string]: unknown
					}
					content: {
						'application/json': components['schemas']['OrderGet']
					}
				}
				/** @description Bad Request */
				400: {
					headers: {
						[name: string]: unknown
					}
					content: {
						'application/problem+json': components['schemas']['HttpValidationProblemDetails']
					}
				}
				/** @description Not Found */
				404: {
					headers: {
						[name: string]: unknown
					}
					content: {
						'application/problem+json': components['schemas']['ProblemDetails']
					}
				}
				/** @description Internal Server Error */
				500: {
					headers: {
						[name: string]: unknown
					}
					content: {
						'application/json': components['schemas']['ProblemDetails']
					}
				}
			}
		}
		put?: never
		post?: never
		delete?: never
		options?: never
		head?: never
		patch?: never
		trace?: never
	}
	'/api/v1/orders': {
		parameters: {
			query?: never
			header?: never
			path?: never
			cookie?: never
		}
		/** Получение списка запросов */
		get: {
			parameters: {
				query?: never
				header?: never
				path?: never
				cookie?: never
			}
			requestBody?: never
			responses: {
				/** @description OK */
				200: {
					headers: {
						[name: string]: unknown
					}
					content: {
						'application/json': components['schemas']['OrderItem'][]
					}
				}
				/** @description Internal Server Error */
				500: {
					headers: {
						[name: string]: unknown
					}
					content: {
						'application/json': components['schemas']['ProblemDetails']
					}
				}
			}
		}
		put?: never
		/** Создание нового заказа */
		post: {
			parameters: {
				query?: never
				header?: never
				path?: never
				cookie?: never
			}
			requestBody: {
				content: {
					'application/json': components['schemas']['OrderCreate']
				}
			}
			responses: {
				/** @description Created */
				201: {
					headers: {
						[name: string]: unknown
					}
					content: {
						'application/json': components['schemas']['OrderGet']
					}
				}
				/** @description Internal Server Error */
				500: {
					headers: {
						[name: string]: unknown
					}
					content: {
						'application/json': components['schemas']['ProblemDetails']
					}
				}
			}
		}
		/** Удаление заказа */
		delete: {
			parameters: {
				query: {
					Ids: number[]
				}
				header?: never
				path?: never
				cookie?: never
			}
			requestBody?: never
			responses: {
				/** @description No Content */
				204: {
					headers: {
						[name: string]: unknown
					}
					content?: never
				}
				/** @description Internal Server Error */
				500: {
					headers: {
						[name: string]: unknown
					}
					content: {
						'application/json': components['schemas']['ProblemDetails']
					}
				}
				/** @description Not Implemented */
				501: {
					headers: {
						[name: string]: unknown
					}
					content: {
						'application/problem+json': components['schemas']['ProblemDetails']
					}
				}
			}
		}
		options?: never
		head?: never
		patch?: never
		trace?: never
	}
	'/api/v1/orders/status': {
		parameters: {
			query?: never
			header?: never
			path?: never
			cookie?: never
		}
		get?: never
		/** Обновление статуса заказа */
		put: {
			parameters: {
				query?: never
				header?: never
				path?: never
				cookie?: never
			}
			requestBody: {
				content: {
					'application/json': components['schemas']['OrderStatusUpdate']
				}
			}
			responses: {
				/** @description Created */
				201: {
					headers: {
						[name: string]: unknown
					}
					content: {
						'application/json': components['schemas']['OrderGet']
					}
				}
				/** @description Not Found */
				404: {
					headers: {
						[name: string]: unknown
					}
					content: {
						'application/problem+json': components['schemas']['ProblemDetails']
					}
				}
				/** @description Internal Server Error */
				500: {
					headers: {
						[name: string]: unknown
					}
					content: {
						'application/json': components['schemas']['ProblemDetails']
					}
				}
			}
		}
		post?: never
		delete?: never
		options?: never
		head?: never
		patch?: never
		trace?: never
	}
	'/api/v1/orders/status/subscribtion': {
		parameters: {
			query?: never
			header?: never
			path?: never
			cookie?: never
		}
		/** Подписка на изменение статуса заказов. Используется Server-Sent Events */
		get: {
			parameters: {
				query?: never
				header?: never
				path?: never
				cookie?: never
			}
			requestBody?: never
			responses: {
				/** @description Internal Server Error */
				500: {
					headers: {
						[name: string]: unknown
					}
					content: {
						'application/json': components['schemas']['ProblemDetails']
					}
				}
			}
		}
		put?: never
		post?: never
		delete?: never
		options?: never
		head?: never
		patch?: never
		trace?: never
	}
}
export type webhooks = Record<string, never>
export interface components {
	schemas: {
		HttpValidationProblemDetails: {
			type?: string | null
			title?: string | null
			/** Format: int32 */
			status?: number | null
			detail?: string | null
			instance?: string | null
			errors: {
				[key: string]: string[]
			} | null
		} & {
			[key: string]: unknown
		}
		/** @description Dto создания заказа */
		OrderCreate: {
			/** @description Описание заказа */
			description: string | null
		}
		/** @description Dto информации об заказе */
		OrderGet: {
			/**
			 * Format: int32
			 * @description Идентификатор
			 */
			id: number
			/**
			 * Format: date-time
			 * @description Дата создания
			 */
			createdAt: string
			/**
			 * Format: date-time
			 * @description Дата изменения
			 */
			updatedAt: string
			/**
			 * Format: int32
			 * @description Номер заказа
			 */
			orderNumber: number
			status: components['schemas']['OrderStatus']
			/** @description Описание заказа */
			description: string | null
		}
		/** @description Dto информации об заказе */
		OrderItem: {
			/**
			 * Format: int32
			 * @description Идентификатор
			 */
			id: number
			/**
			 * Format: int32
			 * @description Номер заказа
			 */
			orderNumber: number
			/**
			 * Format: date-time
			 * @description Дата создания
			 */
			createdAt: string
		}
		/**
		 * @description Статус заказа
		 * @enum {string}
		 */
		OrderStatus: 'Created' | 'Shipped' | 'Delivered' | 'Cancelled'
		/** @description Dto обновления статуса заказа */
		OrderStatusUpdate: {
			/**
			 * Format: int32
			 * @description Идентификатор
			 */
			id: number
			status: components['schemas']['OrderStatus']
		}
		ProblemDetails: {
			type?: string | null
			title?: string | null
			/** Format: int32 */
			status?: number | null
			detail?: string | null
			instance?: string | null
		} & {
			[key: string]: unknown
		}
	}
	responses: never
	parameters: never
	requestBodies: never
	headers: never
	pathItems: never
}
export type $defs = Record<string, never>
export type operations = Record<string, never>
