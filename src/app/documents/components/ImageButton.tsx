import { ImageIcon } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const ImageButton = () => {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className='h-7 w-7 rounded-sm hover:bg-neutral-200/80 flex flex-col items-center justify-center'>
						<ImageIcon className='size-4' />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>{/* Add content for DropdownMenu here */}</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}

export default ImageButton
