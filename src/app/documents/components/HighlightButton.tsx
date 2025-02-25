import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { HighlighterIcon } from 'lucide-react'
import { ColorResult, SketchPicker } from 'react-color'

const HighlightButton = () => {
	const { editor } = useEditorStore()

	const currentColor = editor?.getAttributes('highlight').color

	const onColorChange = (color: ColorResult) => {
		editor?.chain().focus().toggleHighlight({ color: color.hex }).run()
	}

	const isActive = editor?.isActive('highlight') ?? false

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						'h-7 w-7 rounded-sm hover:bg-neutral-200/80 flex flex-col items-center justify-center',
						{ 'bg-neutral-200/80': isActive }
					)}
				>
					<HighlighterIcon className='size-4' />
					<div className='w-4 h-0.5' style={{ backgroundColor: currentColor }} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<SketchPicker color={currentColor} onChange={onColorChange} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default HighlightButton
