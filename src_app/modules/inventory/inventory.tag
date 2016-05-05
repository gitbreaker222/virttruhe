<inventory>
    <ul class="items">
        <li each={ items }>
            <img src="data/items/img/small/{ id }.jpg">
        </li>
    </ul>




    <script>
        this.items = itemsData;
        console.log(this.items);
    </script>
</inventory>