import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { ColorResult, SketchPicker } from 'react-color'

const TextColorButton = () => {
	const { editor } = useEditorStore()

	const currentColor = editor?.getAttributes('textStyle').color ?? '#000000'

	const onColorChange = (color: ColorResult) => {
		editor?.chain().focus().setColor(color.hex).run()
	}

	const isActive = editor?.isActive('textStyle') ?? false

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						'h-7 w-7 rounded-sm hover:bg-neutral-200/80 flex flex-col items-center justify-center',
						{ 'bg-neutral-200/80': isActive }
					)}
				>
					<span className='text-sm leading-4'>A</span>
					<div className='w-4 h-0.5' style={{ backgroundColor: currentColor }}></div>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<SketchPicker color={currentColor} onChange={onColorChange} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default TextColorButton
