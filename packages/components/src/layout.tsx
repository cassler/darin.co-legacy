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
}) => (
  <div className="layout-contain">
    {header && (
      <div className="layout-header">
        <div className="layout-inner">
          <Space size={size}>{header}</Space>
        </div>
      </div>
    )}
    <div className="layout-main">
      <div className="layout-inner">
        <Space size={size}>{children}</Space>
      </div>
    </div>
    {footer && (
      <div className="layout-footer">
        <div className="layout-inner">
          <Space size={size}>{footer}</Space>
        </div>
      </div>
    )}
  </div>
);

export default Layout;

/** Another appended item */
type SpaceProps = {
  size: LayoutSize;
  children: React.ReactNode;
};
export const Space: React.FC<SpaceProps> = ({ size, children }) => {
  const childStyle = () => {
    const base = { width: "var(--content-width)" };
    switch (size) {
      case "small": {
        return { ...base, padding: "15px" };
      }
      case "large": {
        return { ...base, padding: "24px 48px" };
      }
      default: {
        return { ...base, padding: "12px" };
      }
    }
  };
  return <div style={childStyle()}>{children}</div>;
};
