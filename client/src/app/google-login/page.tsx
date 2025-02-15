import { auth, signIn, signOut } from "../../../auth"
import './page.css'
export default async function SignIn() {
    const session = await auth()
    console.log(session)
    const user = session?.user

    const buttonStyle = {
        display: "block",  // Ensures the button is always on a new line
        width: "fit-content", // Prevents it from stretching too wide
        padding: "10px 15px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
    }


    return user ? (
        <>
            <h1>Welcome {user.name}</h1>
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
            > 

                <button type="submit" style={buttonStyle}>Sign Out</button>
            </form>
        </>
    ) : (
    <>
        <h1> You are not authenticated, click below to sing in</h1>
        <form
            action={async () => {
                "use server"
                await signIn("google") //WE SHOULD ADD , {redirectTO}
            }}
        >
            <button type="submit" style={buttonStyle}>Sign in with Google</button>
        </form>
        </>
    )
}