<template>
    <div class='content foot'>
        <ul class="author">
            <li class="frontEnd">
                <a href="https://github.com/wenyo/roombooking2">
                    <i class="fab fa-github"></i>
                    <span>wenyo</span>
                </a>
            </li>
            <li class="ui">
                <a href="https://z7x2c0v0b8.github.io/the_f2e_2nd/hotel_reservation.html">
                    <i class="fas fa-pencil-ruler"></i>
                    <span>edith.hsu</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<style lang="scss">
    .foot{
        background: $color-six;
    }
    .author{
        display: flex;
        justify-content: center;
        @include pointer;
        a{
            margin: 0 5px;
            padding: 5px 10px;
            text-align: center;
            color: $color-five;
            transition: all .3s;
            &:hover{
                background: $color-five;
                color: $color-six;
                border-radius: 3px;
            }
        }
        i{
            margin-right: 5px;
        }
    }
</style>