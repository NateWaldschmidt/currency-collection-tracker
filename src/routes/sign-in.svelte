<script lang="ts">
    import BaseLayout from '$lib/layouts/base.svelte';
    import Input from '$lib/components/inputs/input.svelte';
    import Button from '$lib/components/inputs/button.svelte';
    import Link from '$lib/components/inputs/link.svelte';
    import { notifications } from '$lib/stores/notification-store';
    import { goto } from '$app/navigation';

    /**
     * Handles submitting the form to log the user in.
     */
    function handleSubmit(this: HTMLFormElement) {
        const fd = new FormData(this);
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {
            const body = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                notifications.add({
                    id: '1',
                    title: 'Successfully Signed In',
                    message: 'Thank you for signing in.',
                    type: 'success',
                });
                goto('/');
            } else {
                // Resets the password field(s).
                this.querySelectorAll('input [type="password"]').forEach((element) => (<HTMLInputElement> element).value = '')

                notifications.add({
                    id: '1',
                    title: 'Could Not Sign In',
                    message: body.error,
                    type: 'danger',
                });
            }
        });
        xhr.open('POST', '/api/sign-in');
        xhr.send(fd);
    }
</script>

<BaseLayout heading="Sign In">
    <form on:submit|preventDefault={handleSubmit}>
        <Input
        label={"Email"}
        type ={"email"}
        id   ={"email"}
        name ={"email"}
        required
        />

        <Input
        label={"Password"}
        type ={"password"}
        id   ={"password"}
        name ={"password"}
        required
        />

        <div id="submit-container">
            <Button type={"submit"}>Sign In</Button>
            <Link href={"/sign-up"} size={'xs'}>Need an Account? Create one.</Link>
        </div>
    </form>
</BaseLayout>

<style lang="scss">
    form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        max-width: 540px;
        margin: 0 auto;
    }

    #submit-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
</style>