<script>
  import { getContext, onMount, setContext } from 'svelte';

  import {
    style_options
  } from '../stores.js';

  let style_options_json;
  console.log('new styles page');
  
  const { handle_styles_change } = getContext('REPL');
</script>

<style>
  .heading {
    margin: 2em;
  }
  .inputs{
      margin-top: 1em;
  }
  .style_ui{
    display: flex;
    margin: 1rem;
  }
  .items{
    margin: 1rem;
  }
</style>


<div class="heading">
  <label class="items">columns: <span> {$style_options.columns}</span>
  
      <input
    type="range"
    bind:value={$style_options.columns}
    on:change={handle_styles_change}
    min="0"
    max="10" />
  </label>

  <!-- cellpadding -->
  <label class="items">cellpadding: <span> {$style_options.cellpadding}</span>
  
    <input
  type="range"
  bind:value={$style_options.cellpadding}
  on:change={handle_styles_change}
  min="0"
  max="10" />
</label>

  <!-- pile cellallignment -->
  <div class="style_ui">
    <label>pileCellAlignment:</label>
    
    <input type="radio" value="left" bind:group={$style_options.pileCellAlignment} on:change={handle_styles_change}>
  <label for="html">left</label><br>
  <input type="radio" value="center" bind:group={$style_options.pileCellAlignment} on:change={handle_styles_change}>
  <label for="css">center</label><br>
  <input type="radio" value="right" bind:group={$style_options.pileCellAlignment} on:change={handle_styles_change}>
  <label for="javascript">right</label>

  </div>

  <!-- pileBorderSize -->
  <label class="items">pileBorderSize: <span> {$style_options.pileBorderSize}</span>
  
    <input
  type="range"
  bind:value={$style_options.pileBorderSize}
  on:change={handle_styles_change}
  min="0"
  max="10" />
</label>


  <!-- working on other input options -->
  <div class="items">
    <label>pileVisibilityItems:
    <input
      type="checkbox"
      bind:checked={$style_options.pileVisibilityItems}
      on:change={handle_styles_change} />
    </label>
    
  </div>

  <!-- previewAlignment -->
  <div class="style_ui">
    <label>previewAlignment:</label>
    
    <input type="radio" value="left" bind:group={$style_options.previewAlignment} on:change={handle_styles_change}>
  <label for="html">left</label><br>
  <input type="radio"  value="center" bind:group={$style_options.previewAlignment} on:change={handle_styles_change}>
  <label for="css">center</label><br>
  <input type="radio" value="right" bind:group={$style_options.previewAlignment} on:change={handle_styles_change}>
  <label for="javascript">right</label>

  </div>
  
</div>
