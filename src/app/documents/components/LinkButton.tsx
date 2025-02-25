import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { LinkIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const LinkButton = () => {
	const { editor } = useEditorStore()
	const [value, setValue] = useState('')
	const onUrlChange = (url: string) => {
		if (value) {
			editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
			setValue('')
		}
	}

	const isActive = editor?.isActive('link') ?? false

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
						'h-7 w-7 rounded-sm hover:bg-neutral-200/80 flex flex-col items-center justify-center',
						{ 'bg-neutral-200/80': isActive }
					)}
				>
					<LinkIcon className='size-4' />
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

export default LinkButton
