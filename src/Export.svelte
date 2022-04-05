<script>
  import { exportBundle } from './stores';

  function makeBlob() {
    return new Blob([...$exportBundle.dom.code]);
  }
</script>

<style>

</style>

<div class="exportForm">
  <h3>Export</h3>
  <h4>Attempting to export:</h4>
  <h5>File Content</h5>
  <p>{exportBundle}</p>
  <h5>File URL</h5>
  <p>{URL.createObjectURL(makeBlob())}</p>
  <a href={URL.createObjectURL(makeBlob())} download="piling-result.js">
    Export Now
  </a>
</div>
