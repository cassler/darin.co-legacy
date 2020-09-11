import React from "react";

export type LayoutSize = "small" | "medium" | "large";

export interface ILayoutProps {
	theme: unknown;
	footer?: React.ReactNode;
	children: React.ReactNode;
	header?: React.ReactNode;
	sidebar?: React.ReactNode;
	size?: LayoutSize;
}

export const Layout: React.FunctionComponent<ILayoutProps> = ({
	theme = {},
	footer = null,
	children = null,
	header = null,
	sidebar = null,
	size = "medium",
}) => {
	return (
		<>
			<div>
				{header && (
					<div className="header">
						<Space size={size}>{header}</Space>
					</div>
				)}
			</div>
			<div>
				{footer && (
					<div className="footer">
						<Space size={size}>{footer}</Space>
					</div>
				)}
				<div className="main">
					<Space size={size}>{children}</Space>
				</div>
			</div>
		</>
	);
};

export default Layout;

/** Another appended item */
type SpaceProps = {
	size: LayoutSize;
	children: React.ReactNode;
};
export const Space: React.FC<SpaceProps> = ({ size, children }) => {
	const childStyle = () => {
		switch (size) {
			case "small": {
				return { padding: "15px" };
			}
			case "large": {
				return { padding: "24px 48px" };
			}
			default: {
				return { padding: "12px" };
			}
		}
	};
	return <div style={childStyle()}>{children}</div>;
};
