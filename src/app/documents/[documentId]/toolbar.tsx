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
	HighlighterIcon,
	Link2Icon,
} from 'lucide-react'
import { ColorResult, SketchPicker } from 'react-color'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import { Separator } from '@/components/ui/separator'
import { Level } from '@tiptap/extension-heading'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ToolbarButtonProps {
	onClick?: () => void
	isActive?: boolean
	icon: LucideIcon
}

const TextColorButton = () => {
	const { editor } = useEditorStore()

	const currentColor = editor?.getAttributes('textStyle').color ?? '#000000'

	const onColorChange = (color: ColorResult) => {
		editor?.chain().focus().setColor(color.hex).run()
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						'h-7 w-7 rounded-sm hover:bg-neutral-200/80 flex flex-col items-center justify-center'
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

const HighlightButton = () => {
	const { editor } = useEditorStore()

	const currentColor = editor?.getAttributes('highlight').color

	const onColorChange = (color: ColorResult) => {
		editor?.chain().focus().toggleHighlight({ color: color.hex }).run()
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						'h-7 w-7 rounded-sm hover:bg-neutral-200/80 flex flex-col items-center justify-center'
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

const LinkButton = () => {
	const { editor } = useEditorStore()
	const [value, setValue] = useState('')
	const onUrlChange = (url: string) => {
		if (value) {
			editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
			setValue('')
		}
	}

	return (
		<DropdownMenu
			onOpenChange={(open) => {
				if (open) {
					setValue(editor?.getAttributes('link').href ?? '')
				}
			}}
		>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						'h-7 w-7 rounded-sm hover:bg-neutral-200/80 flex flex-col items-center justify-center'
					)}
				>
					<Link2Icon className='size-4' />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='flex items-center space-x-2 p-2.5'>
				<Input
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder='https://example.com'
				/>
				<Button onClick={() => onUrlChange(value)}>确定</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

const HeadingButton = () => {
	const { editor } = useEditorStore()

	const headings = [
		{ label: '普通文本', value: 0, fontSize: '16px' },
		{ label: '标题 1', value: 1, fontSize: '32px' },
		{ label: '标题 2', value: 2, fontSize: '24px' },
		{ label: '标题 3', value: 3, fontSize: '20px' },
		{ label: '标题 4', value: 4, fontSize: '18px' },
		{ label: '标题 5', value: 5, fontSize: '16px' },
	]

	const currentHeading = editor?.getAttributes('heading').level ?? 0

	const currentHeadingName =
		headings.find((item) => item.value === currentHeading)?.label ?? '普通文本'

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div
					className={cn(
						'h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm overflow-hidden outline-none'
					)}
				>
					<span className='truncate'>{currentHeadingName}</span>
					<ChevronDown className='size-4 ml-2 shrink-0' />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{headings.map((heading) => (
					<DropdownMenuCheckboxItem
						key={heading.value}
						checked={currentHeading === heading.value}
						onCheckedChange={() => {
							if (heading.value === 0) {
								editor?.chain().focus().setParagraph().run()
							} else {
								editor
									?.chain()
									.focus()
									.toggleHeading({ level: heading.value as Level })
									.run()
							}
						}}
					>
						<span>{heading.label}</span>
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
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
			<DropdownMenuTrigger asChild>
				<div
					className={cn(
						'h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm overflow-hidden outline-none'
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
			<HeadingButton />
			<Separator orientation='vertical' className='h-6 bg-neutral-300' />
			<FontFamilyButton />
			<Separator orientation='vertical' className='h-6 bg-neutral-300' />
			{sections[1].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			<HighlightButton />
			<TextColorButton />
			<Separator orientation='vertical' className='h-6 bg-neutral-300' />
			<LinkButton />
			{sections[2].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
		</div>
	)
}

export default Toolbar
