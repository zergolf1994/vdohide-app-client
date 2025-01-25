"use client"

import { useSession } from "next-auth/react"

const SessionUser = () => {
    const data = useSession()
    return (
        <div>
        {JSON.stringify(data, null, 2)}
        </div>
    )
}

export default SessionUser