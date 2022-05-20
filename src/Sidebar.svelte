<script>
    import { onMount, afterUpdate, onDestroy } from 'svelte';
	import Box from './Box.svelte';
    import { options } from './stores.js';

    let bc;

    function test() {
        console.log("test");
    }

    onMount(async () => {
        bc = new BroadcastChannel('sidebar');
        bc.postMessage({ type: 'update', payload: JSON.stringify($options) });
    });

    afterUpdate(() => {
        if(!bc) bc = new BroadcastChannel('sidebar');
        bc.postMessage({ type: 'update', payload: JSON.stringify($options) });
    });

    onDestroy(() => {
        if(bc) bc.close();
    });
</script>

<div class="Shell">
    <Box>
        <button class="header" on:click={test}>
            <h2>Pile/Item</h2>
        </button>
        <div class="pileitem">
            <label class="labelme">
                <input type="checkbox" bind:checked={$options.bool_itemsize}>
                Item Size
            </label>
        </div>
    </Box>
    <Box>
        <button class="header" on:click={test}>
            <h2>Layout</h2>
        </button>
        <label>
            <input type="checkbox" bind:checked={$options.bool_cellsize}>
            Cell Size
        </label>
        <label>
            <input type="checkbox" bind:checked={$options.bool_cellpadding}>
            Cell Padding
        </label>
        <label>
            <input type="checkbox" bind:checked={$options.bool_numcolumns}>
            Number of Columns
        </label>
        <label>
            <input type="checkbox" bind:checked={$options.bool_rowheight}>
            Row Height
        </label>
        <label>
            <input type="checkbox" bind:checked={$options.bool_cellalignment}>
            Cell Alignment
        </label>
    </Box>
    <Box>
        <button class="header" on:click={test}>
            <h2>Arrangement</h2>
        </button>
    </Box>
    <Box>
        <button class="header" on:click={test}>
            <h2>Group By</h2>
        </button>
        <label>
            <input type="checkbox" bind:checked={$options.bool_grouprow}>
            Row
        </label>
        <label>
            <input type="checkbox" bind:checked={$options.bool_groupcolumn}>
            Column
        </label>
        <label>
            <input type="checkbox" bind:checked={$options.bool_groupgrid}>
            Grid
        </label>
        <label>
            <input type="checkbox" bind:checked={$options.bool_groupoverlap}>
            Overlap
        </label>
        <label>
            <input type="checkbox" bind:checked={$options.bool_groupdistance}>
            Distance
        </label>
    </Box>
    <Box>
        <button class="header" on:click={test}>
            <h2>Label</h2>
        </button>
        <label>
            <input type="checkbox" bind:checked={$options.maincat}>
            Main Category
        </label>
        <label>
            <input type="checkbox" bind:checked={$options.mainsupercat}>
            Main Super Category
        </label>
        <label>
            <input type="checkbox" bind:checked={$options.textlabel}>
            Toggle Text Label
        </label>
        <label>
            <input type="checkbox" bind:checked={$options.labelalignment}>
            Change Label Alignment
        </label>
        <label>
            <input type="checkbox" bind:checked={$options.stackdir}>
            Change Stack Direction
        </label>
        <label>
            <input type="checkbox" bind:checked={$options.fontsize}>
            Change Label Font Size
        </label>
    </Box>
</div>

<style>
    .header {
        border-style: none;
        width: 100%;
        background-color: #fff;
    }

    .Shell {
        padding: 0em 0.9em 10em 2em;
        overflow: visible;
        overflow: scroll; /* Show scrollbars */
        width: 100%;
        height: 100%;
    }

    h2 {
        text-align: left;
        padding-left: 3px;
        padding-bottom: 3px;
        padding-top: 1px;
        font-weight: 600;
        border-bottom: 0.5px solid black;
        margin: 0em;
    }

</style>