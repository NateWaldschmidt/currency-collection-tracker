<script lang="ts">
    import Button from '$lib/components/inputs/button.svelte';
    import Input from '$lib/components/inputs/input.svelte';
    import Link from '$lib/components/inputs/link.svelte';
    import { goto } from '$app/navigation';
    import { heading } from '$lib/stores/page-heading-store';
    import { notifications } from '$lib/stores/notification-store';
    import type { ApiResponseBody } from '$lib/server/utilities/response-helper';

    heading.set('Account Creation');

    async function handleSubmit(this: HTMLFormElement) {
        const response = await fetch('/api/sign-up', {
            method: 'POST',
            body: new FormData(this),
        });
        const responseJson: ApiResponseBody = await response.json();

        if (response.status === 201) {
            notifications.add({
                id: '1',
                title: responseJson.message,
                message: responseJson.description,
                type: 'success',
            });
            goto('/');
        } else {
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
    label={"Email"}
    hint ={"Your email will be used to sign in to your account."}
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

    <Input
    label={"Display Name"}
    hint ={"Your display name will be public for other user's to identify you."}
    type ={"text"}
    id   ={"display-name"}
    name ={"display-name"}
    required
    />

    <div id="name-container">
        <Input
        label={"First Name"}
        type ={"text"}
        id   ={"first-name"}
        name ={"first-name"}
        />

        <Input
        label={"Last Name"}
        type ={"text"}
        id   ={"last-name"}
        name ={"last-name"}
        />
    </div>

    <div id="submit-container">
        <Button type={"submit"}>Create Account</Button>
        <Link href={"/sign-in"} size={'xs'}>Already have an account? Sign in.</Link>
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

    #name-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
    }

    #submit-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
</style>