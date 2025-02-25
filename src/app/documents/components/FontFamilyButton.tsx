import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

const FontFamilyButton = () => {
	const { editor } = useEditorStore()
	const fonts = [
		{ label: 'Arial', value: 'Arial' },
		{ label: 'Georgia', value: 'Georgia' },
		{ label: 'Helvetica', value: 'Helvetica' },
		{ label: 'Times New Roman', value: 'Times New Roman' },
		{ label: 'Verdana', value: 'Verdana' },
	]
	const currentFont = editor?.getAttributes('textStyle').fontFamily ?? 'Arial'
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div
					className={cn(
						'h-7 min-w-6 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm overflow-hidden outline-none'
					)}
				>
					<span className='truncate'>{currentFont}</span>
					<ChevronDown className='size-4 ml-2 shrink-0' />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{fonts.map((font) => (
					<DropdownMenuCheckboxItem
						key={font.value}
						checked={currentFont === font.value}
						onCheckedChange={() => editor?.chain().focus().setFontFamily(font.value).run()}
					>
						<span style={{ fontFamily: font.value }}>{font.label}</span>
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default FontFamilyButton
