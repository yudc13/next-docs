'use client'
import AlignmentButton from '@/app/documents/components/AlignmentButton';
import ListButton from '@/app/documents/components/ListButton';
import {
	LucideIcon,
	Redo2Icon,
	Undo2Icon,
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
	MessageSquarePlusIcon,
} from 'lucide-react'

import { useEditorStore } from '@/store/use-editor-store'
import { Separator } from '@/components/ui/separator'
import ToolbarButton from '@/app/documents/components/ToolbarButton'
import FontFamilyButton from '@/app/documents/components/FontFamilyButton'
import HeadingButton from '@/app/documents/components/HeadingButton'
import HighlightButton from '@/app/documents/components/HighlightButton'
import LinkButton from '@/app/documents/components/LinkButton'
import TextColorButton from '@/app/documents/components/TextColorButton'
import ImageButton from '@/app/documents/components/ImageButton'
import FontSizeButton from '@/app/documents/components/FontSizeButton';

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
			<FontSizeButton />
			<Separator orientation='vertical' className='h-6 bg-neutral-300' />
			{sections[1].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			<HighlightButton />
			<TextColorButton />
			<Separator orientation='vertical' className='h-6 bg-neutral-300' />
			<LinkButton />
			<ImageButton />
			<AlignmentButton />
			<ListButton />
			{sections[2].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
		</div>
	)
}

export default Toolbar
