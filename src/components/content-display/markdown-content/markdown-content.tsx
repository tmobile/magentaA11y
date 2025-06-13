/* eslint-disable jsx-a11y/anchor-is-valid */
import { ButtonType } from "components/custom-components/buttons/button-types";
import IconButton from "components/custom-components/buttons/icon-button/icon-button";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Icon } from "shared/Icons";
import { getMarkdownFunctionMap } from "utils/markdownFunctions";
import { MarkdownContentProps, MediaProps } from "./markdown-content.types";

import "./markdown-content.scss";

const MarkdownContent: React.FC<MarkdownContentProps> = ({
  content,
  assetBasePath,
}) => {
  const navigate = useNavigate();
  const markdownFunctionMap = getMarkdownFunctionMap(navigate);

  if (!content.length) {
    return null;
  }

  return (
    <div className="MagentaA11y__content-details">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }: MediaProps) => {
            const resolvedSrc = src?.startsWith("http")
              ? src
              : `${assetBasePath}/${src}`;
            return resolvedSrc ? (
              <img src={resolvedSrc} alt={alt} loading="lazy" />
            ) : (
              <span>{alt}</span>
            );
          },
          video: ({ poster, children }: MediaProps) => {
            let posterPath = poster
              ? `${assetBasePath}/${poster}`
              : "MagentaA11yV2/movie.svg";
            return (
              <video controls preload="none" poster={posterPath}>
                {children}
              </video>
            );
          },
          source: ({ src, type }: MediaProps) => {
            const resolvedSrc = src?.startsWith("http")
              ? src
              : `${assetBasePath}/${src}`;
            return <source src={resolvedSrc} type={type} />;
          },
          a: (props) => {
            const fnKey = (props as any)["data-fn"];
            const eventType = (props as any)["data-event"] || "onClick";
            const handler = fnKey && markdownFunctionMap[fnKey];
            const { href, children } = props;

            if (fnKey && handler) {
              const sharedProps = { ...props };

              switch (eventType) {
                case "onMouseDown":
                  return (
                    <a
                      {...sharedProps}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handler(e);
                      }}
                    >
                      {children}
                    </a>
                  );
                case "onMouseUp":
                  return (
                    <a
                      {...sharedProps}
                      onMouseUp={(e) => {
                        e.preventDefault();
                        handler(e);
                      }}
                    >
                      {children}
                    </a>
                  );
                default:
                  return (
                    <a
                      {...sharedProps}
                      onClick={(e) => {
                        e.preventDefault();
                        handler(e);
                      }}
                    >
                      {children}
                    </a>
                  );
              }
            }

            if (!href) {
              return <a {...props}>{children}</a>;
            }

            const isExternal = (() => {
              try {
                const url = new URL(href, window.location.href);
                return url.origin !== window.location.origin;
              } catch {
                return false;
              }
            })();

            return isExternal ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
                <svg className="Magenta-icon" aria-label=" - opens in a new tab" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" focusable="false"><path d="M3.5 20.5V3.5H11.6153V4.99998H4.99997V19H19V12.3846H20.5V20.5H3.5ZM9.7192 15.3346L8.66538 14.2808L17.9461 4.99998H14V3.5H20.5V9.99998H19V6.0538L9.7192 15.3346Z"></path></svg>
              </a>
            ) : (
              <Link to={href}>
                {children}
              </Link>
            );
          },

          button: ({ children, ...props }) => {
            const fnKey = (props as Record<string, unknown>)?.["data-fn"] as
              | string
              | undefined;
            const fn = fnKey && markdownFunctionMap[fnKey];

            const { type: nativeType, ...rest } = props;

            const iconName = (props as Record<string, unknown>)["data-icon"] as
              | Icon
              | undefined;
            const a11yLabel = (props as Record<string, unknown>)[
              "aria-label"
            ] as string | undefined;

            // ✅ Pass the event so the function can use event.currentTarget
            const onClick =
              typeof fn === "function"
                ? (event: React.MouseEvent) => fn(event)
                : undefined;

            if (iconName) {
              return (
                <IconButton
                  icon={iconName}
                  onClick={onClick}
                  a11yLabel={a11yLabel || ""}
                  type={
                    nativeType === ButtonType.button ||
                    nativeType === ButtonType.submit ||
                    nativeType === ButtonType.reset
                      ? (nativeType as ButtonType)
                      : undefined
                  }
                  {...rest}
                />
              );
            }

            // ✅ Fallback to regular <button> with onClick
            if (onClick) {
              return (
                <button onClick={onClick} {...props}>
                  {children}
                </button>
              );
            }

            // ✅ Fallback to plain <button>
            return <button {...props}>{children}</button>;
          },

          div: (props) => {
            const fnKey = (props as any)["data-fn"];
            const eventType = (props as any)["data-event"] || "onClick";
            const handler = fnKey && markdownFunctionMap[fnKey];

            if (!fnKey || !handler) {
              return <div {...props}>{props.children}</div>;
            }

            const commonProps = {
              ...props,
              role: props.role || "button",
              tabIndex: props.tabIndex ?? 0,

              children: props.children,
            };

            switch (eventType) {
              case "onMouseDown":
                return <div {...commonProps} onMouseDown={handler} />;
              case "onMouseUp":
                return <div {...commonProps} onMouseUp={handler} />;
              case "onClick":
              default:
                return <div {...commonProps} onClick={handler} />;
            }
          },
        }}
      >
        {content || ""}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
