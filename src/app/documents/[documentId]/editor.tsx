'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StartKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import Taskitem from '@tiptap/extension-task-item'

import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

import Image from '@tiptap/extension-image'

import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import { useEditorStore } from '@/store/use-editor-store'

const Editor = () => {
	const { setEditor } = useEditorStore()
	const editor = useEditor({
		immediatelyRender: false,
		onCreate: ({ editor }) => {
			setEditor(editor)
		},
		onUpdate: ({ editor }) => {
			setEditor(editor)
		},
		onFocus: ({ editor }) => {
			setEditor(editor)
		},
		onSelectionUpdate: ({ editor }) => {
			setEditor(editor)
		},
		onBlur: ({ editor }) => {
			setEditor(editor)
		},
		onTransaction: ({ editor }) => {
			setEditor(editor)
		},
		onDestroy: () => {
			setEditor(null)
		},
		extensions: [
			StartKit,
			TaskList,
			Taskitem.configure({
				nested: true,
			}),
			Table.configure({
				resizable: true,
			}),
			TableRow,
			TableHeader,
			TableCell,
			Image.configure({
				inline: true,
				allowBase64: true,
			}),
			Underline,
			FontFamily,
			TextStyle,
			Heading,
			Paragraph,
			Text,
		],
		editorProps: {
			attributes: {
				style: 'padding-left: 56px',
				class:
					'focus:outline-none print:border-0 bg-white border border-[#c7c7c7] min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
			},
		},
		content: `
      <ul data-type="taskList">
          <li data-type="taskItem" data-checked="true">A list item</li>
          <li data-type="taskItem" data-checked="false">And another one</li>
        </ul>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
        <img src="https://placehold.co/800x400" />
    `,
	})

	return (
		<div className='size-full overflow-x-auto bg-[#F9FBFD]'>
			<div className='min-w-max flex justify-center mx-auto mt-6'>
				<EditorContent editor={editor} />
			</div>
		</div>
	)
}

export default Editor
