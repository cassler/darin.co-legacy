/* eslint-disable no-alert */
import React from "react";
/** @jsx jsx */
import { ClassNames, css, jsx } from "@emotion/react";
import { colors } from "@cassler/color";

export type IButtonProps = {
  onClick: React.MouseEventHandler<HTMLElement>;
  size: "small" | "large" | "medium";
  className: string;
  ghost: boolean;
  danger: boolean;
  primary: boolean;
  block: boolean;
  disabled: boolean;
  children: React.ReactNode;
};

export const Button: React.FC<Partial<IButtonProps>> = ({
  size,
  primary,
  ghost,
  onClick,
  children,
  className,
}): React.ReactElement => {
  const defaultStyle = css`
    padding: 6px 12px;
    border: 2px solid var(--primary-color);
    background-color: var(--bg-color);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.033em;
    border-radius: 6px;
    color: var(--primary-color);
    outline: none;
    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
    & + .dbtn-button {
      margin-left: 6px;
    }
  `;
  const primaryStyle = css`
    color: var(--bg-color);
    background-color: var(--primary-color);
    &:hover {
      background-color: var(--primary-color);
      backdrop-filter: darken(0.2);
    }
  `;
  const ghostStyle = css`
		background-color: transparent;
		/* border: 1px solid ${colors.gray[4]}; */
	`;
  const smallStyle = css`
    padding: 4px 8px;
    font-size: 12px;
  `;
  const largeStyle = css`
    padding: 12px 18px;
  `;
  const styles = [
    defaultStyle,
    size === "small" && smallStyle,
    size === "large" && largeStyle,
    primary && primaryStyle,
    ghost && ghostStyle,
  ];

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    if (onClick) {
      (onClick as React.MouseEventHandler<
        HTMLButtonElement | HTMLAnchorElement
      >)(e);
    }
  };
  return (
    <button
      className={className ? className + "dbtn-button" : "dbtn-button"}
      type="button"
      css={styles}
      onClick={handleClick}
    >
      <>{children}</>
    </button>
  );
};
