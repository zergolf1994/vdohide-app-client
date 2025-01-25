import { signIn } from '@/auth'
import React from 'react'

const PageLogin = () => {
    return (
        <div>
            PageLogin

            <form
                action={async () => {
                    "use server"
                    await signIn("google")
                }}
            >
                <button type="submit">Signin with Google</button>
            </form>
        </div>
    )
}

export default PageLogin