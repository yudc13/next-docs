import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ImageIcon, SearchIcon, UploadIcon } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useEditorStore } from '@/store/use-editor-store'
import { useState } from 'react';

const ImageButton = () => {
	const { editor } = useEditorStore()

	const [imageUrl, setImageUrl] = useState('')
	const [openImageDialog, setOpenImageDialog] = useState(false)

	const onUpload = () => {
		const input = document.createElement('input')
		input.type = 'file'
		input.accept = 'image/*'
		input.onchange = (e) => {
			const file = (e.target as HTMLInputElement).files?.[0]
			if (file) {
				const reader = new FileReader()
				reader.onload = (e) => {
					const src = e.target?.result as string
					editor?.chain().focus().setImage({ src }).run()
				}
				reader.readAsDataURL(file)
			}
		}
		input.click()
	}

	const onImageUrlSubmit = () => {
		if (imageUrl) {
			editor?.chain().focus().setImage({ src: imageUrl }).run()
			setOpenImageDialog(false)
			setImageUrl('')
		}
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className='h-7 w-7 rounded-sm hover:bg-neutral-200/80 flex flex-col items-center justify-center'>
						<ImageIcon className='size-4' />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={onUpload}>
						<UploadIcon className={'size-4 mr-2'} />
						上传图片
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpenImageDialog(true)}>
						<SearchIcon className={'size-4 mr-2'} />
						输入图片地址
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Dialog open={openImageDialog} onOpenChange={setOpenImageDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>插入图片地址</DialogTitle>
					</DialogHeader>
					<Input
						placeholder={'请输入图片地址'}
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								onImageUrlSubmit()
							}
						}}
					/>
					<DialogFooter>
						<Button onClick={onImageUrlSubmit}>确定</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default ImageButton
