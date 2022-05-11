<script>
  import { getContext, onMount } from 'svelte';

  console.log('new styles page');
  export var slider_value = 5;
  export var yes;

  const { handle_styles_change } = getContext('REPL');
</script>

<style>
  .heading {
    margin: 2em;
  }
  .inputs{
      margin-top: 1em;
  }
</style>


<div class="heading">
    <h1>Styles Editor</h1>
  <label>Columns: <span> {slider_value}</span></label>
  <div class="inputs">
      <input
    type="range"
    bind:value={slider_value}
    on:change={handle_styles_change}
    min="0"
    max="10" />
  </div>
  
  <!-- working on other input options -->
  <!-- <div style="margin-top:3rem;">
    <label>isTrue:</label>
    <input
      type="checkbox"
      bind:checked={yes}
      on:change={handle_styles_change} />
    <span>{yes ? 'Checked' : 'NotChecked'}</span>
  </div> -->
</div>
