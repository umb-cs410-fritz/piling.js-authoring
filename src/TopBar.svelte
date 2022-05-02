<script>
  import {
    onMount,
    onDestroy,
    getContext,
    createEventDispatcher,
  } from 'svelte';
  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
  import Fab, { Label, Icon } from '@smui/fab';
  import List, { Item, Text } from '@smui/list';
  import Examples from './Examples.svelte';
  import Import from './Import.svelte';

  import { tabId } from './stores';

  import { autoRun, alwaysPreservePiles } from './stores';

  import { NAV_HEIGHT } from './constants.js';
  import Settings from './Settings.svelte';

  const { open: openModal } = getContext('simple-modal');
  let exportData;
  let bc;

  const dispatch = createEventDispatcher();

  const runHandler = () => dispatch('rebundle');
  const refreshHandler = () => dispatch('refresh');

  onMount(async () => {
    // Data for Export
    bc = new BroadcastChannel($tabId);
    bc.onmessage = function (m) {
      const json = JSON.parse(m.data.payload);
      delete json.items;
      delete json.piles;
      delete json.temporaryDepiledPiles;
      delete json.magnifiedPiles;
      delete json.focusedPiles;
      delete json.depiledPile;
      exportData = URL.createObjectURL(
        new Blob([...JSON.stringify(json)], {
          type: 'application/json',
        })
      );
    };
  });

  onDestroy(() => {
    if (bc) bc.close();
    if (exportData) URL.revokeObjectURL(exportData);
  });

  // Settings Modal
  function openSettingsHandler() {
    openModal(Settings, { runHandler });
  }

  let dense = true;
  let prominent = false;
  let variant = 'standard';
  let collapsed = false;
  let title = 'Piling.js Authoring';
  let menu;

  const open = (Component, props = {}, styles = {}) => () =>
    openModal(Component, props, styles);
</script>

<style>
  .bar :global(.mdc-top-app-bar) {
    background-color: rgb(51, 51, 51);
    color: white;
  }

  .bar :global(.mdc-fab__label) {
    padding-left: 5px;
    font-size: 10pt;
  }

  .bar :global(.mdc-fab) {
    width: auto;
    height: 48px;
    padding: 0px 10px;
    border-radius: 0 !important;
    background-color: rgb(51, 51, 51);
    box-shadow: none;
    color: white;
  }

  .bar :global(.mdc-fab:hover) {
    box-shadow: none;
    background-color: rgb(30, 30, 30);
  }

  .bar :global(.mdc-fab:disabled) {
    cursor: not-allowed;
    opacity: 0.66;
  }

  .bar :global(.mdc-fab:disabled:hover) {
    background-color: inherit;
  }
</style>

<div class="bar" style="height: {NAV_HEIGHT};">
  <TopAppBar {dense} {prominent} {variant} bind:collapsed>
    <Row>
      <Section>
        <span
          class="auto-run"
          title={$autoRun ? 'Auto-run is active. No need to click this button.' : ''}>
          <Fab aria-label="Run" disabled={$autoRun} on:click={runHandler}>
            <Icon class="material-icons" dense={true}>
              {$autoRun ? 'autorenew' : 'play_arrow'}
            </Icon>
            <Label>{$autoRun ? 'Auto-Run' : 'Run'}</Label>
          </Fab>
        </span>
        <Fab
          aria-label="Import"
          on:click={open(Import, { refreshHandler }, { closeButton: false })}>
          <Icon class="material-icons">publish</Icon>
          <Label>Import</Label>
        </Fab>
        <Fab
          aria-label="Examples"
          on:click={open(Examples, { refreshHandler }, { styleWindow: { width: '45rem' } })}>
          <Icon class="material-icons">perm_media</Icon>
          <Label>Examples</Label>
        </Fab>
        <Title>{title}</Title>
      </Section>
      <Section align="end" toolbar>
        <a
          aria-label="Export"
          id="export-button"
          class="mdc-fab mdc-ripple-upgraded"
          style="text-decoration: none; font-size: 10pt; --mdc-ripple-fg-size: 52px; --mdc-ripple-fg-scale: 2.097523981797536; --mdc-ripple-fg-translate-start: -3.9666748046875px, -2px; --mdc-ripple-fg-translate-end: 17.333335876464844px, -2px;"
          href={exportData}
          download="piling-settings.json">
          <Icon class="material-icons">file_download</Icon>
          <Label>Export</Label>
        </a>
        <Fab aria-label="Settings" on:click={openSettingsHandler}>
          <Icon class="material-icons">settings</Icon>
          <Label>Settings</Label>
        </Fab>
      </Section>
    </Row>
  </TopAppBar>
</div>
