'use client'
import {
	LucideIcon,
	Redo2Icon,
	Undo2Icon,
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
	MessageSquarePlusIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import { Separator } from '@/components/ui/separator'

interface ToolbarButtonProps {
	onClick?: () => void
	isActive?: boolean
	icon: LucideIcon
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
