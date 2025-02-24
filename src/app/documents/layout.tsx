interface DocumentLayoutProps {
	children: React.ReactNode
}

const DocumentLayout = ({ children }: DocumentLayoutProps) => {
	return (
		<div>
			<nav>document layout</nav>
			{children}
		</div>
	)
}

export default DocumentLayout
