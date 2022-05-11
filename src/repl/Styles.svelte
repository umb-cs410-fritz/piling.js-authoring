<script>
  import { getContext, onMount } from 'svelte';

  console.log('new styles page');
  export var slider_value = 5;
  export var yes;

  const { handle_styles_change } = getContext('REPL');
</script>

<style>
  .heading {
    padding: 1em;
  }
</style>


<div class="heading">

  <label>isChanged:</label>
  <input
    type="range"
    bind:value={slider_value}
    on:change={handle_styles_change}
    min="0"
    max="10" />
  <span>{slider_value}</span>
  <div style="margin-top:3rem;">
    <label>isTrue:</label>
    <input
      type="checkbox"
      bind:checked={yes}
      on:change={handle_styles_change} />
    <span>{yes ? 'Checked' : 'NotChecked'}</span>
  </div>
</div>
