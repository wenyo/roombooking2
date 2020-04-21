<template>
    <div class='foot'>
        <div class="content">
            <ul class="author">
                <li class="frontEnd">
                    <a href="https://github.com/wenyo/roombooking2">
                        <i class="fab fa-github"></i>
                        <span>wenyo</span>
                    </a>
                </li>
                <li class="ui">
                    <a href="https://challenge.thef2e.com/user/1600?fbclid=IwAR2oYLpm_gLo5RI6AHXnqH9iIrWTMZzbMBLE4Qrfz0JQJw9jR2lNoHVOypI">
                        <i class="fas fa-pencil-ruler"></i>
                        <span>edith.hsu</span>
                    </a>
                </li>
            </ul>
        </div>

    </div>
</template>

<style lang="scss">
    .foot{
        background: $color-six;
    }
    .content{
        margin: 0 auto;
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