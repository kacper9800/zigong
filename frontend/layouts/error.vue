<template>
    <section class="section service-2">
        <div class="container">
            <div v-if="error.statusCode === 404" id="notfound">
                <section class="section confirmation">
                    <div class="notfound">
                        <br />
                        <br />
                        <br />
                        <br />
                        <div class="notfound-404">
                            <h1>Oops!</h1>
                        </div>
                        <h2>404 - Page not found</h2>
                        <p>
                            The page you are looking for might have been removed
                            had its name changed or is temporarily unavailable.
                        </p>
                        <nuxt-link :to="localePath('/')"
                            >Go To Homepage</nuxt-link
                        >
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                </section>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: ['error']
};
</script>
