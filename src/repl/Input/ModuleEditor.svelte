<script>
  import { getContext, onMount } from 'svelte';
  import CodeMirror from '../CodeMirror.svelte';
  import Message from '../Message.svelte';

  const {
    bundle,
    selected,
    handle_change,
    register_module_editor,
  } = getContext('REPL');

  export let errorLoc;
  // has warning with the handle_select, then I turn this to be comment to avoid the error.
  // export let handle_select;

  let editor;
  onMount(() => {
    register_module_editor(editor);
  });

  export function focus() {
    editor.focus();
  }
</script>

<style>
  .editor-wrapper {
    z-index: 5;
    background: var(--back-light);
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }

  .editor {
    height: 0;
    flex: 1 1 auto;
  }

  .info {
    background-color: var(--second);
    max-height: 50%;
    overflow: auto;
  }

  :global(.columns) .editor-wrapper {
    /* make it easier to interact with scrollbar */
    padding-right: 8px;
    height: auto;
    /* height: 100%; */
  }
</style>

<div class="editor-wrapper">
  <div class="editor notranslate" translate="no">
    <CodeMirror bind:this={editor} {errorLoc} on:change={handle_change} />
  </div>

  <div class="info">
    {#if $bundle}
      {#if $bundle.error}
        <Message
          kind="error"
          details={$bundle.error}
          filename="{$selected.name}.{$selected.type}" />
      {:else if $bundle.warnings.length > 0}
        {#each $bundle.warnings as warning}
          <Message
            kind="warning"
            details={warning}
            filename="{$selected.name}.{$selected.type}" />
        {/each}
      {/if}
    {/if}
  </div>
</div>
