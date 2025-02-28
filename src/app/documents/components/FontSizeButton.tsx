import { Input } from '@/components/ui/input';
import { useEditorStore } from '@/store/use-editor-store';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { ChangeEventHandler, useState } from 'react';

const FontSizeButton = () => {
	const {editor} = useEditorStore();

	const currentFontSize = editor?.getAttributes('textStyle').fontSize?.replace('px', '') ?? '16';
	const [inputValue, setInputValue] = useState(currentFontSize)
	const [isEditing, setIsEditing] = useState(false);

	const updateFontSize = (fontSize: string) => {
		const size = parseInt(fontSize)
		if (!isNaN(size) && size > 0) {
			editor?.chain().focus().setFontSize(`${size}px`).run();
			setInputValue(size)
			setIsEditing(false)
		}
	}

	const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const value = e.target.value

		if (!Number.isNaN(parseInt(value)) && Number(value) > 0) {
			setInputValue(value)
		}
	}

	const handleInputBlur = () => {
		updateFontSize(inputValue)
	}

	const increment = () => {
		const newSize = parseInt(currentFontSize) + 1
		updateFontSize(newSize.toString(10))
	}

	const decrement = () => {
		const newSize = parseInt(currentFontSize) - 1
		if (newSize > 0) {
			updateFontSize(newSize.toString(10))
		}
	}

	return (
		<div className={'flex items-center gap-x-0.5'}>
			<button
				type={'button'}
				className={'h-7 w-7 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden outline-none'}
				onClick={decrement}
			>
				<MinusIcon className={'size-4'}/>
			</button>
			{
				isEditing
					? (
						<Input
							type={'text'}
							value={inputValue}
							onChange={handleInputChange}
							onBlur={handleInputBlur}
							className={'h-7 w-10 text-sm text-center p-0 rounded-sm border border-neutral-400  focus:outline-0 focus:ring-0'}
						/>
					)
					: (
						<button
							type={'button'}
							onClick={() => {
								setInputValue(currentFontSize)
								setIsEditing(true);
							}}
							className={'h-7 w-10 text-sm rounded-sm border border-neutral-400 hover:bg-neutral-200/80 focus:outline-0'}
						>
							{currentFontSize}
						</button>
					)
			}

			<button
				type={'button'}
				onClick={increment}
				className={'h-7 w-7 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden outline-none'}
			>
				<PlusIcon className={'size-4'}/>
			</button>
		</div>
	);
};

export default FontSizeButton;