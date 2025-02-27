import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEditorStore } from '@/store/use-editor-store';
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';

const AlignmentButton = () => {
	const {editor} = useEditorStore()

	const onAlign = (align: string) => {
		editor?.chain().focus().setTextAlign(align).run()
	}

	const isChecked = ( align: string) => editor?.isActive({ textAlign: align})

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 w-7 rounded-sm hover:bg-neutral-200/80 flex flex-col items-center justify-center">
					<AlignLeftIcon className="size-4"/>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuCheckboxItem
					onCheckedChange={() => onAlign('left')}
					checked={isChecked('left')}
				>
					<AlignLeftIcon className={'size-4 mr-2'}/>
					居左对齐
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={isChecked('center')}
					onCheckedChange={() => onAlign('center')}
				>
					<AlignCenterIcon className={'size-4 mr-2'}/>
					居中对齐
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={isChecked('right')}
					onCheckedChange={() => onAlign('right')}
				>
					<AlignRightIcon className={'size-4 mr-2'}/>
					居右对齐
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={isChecked('justify')}
					onCheckedChange={() => onAlign('justify')}
				>
					<AlignJustifyIcon className={'size-4 mr-2'}/>
					两端对齐
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AlignmentButton;