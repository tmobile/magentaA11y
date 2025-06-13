import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import contentData from "shared/content.json";
import { DocumentationCategory } from "shared/types/shared-types";
import Footer from "./footer";

// Custom render function with MemoryRouter
const renderWithRouter = (
  ui: React.ReactElement,
  { initialEntries = ["/"] } = {}
) => {
  return render(
    <MemoryRouter
      initialEntries={initialEntries}
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      {ui}
    </MemoryRouter>
  );
};

describe("Footer Component - Rendering", () => {
  test("renders the Footer component", () => {
    renderWithRouter(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  test("Footer contains the correct class name", () => {
    renderWithRouter(<Footer />);
    expect(screen.getByRole("contentinfo")).toHaveClass("MagentaA11y--footer");
  });

  test("Footer is tabbable with tabIndex={-1}", () => {
    renderWithRouter(<Footer />);
    expect(screen.getByRole("contentinfo")).toHaveAttribute("tabindex", "-1");
  });

  test("renders a list for each category", () => {
    renderWithRouter(<Footer />);
    const lists = screen.getAllByRole("list");
    expect(lists.length).toBe(Object.keys(contentData).length + 1);
  });

  test("each list contains list items", () => {
    renderWithRouter(<Footer />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBeGreaterThan(0);
  });
});

describe("Footer Component - Content Tests", () => {
  test("renders category headers based on contentData", () => {
    renderWithRouter(<Footer />);
    Object.keys(contentData).forEach((category) => {
      const formattedCategory = category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      const expectedHeading =
        category === DocumentationCategory.HOW_TO_TEST
          ? formattedCategory
          : `${formattedCategory} Criteria`;

      expect(
        screen.getByRole("heading", {
          name: expectedHeading,
        })
      ).toBeInTheDocument();
    });
  });

  test("renders correct list items from contentData", () => {
    renderWithRouter(<Footer />);
    Object.entries(contentData).forEach(([category, items]) => {
      items.forEach((item) => {
        expect(screen.getAllByText(item.label)[0]).toBeInTheDocument();
      });
    });
  });

  test("renders the About Us section", () => {
    renderWithRouter(<Footer />);
    expect(
      screen.getByRole("heading", { name: "About Us" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Contact Us" })
    ).toBeInTheDocument();
  });
});

// describe('Footer Component - Navigation Tests', () => {
//   test('each NavLink has the correct href attribute', () => {
//     renderWithRouter(<Footer />);
//     Object.entries(contentData).forEach(([category, items]) => {
//       items.forEach((item) => {
//         const link = screen.getByRole('link', { name: item.label });
//         expect(link).toHaveAttribute(
//           'href',
//           `/${category}-criteria/${item.name}/overview`
//         );
//       });
//     });

//     expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute(
//       'href',
//       '/about'
//     );
//   });

// test('clicking a NavLink updates the URL', async () => {
//   const user = userEvent.setup();

//   renderWithRouter(
//     <Routes>
//       <Route path="*" element={<Footer />} />
//       <Route
//         path="/native-criteria/component/overview"
//         element={<div data-testid="component">Component</div>}
//       />
//     </Routes>,
//     { initialEntries: ['/'] } // Provide initialEntries separately
//   );

//   const controlsLink = screen.getByRole('link', { name: /component/i });
//   await user.click(controlsLink);

//   expect(screen.getByTestId('component')).toBeInTheDocument();
// });
// });

describe("Footer Component - Accessibility Tests", () => {
  test("ensures all links have an accessible name", () => {
    renderWithRouter(<Footer />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAccessibleName();
    });
  });

  test("ensures all headings have an accessible name", () => {
    renderWithRouter(<Footer />);
    const headings = screen.getAllByRole("heading");
    headings.forEach((heading) => {
      expect(heading).toHaveAccessibleName();
    });
  });

  test("allows tabbing through links", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Footer />);

    const links = screen.getAllByRole("link");
    await user.tab();

    for (const link of links) {
      expect(link).toHaveFocus();
      await user.tab();
    }
  });
});

describe("Footer Component - Snapshot Test", () => {
  test("matches the snapshot", () => {
    const { asFragment } = renderWithRouter(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
