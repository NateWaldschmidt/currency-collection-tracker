<script lang="ts">
    import DefaultLayout from '$lib/layouts/default.svelte';
    import Input from '$lib/components/inputs/input.svelte';
    import Button from '$lib/components/inputs/button.svelte';

    function handleSubmit(e: SubmitEvent) {
        /** The form element that the submit event is coming from. */
        const form = (<HTMLFormElement> e.target);
        /** The form data to be sent with the request. */
        const fd = new FormData(form);
        /** The request handler. */
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {
            if (xhr.status === 201) {
                const body = JSON.parse(xhr.responseText);
                console.log(body.success);
            }
        });
        xhr.open('POST', '/api/sign-in');
        xhr.send(fd);
    }
</script>

<DefaultLayout heading="Sign In">
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
            <a href="/sign-up">Need an Account? Create one.</a>
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

    #submit-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        a {
            font-size: 0.85rem;
        }
    }
</style>