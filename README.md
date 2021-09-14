# shoppa

**Shoppa** (HOP•pa, “to shop” in Swedish) **is a sample app designed to highlight bits of my frontend development knowledge.**

To see the app in action:

1. Clone this directory
2. Run `npm install` to install all dependencies
3. Run `npm run serve` to start the Vue app
4. Open a browser to `http://localhost:8080`

![Screenshot of shoppa on a desktop browser](https://johnmatu.la/static/tmp/shoppa.jpg)

-----

## JavaScript and frontend development
I built this app using a frontend framework (Vue, via the `vue-cli` and `vuex` data store) in order to follow an organized model-view-controller (MVC) approach to development. By doing so, I could isolate data methods and hook into data binding so that I could focus on the app itself.

The components I built only manage their own data and emit events when an action needs to trigger something in another component or in the data store. This is especially helpful when components are reused, like how the `Product` component is used in two different lists, `ProductList` and `Cart`.


## CSS, SCSS, and user experience
Styles are organized in a componentized way along with some global styles to reduce repeated declarations across the app. I organized the top-level variables and helper mixins in different partials, which are loaded in to the entire app styles via `sass-loader`. Then, at the component level, I follow BEM syntax to write styles efficiently.

Reflecting the way in which data flows from parent to child components, component styles only affect their own block level and do not affect other component layouts. (For instance, the `ProductList` dictates how the `Product` is displayed and spaced out.) This helps organize styles and use the cascading nature of CSS to the app’s advantage.


## Limitations and next steps
As a sample exercise, this app has a few limitations. All of these would be exciting to turn into next steps to further enhance the app.

* **Incorporate a quantity for each product.** Right now, you can add one—and only one—of each item to the cart. I built the `Product` component and its corresponding store in such a way to support non-singular quantities, since I figured this would be the most valuable feature to work next.
* **Use semantic variables for colors and other reusable design tokens.** I always use a mix of SCSS variables and CSS custom properties in my apps because they suit different needs. For a real app, I would clean up usage of these more to enable easier use of dark mode themes, inclusive design techniques, and more.
* **Improve WCAG 2.1 AA compliance.** The biggest opportunity to improve compliance exists within the `Cart` component when displayed as a modal pane at mobile device widths. There are plenty of considerations around focus capturing (preventing focus of non-visible elements) and text labels (instead of relying solely on icons to convey meaning) that I’d need to address.


## Scratching the tip of the iceberg

As you review how the app works, the way in which I built it, and the design decisions I made along the way, please let me know if [you’re only getting half the story](https://twitter.com/rupaulsdragrace/status/1347730970724728832?lang=en) and have more questions. Happy to answer them over email or a call!
