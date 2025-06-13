// src/custom-elements.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'md-outlined-button': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & { href?: string };

    'md-text-button': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & { href?: string; name?: string };

    'md-filled-button': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;

    'md-icon-button': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;

    'md-filled-tonal-button': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;

    'md-list': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;

    'md-list-item': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & { class?: string };

    'md-icon': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & { slot?: string };

    'md-tabs': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      activeTabIndex?: number; // Selected tab index
      onselected?: (event: Event) => void; // Event handler for the 'selected' event
    };

    'md-primary-tab': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      active?: boolean;
    };

    'md-secondary-tab': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;

    svg: React.SVGProps<SVGSVGElement> & { slot?: string };
  }
}
