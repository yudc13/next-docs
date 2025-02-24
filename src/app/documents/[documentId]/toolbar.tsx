'use client'
import {
	LucideIcon,
	Redo2Icon,
	Undo2Icon,
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
	MessageSquarePlusIcon,
	ChevronDown,
} from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import { Separator } from '@/components/ui/separator'

interface ToolbarButtonProps {
	onClick?: () => void
	isActive?: boolean
	icon: LucideIcon
}

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
			<DropdownMenuTrigger>
				<button
					className={cn(
						'h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm overflow-hidden'
					)}
				>
					<span className='truncate'>{currentFont}</span>
					<ChevronDown className='size-4 ml-2 shrink-0' />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{fonts.map((font) => (
					<DropdownMenuItem
						key={font.value}
						onClick={() => editor?.chain().focus().setFontFamily(font.value).run()}
					>
						<DropdownMenuLabel className={`${currentFont === font.value ? 'font-bold' : ''}`}>
							{font.label}
						</DropdownMenuLabel>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

const ToolbarButton = ({ onClick, isActive, icon: Icon }: ToolbarButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
				isActive && 'bg-neutral-200/80'
			)}
		>
			<Icon className='size-4' />
		</button>
	)
}

const Toolbar = () => {
	const { editor } = useEditorStore()

	const sections: {
		label: string
		icon: LucideIcon
		isActive: boolean
		onClick: () => void
	}[][] = [
		[
			{
				label: '撤销',
				icon: Undo2Icon,
				isActive: false,
				onClick: () => editor?.chain().focus().undo().run(),
			},
			{
				label: '重做',
				icon: Redo2Icon,
				isActive: false,
				onClick: () => editor?.chain().focus().redo().run(),
			},
		],
		[
			{
				label: '粗体',
				icon: BoldIcon,
				isActive: editor?.isActive('bold') ?? false,
				onClick: () => editor?.chain().focus().toggleBold().run(),
			},
			{
				label: '斜体',
				icon: ItalicIcon,
				isActive: editor?.isActive('italic') ?? false,
				onClick: () => editor?.chain().focus().toggleItalic().run(),
			},
			{
				label: '下划线',
				icon: UnderlineIcon,
				isActive: editor?.isActive('underline') ?? false,
				onClick: () => editor?.chain().focus().toggleUnderline().run(),
			},
		],
		[
			{
				label: '评论',
				icon: MessageSquarePlusIcon,
				isActive: false,
				onClick: () => {},
			},
		],
	]
	return (
		<div className='px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto bg-[#F1F4F9]'>
			{sections[0].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			<Separator orientation='vertical' className='h-6 bg-neutral-300' />
			<FontFamilyButton />
			<Separator orientation='vertical' className='h-6 bg-neutral-300' />
			{sections[1].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			<Separator orientation='vertical' className='h-6 bg-neutral-300' />
			{sections[2].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
		</div>
	)
}

export default Toolbar
