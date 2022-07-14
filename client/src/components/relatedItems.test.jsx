/** @jest-environment jsdom */
import React from "react";
import {render} from "@testing-library/react";
import App from "./App.jsx";
import RelatedItems from "./RelatedItems/RelatedItems.jsx";


// describe("RelatedItems Component", () => {

//   it("rendered RelatedItems", () => {
//     const { getByTestId } = render(<App />);
//     const relatedItems = getByTestId("related");
//     expect(relatedItems).toBeTruthy;
//   });
// });

describe('App component', () => {
  test('it renders', () => {
    render(<App />);
  });
 })

 describe('RelatedItems component', () => {
  test('it renders', () => {
    render(<RelatedItems />);
  });
 })