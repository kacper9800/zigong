<template>
    <section class="section service-2" style="margin-top: 100px">
        <div class="container">
            <div class="row">
                <figure class="effect-roxy col-md-3">
                    <!-- <img src="img/15.jpg" alt="img15" /> -->
                    <figcaption>
                        <h3>Charming <span>Roxy</span></h3>
                        <p>
                            Roxy was my best friend. She'd cross any border for
                            me.
                        </p>
                        <a href="#">View more</a>
                    </figcaption>
                </figure>
            </div>
        </div>
    </section>
</template>

<style scoped>
figure {
    display: block;
}

/* Common style */

/* Anchor will cover the whole item by default */
.grid figure figcaption > a {
    z-index: 1000;
    text-indent: 200%;
    white-space: nowrap;
    font-size: 0;
    opacity: 0;
}

.grid figure h2 {
    word-spacing: -0.15em;
    font-weight: 300;
}

.grid figure h2 span {
    font-weight: 800;
}

.grid figure h2,
.grid figure p {
    margin: 0;
}

.grid figure p {
    letter-spacing: 1px;
    font-size: 68.5%;
}

/* Individual effects */

/*---------------*/
/***** Roxy *****/
/*---------------*/

figure.effect-roxy {
    background: -webkit-linear-gradient(45deg, #ff89e9 0%, #05abe0 100%);
    background: linear-gradient(45deg, #ff89e9 0%, #05abe0 100%);
}

figure.effect-roxy img {
    max-width: none;
    width: -webkit-calc(100% + 60px);
    width: calc(100% + 60px);
    -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
    transition: opacity 0.35s, transform 0.35s;
    -webkit-transform: translate3d(-50px, 0, 0);
    transform: translate3d(-50px, 0, 0);
}

figure.effect-roxy figcaption::before {
    position: absolute;
    top: 30px;
    right: 30px;
    bottom: 30px;
    left: 30px;
    border: 1px solid #fff;
    content: '';
    opacity: 0;
    -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
    transition: opacity 0.35s, transform 0.35s;
    -webkit-transform: translate3d(-20px, 0, 0);
    transform: translate3d(-20px, 0, 0);
}

figure.effect-roxy figcaption {
    padding: 3em;
    text-align: left;
}

figure.effect-roxy h2 {
    padding: 30% 0 10px 0;
}

figure.effect-roxy p {
    opacity: 0;
    -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
    transition: opacity 0.35s, transform 0.35s;
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
}

figure.effect-roxy:hover img {
    opacity: 0.7;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}

figure.effect-roxy:hover figcaption::before,
figure.effect-roxy:hover p {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}

@media screen and (max-width: 50em) {
    .grid figure {
        display: inline-block;
        float: none;
        margin: 10px auto;
        width: 100%;
    }
}
</style>
