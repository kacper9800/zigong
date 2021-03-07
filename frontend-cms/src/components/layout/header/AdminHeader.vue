<template>
    <a-layout-header class="header">
        <a-menu
            theme="dark"
            mode="horizontal"
            :default-selected-keys="['2']"
            :style="{ lineHeight: '64px' }"
        >
            <a-menu-item>
                <router-link to="/">
                    <a-icon type="home" />
                    <span class="nav-text">Back to Home Page</span>
                </router-link>
            </a-menu-item>
            <a-menu-item>
                <div @click="$router.push('/logout')">
                    <a-icon type="logout" />
                    <span class="nav-text">Logout</span>
                </div>
            </a-menu-item>
        </a-menu>
    </a-layout-header>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>
