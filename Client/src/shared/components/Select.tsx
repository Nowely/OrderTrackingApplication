import { useMemo } from 'react'
import { createListCollection, Select as BaseSelect } from '@chakra-ui/react'

interface SelectProps {
	options: { label: string; value: string }[]
	placeholder: string
}

export const Select = ({ options, placeholder }: SelectProps) => {
	const innerOptions = useMemo(() => {
		return createListCollection({
			items: options
		})
	}, [options])

	return (
		<BaseSelect.Root name="status" collection={innerOptions} size="sm" width="320px">
			<BaseSelect.HiddenSelect />
			<BaseSelect.Control>
				<BaseSelect.Trigger>
					<BaseSelect.ValueText placeholder="Выберите статус" />
				</BaseSelect.Trigger>
				<BaseSelect.IndicatorGroup>
					<BaseSelect.Indicator />
				</BaseSelect.IndicatorGroup>
			</BaseSelect.Control>

			<BaseSelect.Positioner>
				<BaseSelect.Content>
					{innerOptions.items.map((value) => (
						<BaseSelect.Item item={value} key={value.value}>
							{value.label}
							<BaseSelect.ItemIndicator />
						</BaseSelect.Item>
					))}
				</BaseSelect.Content>
			</BaseSelect.Positioner>
		</BaseSelect.Root>
	)
}