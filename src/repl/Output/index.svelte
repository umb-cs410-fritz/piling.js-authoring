<script>
  import { getContext, onMount } from 'svelte';
  import marked from 'marked';
  import SplitPane from '../SplitPane.svelte';
  import Viewer from './Viewer.svelte';
  import PaneWithPanel from './PaneWithPanel.svelte';
  import CompilerOptions from './CompilerOptions.svelte';
  import Compiler from './Compiler.js';
  import CodeMirror from '../CodeMirror.svelte';
  import { is_browser } from '../env.js';
  import { components } from '../../stores.js';
  import { DATA_JSON_INDEX } from '../../constants.js';

  const { register_output } = getContext('REPL');

  export let svelteUrl;
  export let workersUrl;
  export let status;
  // since the js output has commented below,
  // there are a warning with the sourceErrorLoc and embedded,
  // then I turn these to be comments to avoid the error.
  // export let sourceErrorLoc = null;
  export let runtimeError = null;
  // export let embedded = false;
  export let relaxed = false;
  export let injectedJS;
  export let injectedCSS;

  let foo; // TODO workaround for https://github.com/sveltejs/svelte/issues/2122

  register_output({
    set: async (selected, options) => {
      selected_type = selected.type;

      if (selected.type === 'js' || selected.type === 'json') {
        js_editor.set(`/* Select a component to see its compiled code */`);
        css_editor.set(`/* Select a component to see its compiled code */`);
        return;
      }

      if (selected.type === 'md') {
        markdown = marked(selected.source);
        return;
      }

      const compiled = await compiler.compile(selected, options);
      if (!js_editor) return; // unmounted

      js_editor.set(compiled.js, 'js');
      css_editor.set(compiled.css, 'css');
    },

    update: async (selected, options) => {
      if (selected.type === 'js' || selected.type === 'json') return;

      if (selected.type === 'md') {
        markdown = marked(selected.source);
        return;
      }

      const compiled = await compiler.compile(selected, options);
      if (!js_editor) return; // unmounted

      js_editor.update(compiled.js);
      css_editor.update(compiled.css);
    },
  });

  const compiler = is_browser && new Compiler(workersUrl, svelteUrl);

  // refs
  let viewer;
  let js_editor;
  let css_editor;
  const setters = {};

  export let view = 'result';
  let selected_type = '';
  let markdown = '';

  // intermediate view
  let intermediately_data_source = JSON.parse(
    $components[DATA_JSON_INDEX].source
  );
  let intermediately_data = [];
  let intermediately_data_index = 0;

  for (let i = 0; i < intermediately_data_source.length; i++) {
    intermediately_data[i] = intermediately_data_source[i].src;
  }

  function startIntermediatelyData() {
    document.getElementById('myImg').src = intermediately_data[0];
  }

  function prevIntermediatelyData() {
    document.getElementById('myImg').src =
      intermediately_data[intermediately_data_index--];
    //console.log(intermediately_data_index);
    if (intermediately_data_index < 0) {
      intermediately_data_index = intermediately_data.length - 1;
    }
  }

  function nextIntermediatelyData() {
    document.getElementById('myImg').src =
      intermediately_data[intermediately_data_index++];
    //console.log(intermediately_data_index);
    if (intermediately_data_index >= intermediately_data.length) {
      intermediately_data_index = 0;
    }
  }

  let index_input = '';

  function lookupIntermediatelyData() {
    if (index_input > 0 && index_input <= intermediately_data.length) {
      document.getElementById('myImg').src =
        intermediately_data[index_input - 1];
    } else {
      index_input = 'Invalid Input!!!';
    }
  }
</script>

<style>
  .view-toggle {
    height: var(--pane-controls-h);
    border-bottom: 1px solid #eee;
    white-space: nowrap;
    box-sizing: border-box;
  }

  button {
    /* width: 50%;
    height: 100%; */
    background: white;
    text-align: left;
    position: relative;
    font: 400 12px/1.5 var(--font);
    border: none;
    border-bottom: 3px solid transparent;
    padding: 12px 12px 8px 12px;
    color: #999;
    border-radius: 0;
  }

  button.active {
    border-bottom: 3px solid var(--prime);
    color: #333;
  }

  div[slot] {
    height: 100%;
  }

  .tab-content {
    position: absolute;
    width: 100%;
    height: calc(100% - 42px) !important;
    opacity: 0;
    pointer-events: none;
  }

  .tab-content.visible {
    /* can't use visibility due to a weird painting bug in Chrome */
    opacity: 1;
    pointer-events: all;
  }
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }

</style>

<div class="view-toggle">
  {#if selected_type === 'md'}
    <button class="active">Markdown</button>
  {:else}
    <button class:active={view === 'result'} on:click={() => (view = 'result')}>
      Result
    </button>

    <!-- <button class:active={view === 'js'} on:click={() => (view = 'js')}>
      JS output
    </button>

    <button class:active={view === 'css'} on:click={() => (view = 'css')}>
      CSS output
    </button> -->

    <button
      class:active={view === 'intermediate'}
      on:click={() => ((view = 'intermediate'), startIntermediatelyData())}>
      Intermediate View
    </button>
  {/if}
</div>

<!-- component viewer/intermediate output -->
<div
  class="tab-content"
  class:visible={selected_type !== 'md' && view === 'result'}>
  <Viewer
    bind:this={viewer}
    bind:error={runtimeError}
    {status}
    {relaxed}
    {injectedJS}
    {injectedCSS} />
</div>

<div
  style="text-align: center"
  class="tab-content"
  class:visible={selected_type !== 'md' && view === 'intermediate'}>
  <img id="myImg" src="" height="85%" width="auto" />
  <br />
  <button on:click={prevIntermediatelyData}>Previous</button>
  <button on:click={nextIntermediatelyData}>Next</button>
  <br />
  <button on:click={lookupIntermediatelyData}>Lookup Data No.</button>
  <input bind:value={index_input} placeholder="enter the number" />
</div>

<!-- js output -->
<!-- <div
  class="tab-content"
  class:visible={selected_type !== 'md' && view === 'js'}>
  {#if embedded}
    <CodeMirror
      bind:this={js_editor}
      mode="js"
      errorLoc={sourceErrorLoc}
      readonly />
  {:else}
    <PaneWithPanel pos={67} panel="Compiler options">
      <div slot="main">
        <CodeMirror
          bind:this={js_editor}
          mode="js"
          errorLoc={sourceErrorLoc}
          readonly />
      </div>

      <div slot="panel-body">
        <CompilerOptions />
      </div>
    </PaneWithPanel>
  {/if}
</div> -->

<!-- css output -->
<!-- <div
  class="tab-content"
  class:visible={selected_type !== 'md' && view === 'css'}>
  <CodeMirror
    bind:this={css_editor}
    mode="css"
    errorLoc={sourceErrorLoc}
    readonly />
</div> -->

<!-- markdown output -->
<div class="tab-content" class:visible={selected_type === 'md'}>
  <iframe title="Markdown" srcdoc={markdown} />
</div>
