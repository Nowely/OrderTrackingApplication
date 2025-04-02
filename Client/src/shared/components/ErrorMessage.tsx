import { components } from '../api/orders.v1'
import { Center } from '@chakra-ui/react'

interface ErrorMessageProps {
	error: components['schemas']['ProblemDetails']
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
	console.error(error)
	return (
		<Center h="50vh">
			{`An error occurred: ${error.title}`}
		</Center>
	)
}