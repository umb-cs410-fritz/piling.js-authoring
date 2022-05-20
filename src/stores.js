import clone from 'just-clone';
import { writable, readable } from 'svelte/store';

import {
  STORAGE_KEY,
  DEFAULT_COMPONENTS,
  DEFAULT_AUTORUN,
  DEFAULT_DEBUG,
  DEFAULT_ALWAYS_PRESERVE_PILES,
} from './constants';
import {
  makeSerializable,
  loadStores,
  loadParametersFromUrl,
  urlParameter,
} from './utils';

const _debug = loadParametersFromUrl().get('debug') || DEFAULT_DEBUG;
export const debug = urlParameter(_debug);

const prevStore = _debug ? {} : loadStores(STORAGE_KEY) || {};
const _components = clone(prevStore.components || DEFAULT_COMPONENTS);
const _selectedComponent = prevStore.selectedComponent
  ? _components.find(
      (file) =>
        file.name === prevStore.selectedComponent.name &&
        file.type === prevStore.selectedComponent.type
    ) || _components[0]
  : _components[0];
const _autoRun = prevStore.autoRun || DEFAULT_AUTORUN;
const _alwaysPreservePiles =
  prevStore.alwaysPreservePiles === undefined
    ? DEFAULT_ALWAYS_PRESERVE_PILES
    : prevStore.alwaysPreservePiles;

const _tabId = prevStore.tabId || Math.random().toString(20).substr(2, 8);

export const components = makeSerializable(writable(_components));
export const selectedComponent = makeSerializable(
  writable(_selectedComponent),
  (value) => {
    const clonedValue = clone(value);
    // We only need to store the name and extension as the source is already
    // stored in `components` and would unnecessarily blow up the data
    delete clonedValue.source;
    return clonedValue;
  }
);
export const autoRun = makeSerializable(writable(_autoRun));

export const tabId = makeSerializable(readable(_tabId));

const _prevPilingState = prevStore.prevPilingState || null;
export const prevPilingState = makeSerializable(writable(_prevPilingState));

export const alwaysPreservePiles = makeSerializable(
  writable(_alwaysPreservePiles)
);
export const style_options = makeSerializable(
  writable({
    // style_options
    columns: 6,
    cellPadding: 16,
    pileCellAlignment: 'center',
    pileBorderSize: 1,
    pileVisibilityItems: false,
    previewAlignment: 'center',
  })
);

// Storage for the sidebar options
export const options = makeSerializable(writable({
  // pile/item bools
  bool_itemsize: false,

  //layout bools
  bool_cellsize: false,
  bool_cellpadding: false,
  bool_numcolumns: false,
  bool_rowheight: false,
  bool_cellalignment: false,

  // group bools
  bool_grouprow: false,
  bool_groupcolumn: false,
  bool_groupgrid: false,
  bool_groupoverlap: false,
  bool_groupdistance: false,

  // label bools
  maincat: false,
  mainsupercat: false,
  textlabel: false,
  labelalignment: false,
  stackdir: false,
  fontsize: false
}));
