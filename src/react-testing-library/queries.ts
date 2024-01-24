import { buildQueries } from "@testing-library/react";

type TFn = (container: HTMLElement, id: string) => HTMLElement[];

/* istanbul ignore next */
const getMultipleError = (attr: string) => (_: any, value: string) =>
  `Found multiple elements where ${attr} matches ${value}`;

/* istanbul ignore next */
const getMissingError = (attr: string) => (_: any, value: string) =>
  `Unable to find an element where ${attr} matches ${value}`;

const queryAllById: TFn = (container, id) =>
  Array.from(container.querySelectorAll(`#${id}`));

const queryAllByClassName: TFn = (container, id) =>
  Array.from(container.querySelectorAll(`.${id}`));

const queryAllBySelector: TFn = (container, id) =>
  Array.from(container.querySelectorAll(id)) as HTMLElement[];

const [queryById, getAllById, getById, findAllById, findById] = buildQueries(
  queryAllById,
  getMultipleError("id"),
  getMissingError("id"),
);

const [
  queryByClassName,
  getAllByClassName,
  getByClassName,
  findAllByClassName,
  findByClassName,
] = buildQueries(
  queryAllByClassName,
  getMultipleError("className"),
  getMissingError("className"),
);

const [
  queryBySelector,
  getAllBySelector,
  getBySelector,
  findAllBySelector,
  findBySelector,
] = buildQueries(
  queryAllBySelector,
  getMultipleError("tag name"),
  getMissingError("tag name"),
);

export const queries = {
  findAllByClassName,
  findAllById,
  findAllBySelector,
  findByClassName,
  findById,
  findBySelector,
  getAllByClassName,
  getAllById,
  getAllBySelector,
  getByClassName,
  getById,
  getBySelector,
  queryAllByClassName,
  queryAllById,
  queryAllBySelector,
  queryByClassName,
  queryById,
  queryBySelector,
};
