import '@tiptap/extension-text-style'
import {Extension} from '@tiptap/react'

export type FontSizeOptions = {
	types: string[]
}

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		fontSize: {
			setFontSize: (fontSize: string) => ReturnType,
			unsetFontSize: () => ReturnType,
		}
	}
}

export const FontSize = Extension.create<FontSizeOptions>({
	name: 'fontSize',

	addOptions() {
		return {
			types: ['textStyle']
		}
	},

	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					fontSize: {
						default: null,
						parseHTML: (el: HTMLElement) => el.style.fontSize,
						renderHTML: (attributes) => {
							if (!attributes.fontSize) {
								return {}
							}
							return {
								style: `font-size: ${attributes.fontSize}`
							}
						}
					}
				}
			}
		]
	},

	addCommands() {
		return {
			setFontSize: (fontSize: string) => ({ chain }) => {
				return chain()
					.setMark('textStyle', { fontSize })
					.run()
			},
			unsetFontSize: () => ({ chain }) => {
				return chain()
					.setMark('textStyle', { fontSize: null })
					.removeEmptyTextStyle()
					.run()
			}
		}
	}
})
