<script lang="ts">
    import DefaultLayout from '$lib/layouts/default.svelte';
    import Input from '$lib/components/inputs/input.svelte';
    import Button from '$lib/components/inputs/button.svelte';
    import Link from '$lib/components/inputs/link.svelte';
    import { notifications } from '$lib/stores/notification-store';
    import { goto } from '$app/navigation';

    function handleSubmit(e: SubmitEvent) {
        /** The form being submitted. */
        const form = (<HTMLFormElement> e.target);
        /** The form data to be sent in the request. */
        const fd = new FormData(form);
        /** Handles sending the request. */
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {
            if (xhr.status === 201) {
                const body = JSON.parse(xhr.responseText);
                notifications.add({
                    id: '1',
                    title: 'Successfully Signed In',
                    message: body.success,
                    type: 'success',
                });

                goto('/');
            }
        })

        xhr.open('POST', '/api/sign-up');
        xhr.send(fd);
    }
</script>

<DefaultLayout heading="Create Account">
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
            <Button type={"submit"}>Sign In</Button>
            <Link href={"/sign-in"} size={'xs'}>Already have an account? Sign in.</Link>
        </div>
    </form>
</DefaultLayout>

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