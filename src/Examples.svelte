<script>
  import Example from './Example.svelte';
  const booksUserAndGistId = 'flekschas/73dd0de929033ddadb0313fa46257835';
  const ridgePlotUserAndGistId = 'flekschas/81e7fb4f9cf5946f12639c383af97dc6';
  const matrixUserAndGistId = 'flekschas/0bee19015958e5677a1fb476712b3803';
  const cuteDogsAndGistId = 'TungDuong2/f72775662cc23a4a2ce7cfae56025f36';

  export let refreshHandler;
</script>

<style>
  ol,
  ul {
    padding: 0;
    list-style: none;
  }

  ol {
    margin: 1rem 0;
  }

  ul {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
  }
</style>

<ol>
  <li>
    <h2 class="mdc-typography--headline6">Images / Photos</h2>
    <ul>
      <li>
        <Example userAndGistId={booksUserAndGistId} refreshHandler={refreshHandler} />
      </li>
      <li>
        <Example userAndGistId={cuteDogsAndGistId} refreshHandler={refreshHandler} />
      </li>
    </ul>
  </li>
  <li>
    <h2 class="mdc-typography--headline6">Information Visualization</h2>
    <ul>
      <li>
        <Example userAndGistId={ridgePlotUserAndGistId} refreshHandler={refreshHandler} />
      </li>
      <li>
        <Example userAndGistId={matrixUserAndGistId} refreshHandler={refreshHandler} />
      </li>
    </ul>
  </li>
</ol>
