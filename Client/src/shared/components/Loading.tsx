import { Center, Spinner } from '@chakra-ui/react'

export const Loading = () => {
	return (
		<Center h="50vh">
			<Spinner color="teal.500" />
		</Center>
	)
}