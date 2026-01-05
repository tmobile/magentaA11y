/* eslint-disable jsx-a11y/anchor-is-valid */
import { ButtonType } from 'components/custom-components/buttons/button-types';
import IconButton from 'components/custom-components/buttons/icon-button/icon-button';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Icon } from 'shared/Icons';
import { getMarkdownFunctionMap } from 'utils/markdownFunctions';
import { MarkdownContentProps, MediaProps } from './markdown-content.types';

import './markdown-content.scss';

// Helper to safely invoke mapped markdown functions with an event
const   fnHandler = (fn: unknown, e: unknown): void => {
  if (typeof fn === 'function') {
    (fn as (ev: unknown) => void)(e);
  }
};

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
          li: (props) => {
            const { className, children, ...rest } = props as any;

            // Only enhance the special cards used in docs examples
            const isInteractiveCard =
              typeof className === 'string' &&
              className.includes('card') &&
              className.includes('interactive');

            if (!isInteractiveCard) {
              return <li {...props as any}>{children}</li>;
            }

            const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
              const currentTarget = e.currentTarget as HTMLElement;

              // Prefer first enabled radio/checkbox inside the card
              const input = currentTarget.querySelector(
                'input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), input:not([disabled])'
              ) as HTMLInputElement | null;

              if (!input) return;

              // If there is a label associated, click the label to leverage native behavior
              const label = input.id
                ? (currentTarget.querySelector(
                    `label[for="${CSS.escape(input.id)}"]`
                  ) as HTMLElement | null)
                : null;

              if (label) {
                label.click();
              } else {
                // Fallback: focus then click the input
                input.focus();
                input.click();
              }
            };

            return (
              <li className={className} onClick={handleClick} {...rest}>
                {children}
              </li>
            );
          },
          img: ({ src, alt }: MediaProps) => {
            const resolvedSrc = src?.startsWith('http')
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
              : 'movie.svg';
            return (
              <video controls preload="none" poster={posterPath}>
                {children}
              </video>
            );
          },
          source: ({ src, type }: MediaProps) => {
            const resolvedSrc = src?.startsWith('http')
              ? src
              : `${assetBasePath}/${src}`;
            return <source src={resolvedSrc} type={type} />;
          },
          a: (props) => {
            const fnKey = (props as any)['data-fn'];
            const eventType = (props as any)['data-event'] || 'onClick';
            const handler = fnKey && markdownFunctionMap[fnKey];
            const { href, children } = props;

            if (fnKey && handler) {
              const sharedProps = { ...props };

              switch (eventType) {
                case 'onMouseDown':
                  return (
                    <a
                      {...sharedProps}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handler(e);
                      }}>
                      {children}
                    </a>
                  );
                case 'onMouseUp':
                  return (
                    <a
                      {...sharedProps}
                      onMouseUp={(e) => {
                        e.preventDefault();
                        handler(e);
                      }}>
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
                      }}>
                      {children}
                    </a>
                  );
              }
            }

            if (!href) {
              return <a {...props}>{children}</a>;
            }

            /*
              Same-page links:
              Handle same-page anchor links (e.g., #ref-alpha, #ref-alpha-link)
              Detect anchor link, add event listener, manage keyboard focus
            */

            // Check if the link is an internal anchor link
            const isInternalAnchor = href.startsWith('#');

            // If the link is an internal anchor link, render a special link with a click event handler and move focus to the target element
            if (isInternalAnchor) {
              return (
                <a
                  {...props}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = href.substring(1); // Strip the '#'
                    const targetElement = document.getElementById(targetId); // grab target to send focus to
                    if (targetElement) {
                      // Focus the element for keyboard/screen reader users
                      targetElement.focus();
                    }
                  }}
                >
                  {children}
                </a>
              );
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
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
                <svg
                  className="Magenta-icon"
                  aria-label=" - opens in a new tab"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  role="img"
                  focusable="false">
                  <path d="M3.5 20.5V3.5H11.6153V4.99998H4.99997V19H19V12.3846H20.5V20.5H3.5ZM9.7192 15.3346L8.66538 14.2808L17.9461 4.99998H14V3.5H20.5V9.99998H19V6.0538L9.7192 15.3346Z"></path>
                </svg>
              </a>
            ) : (
              <Link to={href}>{children}</Link>
            );
          },

          button: ({ children, ...props }) => {
            const fnKey = (props as Record<string, unknown>)?.['data-fn'] as
              | string
              | undefined;
            const fn = fnKey && markdownFunctionMap[fnKey];

            const { type: nativeType } = props;

            const iconName = (props as Record<string, unknown>)['data-icon'] as
              | Icon
              | undefined;
            const a11yLabel = (props as Record<string, unknown>)[
              'aria-label'
            ] as string | undefined;
            const ariaDisabled = (props as Record<string, unknown>)[
              'aria-disabled'
            ] as string | boolean | undefined;
            const dataFn = (props as Record<string, unknown>)['data-fn'] as
              | string
              | undefined;
            const dataIcon = (props as Record<string, unknown>)['data-icon'] as
              | string
              | undefined;

            // ✅ Pass the event so the function can use event.currentTarget
            const onClick =
              typeof fn === 'function'
                ? (event: React.MouseEvent) => fn(event)
                : undefined;

            if (iconName) {
              return (
                <IconButton
                  icon={iconName}
                  onClick={onClick}
                  a11yLabel={a11yLabel || ''}
                  ariaDisabled={ariaDisabled}
                  dataFn={dataFn}
                  dataIcon={dataIcon}
                  type={
                    nativeType === ButtonType.button ||
                    nativeType === ButtonType.submit ||
                    nativeType === ButtonType.reset
                      ? (nativeType as ButtonType)
                      : undefined
                  }
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

          input: (props) => {
              const { type, checked, ...rest } = props;
              const fnKey = (props as Record<string, unknown>)?.['data-fn'] as
                  | string
                  | undefined;
              const eventType =
                  ((props as Record<string, unknown>)?.['data-event'] as string) ||
                  'onChange';
              const fn = fnKey && markdownFunctionMap[fnKey];

              if (!fnKey || typeof fn !== 'function') {
                  // If aria-disabled="true", prevent activation.
                  const isAriaDisabled =
                    (props as Record<string, unknown>)?.['aria-disabled'] === 'true' ||
                    (props as Record<string, unknown>)?.['aria-disabled'] === true;
                  const commonProps: any = { ...rest, type };
                  if (isAriaDisabled) {
                    commonProps.onClick = (e: React.MouseEvent) => e.preventDefault();
                    commonProps.onChange = (e: React.ChangeEvent) => e.preventDefault();
                    commonProps.onKeyDown = (e: React.KeyboardEvent) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                      }
                    };
                  }

                  // If it's a radio or toggle switch, use defaultChecked instead of checked
                  // This prevents React from locking the state as a "controlled" component
                  if (type === 'radio' || (props as any).role === 'switch') {
                      return <input defaultChecked={checked} {...commonProps} />;
                  }
                  return <input {...commonProps} />;
              }

            // For inputs (checkboxes, radios, text), prefer onChange.
            // Do NOT prevent default so the control state updates naturally.
            // If aria-disabled="true", prevent activation.
            const isAriaDisabled =
              (props as Record<string, unknown>)?.['aria-disabled'] === 'true' ||
              (props as Record<string, unknown>)?.['aria-disabled'] === true;

            const wrapHandler = (handler: (e: any) => void) => (e: any) => {
              if (isAriaDisabled) {
                e.preventDefault();
                return;
              }
              handler(e);
            };

            switch (eventType) {
              case 'onClick':
                return (
                  <input
                    {...props}
                    onClick={wrapHandler((e) => {
                      // Call the mapped function; event type differs but is safe to pass along
                      fnHandler(fn, e);
                    })}
                  />
                );
              case 'onInput':
                return (
                  <input
                    {...props}
                    onInput={wrapHandler((e) => {
                      fnHandler(fn, e);
                    })}
                  />
                );
              case 'onChange':
              default:
                return (
                  <input
                    {...props}
                    onChange={wrapHandler((e) => {
                      fnHandler(fn, e);
                    })}
                  />
                );
            }
          },

          div: (props) => {
            const fnKey = (props as any)['data-fn'];
            const eventType = (props as any)['data-event'] || 'onClick';
            const handler = fnKey && markdownFunctionMap[fnKey];

            if (!fnKey || !handler) {
              return <div {...props}>{props.children}</div>;
            }

            const commonProps = {
              ...props,
              role: props.role || 'button',
              tabIndex: props.tabIndex ?? 0,

              children: props.children,
            };

            switch (eventType) {
              case 'onMouseDown':
                return <div {...commonProps} onMouseDown={handler} />;
              case 'onMouseUp':
                return <div {...commonProps} onMouseUp={handler} />;
              case 'onClick':
              default:
                return <div {...commonProps} onClick={handler} />;
            }
          },
        }}>
        {content || ''}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
