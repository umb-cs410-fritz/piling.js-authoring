<script>
	import Box from './Box.svelte';
    let yes = false;

    // pile/item bools
    let bool_itemsize = false;

    // layout bools
    let bool_cellsize = false;
    let bool_cellpadding = false;
    let bool_numcolumns = false;
    let bool_rowheight = false;
    let bool_cellalignment = false;

    // group bools
    let bool_grouprow = false;
    let bool_groupcolumn = false;
    let bool_groupgrid = false;
    let bool_groupoverlap = false;
    let bool_groupdistance = false;

    // label bools
    let maincat = false;
    let mainsupercat = false;
    let textlabel = false;
    let labelalignment = false;
    let stackdir = false;
    let fontsize = false;

    function holder()
    {
        console.log("hi");
    }

</script>

<div class="Shell">
    <Box>
        <h2>Pile/Item</h2>
        <label class="labelme">
            <input type="checkbox" bind:checked={bool_itemsize}>
            Item Size
        </label>
    </Box>
    <Box>
        <h2>Layout</h2>
        <label>
            <input type="checkbox" bind:checked={bool_cellsize}>
            Cell Size
        </label>
        <label>
            <input type="checkbox" bind:checked={bool_cellpadding}>
            Cell Padding
        </label>
        <label>
            <input type="checkbox" bind:checked={bool_numcolumns}>
            Number of Columns
        </label>
        <label>
            <input type="checkbox" bind:checked={bool_rowheight}>
            Row Height
        </label>
        <label>
            <input type="checkbox" bind:checked={bool_cellalignment}>
            Cell Alignment
        </label>
    </Box>
    <Box>
        <h2>Arrangement</h2>
    </Box>
    <Box>
        <h2>Group By</h2>
        <label>
            <input type="checkbox" bind:checked={bool_grouprow}>
            Row
        </label>
        <label>
            <input type="checkbox" bind:checked={bool_groupcolumn}>
            Column
        </label>
        <label>
            <input type="checkbox" bind:checked={bool_groupgrid}>
            Grid
        </label>
        <label>
            <input type="checkbox" bind:checked={bool_groupoverlap}>
            Overlap
        </label>
        <label>
            <input type="checkbox" bind:checked={bool_groupdistance}>
            Distance
        </label>
    </Box>
    <Box>
        <h2>Label</h2>
        <label>
            <input type="checkbox" bind:checked={maincat}>
            Main Category
        </label>
        <label>
            <input type="checkbox" bind:checked={mainsupercat}>
            Main Super Category
        </label>
        <label>
            <input type="checkbox" bind:checked={textlabel}>
            Toggle Text Label
        </label>
        <label>
            <input type="checkbox" bind:checked={labelalignment}>
            Change Label Alignment
        </label>
        <label>
            <input type="checkbox" bind:checked={stackdir}>
            Change Stack Direction
        </label>
        <label>
            <input type="checkbox" bind:checked={fontsize}>
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