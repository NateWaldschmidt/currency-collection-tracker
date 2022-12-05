<script lang="ts">
    import Button from '$lib/components/inputs/button.svelte';
    import Input from '$lib/components/inputs/input.svelte';
    import Link from '$lib/components/inputs/link.svelte';
    import { goto } from '$app/navigation';
    import { heading } from '$lib/stores/page-heading-store';
    import { notifications } from '$lib/stores/notification-store';
    import type { ApiResponseBody } from '$lib/server/utilities/response-helper';
    
    heading.set('Sign In');
    /**
     * Handles submitting the form to log the user in.
     */
    async function handleSubmit(this: HTMLFormElement) {
        const response = await fetch('/api/sign-in', {
            method: 'POST',
            body: new FormData(this),
        });

        const responseJson: ApiResponseBody = await response.json();

        if (response.status === 200) {
            notifications.add({
                id: '1',
                title: responseJson.message,
                message: responseJson.description,
                type: 'success',
            });
            goto('/');
        } else {
            // Resets the password field(s).
            this.querySelectorAll('[type="password"]').forEach((element) => (<HTMLInputElement> element).value = '')

            notifications.add({
                id: '1',
                title: responseJson.message,
                message: responseJson.description,
                type: 'danger',
            });
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <Input
    label={"Display Name"}
    type ={"text"}
    id   ={"display-name"}
    name ={"display-name"}
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