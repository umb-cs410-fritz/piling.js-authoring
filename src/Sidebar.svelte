<script>
    import { onMount, afterUpdate, onDestroy } from 'svelte';
	import Box from './Box.svelte';

    let bc;

    const options = {
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
    };

    onMount(async () => {
        bc = new BroadcastChannel('sidebar');
        bc.postMessage({ type: 'update', payload: JSON.stringify(options) });
    });

    afterUpdate(() => {
        if(!bc) bc = new BroadcastChannel('sidebar');
        bc.postMessage({ type: 'update', payload: JSON.stringify(options) });
    });

    onDestroy(() => {
        if(bc) bc.close();
    });
</script>

<div class="Shell">
    <Box>
        <h2>Pile/Item</h2>
        <label class="labelme">
            <input type="checkbox" bind:checked={options.bool_itemsize}>
            Item Size
        </label>
    </Box>
    <Box>
        <h2>Layout</h2>
        <label>
            <input type="checkbox" bind:checked={options.bool_cellsize}>
            Cell Size
        </label>
        <label>
            <input type="checkbox" bind:checked={options.bool_cellpadding}>
            Cell Padding
        </label>
        <label>
            <input type="checkbox" bind:checked={options.bool_numcolumns}>
            Number of Columns
        </label>
        <label>
            <input type="checkbox" bind:checked={options.bool_rowheight}>
            Row Height
        </label>
        <label>
            <input type="checkbox" bind:checked={options.bool_cellalignment}>
            Cell Alignment
        </label>
    </Box>
    <Box>
        <h2>Arrangement</h2>
    </Box>
    <Box>
        <h2>Group By</h2>
        <label>
            <input type="checkbox" bind:checked={options.bool_grouprow}>
            Row
        </label>
        <label>
            <input type="checkbox" bind:checked={options.bool_groupcolumn}>
            Column
        </label>
        <label>
            <input type="checkbox" bind:checked={options.bool_groupgrid}>
            Grid
        </label>
        <label>
            <input type="checkbox" bind:checked={options.bool_groupoverlap}>
            Overlap
        </label>
        <label>
            <input type="checkbox" bind:checked={options.bool_groupdistance}>
            Distance
        </label>
    </Box>
    <Box>
        <h2>Label</h2>
        <label>
            <input type="checkbox" bind:checked={options.maincat}>
            Main Category
        </label>
        <label>
            <input type="checkbox" bind:checked={options.mainsupercat}>
            Main Super Category
        </label>
        <label>
            <input type="checkbox" bind:checked={options.textlabel}>
            Toggle Text Label
        </label>
        <label>
            <input type="checkbox" bind:checked={options.labelalignment}>
            Change Label Alignment
        </label>
        <label>
            <input type="checkbox" bind:checked={options.stackdir}>
            Change Stack Direction
        </label>
        <label>
            <input type="checkbox" bind:checked={options.fontsize}>
            Change Label Font Size
        </label>
    </Box>
</div>

<style>
    .Shell {
    padding: 0em 0.9em 0em;
    }


    h2 {
        padding-bottom: 7px;
        border-bottom: 1px solid black;
    }

</style>