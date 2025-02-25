'use client'

import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { Level } from '@tiptap/extension-heading'
import {
	Heading1Icon,
	Heading2Icon,
	Heading3Icon,
	Heading4Icon,
	Heading5Icon,
	Heading6Icon,
	ChevronDown,
} from 'lucide-react'

const HeadingButton = () => {
	const { editor } = useEditorStore()

	const headings = [
		{ label: '正文', value: 0 },
		{ label: '标题 1', value: 1, fontSize: '1.4rem', icon: Heading1Icon },
		{ label: '标题 2', value: 2, fontSize: '1.2rem', icon: Heading2Icon },
		{ label: '标题 3', value: 3, fontSize: '1.1rem', icon: Heading3Icon },
		{ label: '标题 4', value: 4, fontSize: '1rem', icon: Heading4Icon },
		{ label: '标题 5', value: 5, fontSize: '1rem', icon: Heading5Icon },
		{ label: '标题 6', value: 6, fontSize: '1rem', icon: Heading6Icon },
	]

	const currentHeading = editor?.getAttributes('heading').level ?? 0

	const currentHeadingName = headings.find((item) => item.value === currentHeading)?.label ?? '正文'

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div
					className={cn(
						'h-7 min-w-6 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 text-sm overflow-hidden outline-none'
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
						<span>
							{heading.icon ? (
								<heading.icon style={{ width: heading.fontSize, height: heading.fontSize }} />
							) : (
								heading.label
							)}
						</span>
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
export default HeadingButton
