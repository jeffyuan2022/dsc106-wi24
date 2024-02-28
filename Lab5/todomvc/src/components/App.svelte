<script>
    import WorldMap from './WorldMap.svelte';

</script>

<main>

    <section class="graph">
        <h1 style="margin-top: 1px">Tracking the Pace of Global Energy Consumption: A Quinquennial Analysis from 2000 to 2020</h1>
        <WorldMap/>
        <div id="tooltip" style="position: absolute;
        text-align: center;
        width: auto;
        padding: 8px;
        font-size: 12px;
        background: rgba(0,0,0,0.6);
        color: #fff;
        border-radius: 4px;
        pointer-events: none; /* Makes sure it doesn't interfere with other mouse events */
        z-index: 10;">
        </div>
    </section>

</main>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700&display=swap");

    :root {
        --color-bg: #ffffff;
        --color-outline: #c2c2c2;
        --color-shadow: hsl(0, 0%, 0%, 0.1);
        --color-text: #3f4252;
        --color-bg-1: hsla(0, 0%, 0%, 0.2);
        --color-shadow-1: hsl(0, 0%, 96%);
    }

    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    main {
        text-align: center;
        font-family: "Nunito", sans-serif;
        font-weight: 300;
        line-height: 2;
        font-size: 12px;
        color: var(--color-text);
        margin-top: 25px;
    }

    ::placeholder {
        color: #9e9e9e;
    }

    h1 {
        font-size: 60px;
        font-weight: 300;
        line-height: 1;
    }

    .graph {
        display: inline-block;
        margin-left: 0px;

    }

</style>
