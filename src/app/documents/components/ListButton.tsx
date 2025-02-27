import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEditorStore } from '@/store/use-editor-store';
import {
	ListIcon,
	ListOrderedIcon,
} from 'lucide-react';

const ListButton = () => {
	const {editor} = useEditorStore()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="h-7 w-7 rounded-sm hover:bg-neutral-200/80 flex flex-col items-center justify-center">
					<ListIcon className="size-4"/>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuCheckboxItem
					onCheckedChange={() => editor?.chain().focus().toggleBulletList().run()}
					checked={editor?.isActive('bulletList')}
				>
					<ListIcon className={'size-4 mr-2'}/>
					无序列表
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={editor?.isActive('orderedList')}
					onCheckedChange={() => editor?.chain().focus().toggleOrderedList().run()}
				>
					<ListOrderedIcon className={'size-4 mr-2'}/>
					有序列表
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ListButton;