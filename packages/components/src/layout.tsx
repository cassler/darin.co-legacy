import React from "react";

type Props = {
	theme: unknown
	footer?: React.ReactNode,
	children: React.ReactNode,
	header?: React.ReactNode,
	sidebar?: React.ReactNode,
	size?: LayoutSize
}

type LayoutSize = 'small' | 'medium' | 'large'

type SpaceProps = {
	size: LayoutSize,
	children: React.ReactNode
}
export const Space: React.FC<SpaceProps> = ({ size, children }) => {
	const childStyle = () => {
		switch (size) {
			case "small": {
				return { padding: '15px' }
				break;
			}
			case "large": {
				return { padding: '24px 48px' }
				break;
			}
			default: {
				return { padding: '12px' }
				break;
			}
		}
	}
	return <div style={childStyle()}>{children}</div>
}


export const Layout: React.FC<Props> = (
	{ footer, children, header, sidebar, size }
) => {



	return (
		<>
			<div>
				{header && (
					<div className='header'>
						<Space size={size}>{header}</Space>
					</div>
				)}
			</div>
			<div>
				{footer && (
					<div className='footer'>
						<Space size={size}>
							{footer}
						</Space>
					</div>
				)}
				<div className='main'>
					<Space size={size}>
						{children}
					</Space>
				</div>

			</div>
		</>
	)
}

export default Layout;
